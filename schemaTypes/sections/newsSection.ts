// schemaTypes/sections/newsSection.ts
import {defineField, defineType} from 'sanity';

export const newsSection = defineType({
  name: 'newsSection',
  title: 'Fréttir',
  type: 'object',
  fields: [
    defineField({
      name: 'badge',
      title: 'Yfirtexti',
      type: 'string',
      initialValue: 'Fréttir',
    }),
    defineField({
      name: 'title',
      title: 'Titill',
      type: 'string',
      initialValue: 'Nýjustu tíðindi úr starfseminni',
    }),
    defineField({
      name: 'description',
      title: 'Lýsing',
      type: 'text',
      rows: 3,
      initialValue: 'Lestu um verkefni, viðburði og sjónarmið skipulagsfræðinga.',
    }),
    defineField({
      name: 'readMoreLabel',
      title: 'Lesa meira texti',
      type: 'string',
      initialValue: 'Lesa meira →',
    }),
    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'object',
      initialValue: {
        label: 'Sjá allar fréttir',
        href: '/frettir',
      },
      fields: [
        defineField({name: 'label', title: 'Texti', type: 'string'}),
        defineField({name: 'href', title: 'Slóð', type: 'string'}),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'badge',
    },
    prepare: ({title, subtitle}) => ({
      title: title || 'Fréttir',
      subtitle: subtitle || 'News section',
    }),
  },
});

