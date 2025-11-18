// deskStructure.ts
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import type { StructureResolver } from "sanity/structure";
import {CogIcon, HomeIcon, DocumentIcon} from '@sanity/icons';

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
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
        ),
      S.listItem()
        .title("Forsíðuefni")
        .schemaType("frontpageContent")
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType("frontpageContent")
            .documentId("frontpageContent"),
        ),
      S.divider(),
      orderableDocumentListDeskItem({
        id: "orderable-top-level-pages",
        title: "Raða yfirsíðum",
        type: "page",
        filter: "!defined(parent)",
        S,
        context,
      }),
      S.listItem()
        .title("Síður")
        .schemaType("page")
        .icon(DocumentIcon)
        .child(
          S.documentList()
            .title("Síður")
            .schemaType("page")
            .filter("_type == 'page' && !defined(parent)")
            .defaultOrdering([{ field: "orderRank", direction: "asc" }])
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
                    title: "Undirsíður",
                    type: "page",
                    filter: "parent._ref == $parentId",
                    params: { parentId: safeDocumentId },
                    S,
                    context,
                  }),
                ]);
            }),
        ),
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        return id !== "page" && id !== "siteSettings" && id !== "frontpageContent";
      }),
    ]);
