// schemaTypes/sections/collapsibleList.ts
import {defineField, defineType} from 'sanity';

export const collapsibleList = defineType({
  name: 'collapsibleList',
  title: 'Sambrjótanlegur listi',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titill',
      type: 'string',
    }),
    defineField({
      name: 'items',
      title: 'Atriði',
      type: 'array',
      of: [
        defineField({
          name: 'item',
          title: 'Atriði',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Spurning eða fyrirsögn',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'body',
              title: 'Texti',
              type: 'array',
              of: [
                {type: 'block'},
                {
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
                },
              ],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: {title: 'title'},
            prepare: ({title}) => ({
              title: title || 'Atriði',
            }),
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {title: 'title', itemCount: 'items.length'},
    prepare: ({title, itemCount}) => ({
      title: title || 'Sambrjótanlegur listi',
      subtitle: itemCount ? `${itemCount} atriði` : 'Engin atriði skilgreind',
    }),
  },
});
