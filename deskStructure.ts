// deskStructure.ts
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import type { StructureResolver } from "sanity/structure";
import {CogIcon, HomeIcon} from '@sanity/icons';

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
        .title("Forsíða")
        .schemaType("frontpageContent")
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType("frontpageContent")
            .documentId("frontpageContent"),
        ),
      S.divider(),
      orderableDocumentListDeskItem({
        id: "orderable-pages",
        title: "Síður",
        type: "page",
        S,
        context,
      }),
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        return id !== "page" && id !== "siteSettings" && id !== "frontpageContent";
      }),
    ]);
