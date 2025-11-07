// schemaTypes/siteSettingsType.ts
import { defineType, defineField } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Vefstillingar",
  type: "document",
  groups: [
    { name: "hero", title: "Forsíðukassi" },
    { name: "footer", title: "Fótur" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Heiti skráningar",
      type: "string",
      initialValue: "Site settings",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "heroBadge",
      title: "Yfirtexti",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroTitle",
      title: "Titill",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Undirtexti",
      type: "text",
      rows: 4,
      group: "hero",
    }),
    defineField({
      name: "heroPrimaryCta",
      title: "Aðalhnappur",
      type: "object",
      group: "hero",
      fields: [
        defineField({
          name: "label",
          title: "Texti",
          type: "string",
        }),
        defineField({
          name: "href",
          title: "Slóð",
          type: "string",
          description: "Styður innri slóðir (t.d. #project) eða fullar vefslóðir.",
        }),
      ],
    }),
    defineField({
      name: "heroSecondaryCta",
      title: "Aukahnappur",
      type: "object",
      group: "hero",
      fields: [
        defineField({
          name: "label",
          title: "Texti",
          type: "string",
        }),
        defineField({
          name: "href",
          title: "Slóð",
          type: "string",
          description: "Styður innri slóðir (t.d. #contact) eða fullar vefslóðir.",
        }),
      ],
    }),
    defineField({
      name: "footerNotice",
      title: "Fóttexti",
      type: "text",
      rows: 3,
      group: "footer",
      description: "Birta texta vinstra megin í fæti.",
    }),
    defineField({
      name: "footerEmail",
      title: "Netfang",
      type: "string",
      group: "footer",
    }),
  ],
  preview: {
    prepare: () => ({
      title: "Vefstillingar",
      subtitle: "Forsíðuhero og fótur",
    }),
  },
});

