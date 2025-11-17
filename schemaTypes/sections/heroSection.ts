// schemaTypes/sections/heroSection.ts
import {defineField, defineType} from 'sanity';

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'badge',
      title: 'Yfirtexti',
      type: 'string',
      initialValue: 'Vefur í vinnslu',
    }),
    defineField({
      name: 'title',
      title: 'Titill',
      type: 'string',
      initialValue: 'Skipulagsfræði skapar sveigjanlegar lausnir fyrir íslenskt skipulag',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Undirtexti',
      type: 'text',
      rows: 4,
      initialValue:
        'Við vinnum með sveitarfélögum, stofnunum og samstarfsaðilum að því að skilgreina og móta nýju kynslóðina af borgarrýmum. Þessi síða er í uppbyggingu en hér má finna helstu upplýsingar og tengiliði.',
    }),
    defineField({
      name: 'image',
      title: 'Mynd',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt texti',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'primaryCta',
      title: 'Aðalhnappur',
      type: 'object',
      initialValue: {
        label: 'Skoða verkefni',
        href: '#project',
      },
      fields: [
        defineField({name: 'label', title: 'Texti', type: 'string'}),
        defineField({name: 'href', title: 'Slóð', type: 'string'}),
      ],
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Aukahnappur',
      type: 'object',
      initialValue: {
        label: 'Hafðu samband',
        href: '#contact',
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
      title: title || 'Hero',
      subtitle: subtitle || 'Hero section',
    }),
  },
});

