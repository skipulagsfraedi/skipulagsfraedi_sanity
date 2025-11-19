import { defineType, defineField } from "sanity";
import { ImageIcon } from "@sanity/icons";

export const postType = defineType({
  name: "post",
  title: "Fréttir",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titill",
      type: "string",
      validation: (Rule) => Rule.required(),
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
      ],
      validation: (Rule) => Rule.required(),
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
    defineField({
      name: "publishedAt",
      title: "Útgáfudagur",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      
    }),
  ],
});
