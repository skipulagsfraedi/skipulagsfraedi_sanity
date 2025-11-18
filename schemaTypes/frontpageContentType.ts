// schemaTypes/frontpageContentType.ts
import {defineField, defineType} from 'sanity';

export const frontpageContentType = defineType({
  name: 'frontpageContent',
  title: 'Forsíða',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'news', title: 'Fréttir'},
    {name: 'sections', title: 'Síðuhlutar'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Heiti skráningar',
      type: 'string',
      initialValue: 'Forsíða',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'heroSection',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'news',
      title: 'Fréttir',
      type: 'newsSection',
      group: 'news',
    }),
    defineField({
      name: 'sections',
      title: 'Síðuhlutar',
      type: 'array',
      group: 'sections',
      of: [
        {type: 'teamSection'},
        {type: 'pillarsSection'},
        {type: 'contactSection'},
      ],
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Forsíða',
      subtitle: 'Allt efni forsíðu',
    }),
  },
});


