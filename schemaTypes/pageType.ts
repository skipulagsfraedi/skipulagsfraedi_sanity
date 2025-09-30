import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { defineType, defineField } from "sanity";

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
      ],
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          const documentId = context?.document?._id?.replace(/^drafts\./, "");

          if (!documentId) {
            return true;
          }

          const hasContent = Array.isArray(value) && value.length > 0;

          const getClient = context?.getClient;
          const client = getClient?.({ apiVersion: "2023-05-15" });

          if (!client) {
            return true;
          }

          const childCount = await client.fetch(
            'count(*[_type == "page" && (references($id) || references($draftId))])',
            { id: documentId, draftId: `drafts.${documentId}` }
          );

          if (childCount > 0 && hasContent) {
            return "Síður með undirsíðum mega ekki hafa innihald.";
          }

          if (childCount === 0 && !hasContent) {
            return "Bættu við innihaldi eða búðu til undirsíðu.";
          }

          return true;
        }),
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
