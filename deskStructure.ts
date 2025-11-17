// deskStructure.ts
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import type { StructureResolver } from "sanity/structure";

const makeSubPageList = (
  S: Parameters<StructureResolver>[0],
  parentId: string,
) =>
  S.documentList()
    .title("Undirsíður")
    .schemaType("page")
    .filter("_type == 'page' && parent._ref == $parentId")
    .params({ parentId })
    .defaultOrdering([{ field: "orderRank", direction: "asc" }])
    .child((documentId, { schemaType }) =>
      S.document()
        .schemaType(schemaType || "page")
        .documentId(documentId || undefined),
    );

export const deskStructure: StructureResolver = (S, context) =>
  S.list()
    .title("Innihald")
    .items([
      S.listItem()
        .title("Vefstillingar")
        .schemaType("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
        ),
      S.listItem()
        .title("Forsíðuefni")
        .schemaType("frontpageContent")
        .child(
          S.document()
            .schemaType("frontpageContent")
            .documentId("frontpageContent"),
        ),
      S.divider(),
      S.listItem()
        .title("Síðutré")
        .schemaType("page")
        .child(
          S.list()
            .title("Síðutré")
            .items([
              orderableDocumentListDeskItem({
                id: "orderable-top-level-pages",
                title: "Raða yfirsíðum",
                type: "page",
                filter: "!defined(parent)",
                S,
                context,
              }),
              S.listItem()
                .title("Yfirsíður")
                .child(
                  S.documentList()
                    .title("Yfirsíður")
                    .schemaType("page")
                    .filter("_type == 'page' && !defined(parent)")
                    .defaultOrdering([
                      { field: "orderRank", direction: "asc" },
                    ])
                    .child((documentId, { schemaType }) => {
                      const safeDocumentId = documentId || "";

                      return S.list()
                        .title("Síða")
                        .items([
                          S.listItem()
                            .title("Breyta síðu")
                            .child(
                              S.document()
                                .schemaType(schemaType || "page")
                                .documentId(documentId || undefined),
                            ),
                          orderableDocumentListDeskItem({
                            id: `orderable-subpages-${safeDocumentId}`,
                            title: "Raða undirsíðum",
                            type: "page",
                            filter: "parent._ref == $parentId",
                            params: { parentId: safeDocumentId },
                            S,
                            context,
                          }),
                          S.listItem()
                            .title("Undirsíður")
                            .child(makeSubPageList(S, safeDocumentId)),
                        ]);
                    }),
                ),
            ]),
        ),
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        return id !== "page" && id !== "siteSettings" && id !== "frontpageContent";
      }),
    ]);
