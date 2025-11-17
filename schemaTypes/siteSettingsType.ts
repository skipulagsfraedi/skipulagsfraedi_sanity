// schemaTypes/siteSettingsType.ts
import { defineType, defineField } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Vefstillingar",
  type: "document",
  groups: [
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
      name: "footerNotice",
      title: "Texti í fæti",
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
      subtitle: "Fótur",
    }),
  },
});

