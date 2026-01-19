// schemaTypes/pageType.ts
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { defineType, defineField } from "sanity";
import { ImageIcon } from "@sanity/icons";

export const pageType = defineType({
  name: "page",
  title: "Síða",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "page" }),
    defineField({
      name: "title",
      title: "Titill",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "parent",
      title: "Yfirsíða",
      type: "reference",
      to: [{ type: "page" }],
      hidden: ({ document }) => {
        // Always show the parent field - users can set it when creating child pages
        // The field will be filtered to only show top-level pages as options
        return false;
      },
      options: {
        disableNew: true,
        filter: ({ document }) => {
          const documentId = document?._id?.replace(/^drafts\./, "");
          return {
            filter: "!defined(parent) && _id != $documentId",
            params: { documentId: documentId ?? "" },
          };
        },
      },
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          if (!value) {
            return true;
          }

          const parentId = value._ref;

          if (!parentId) {
            return "Ógild yfirsíða";
          }

          const getClient = context?.getClient;
          const client = getClient?.({ apiVersion: "2023-05-15" });

          if (!client) {
            return true;
          }

          const parentDoc = await client.fetch(
            `*[_type == "page" && (_id == $parentId || _id == $draftParentId)][0]{parent}`,
            { parentId, draftParentId: `drafts.${parentId}` }
          );

          if (parentDoc?.parent) {
            return "Síðutréð má ekki fara dýpra en tvö þrep.";
          }

          return true;
        }),
    }),
    defineField({
      name: "content",
      title: "Innihald",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          title: "Mynd",
          icon: ImageIcon,
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt texti",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
        {
          type: "collapsibleList",
          title: "Fellilisti",
        },
      ],
      validation: (Rule) => Rule.optional(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
