// schemaTypes/sections/teamSection.ts
import {defineField, defineType} from 'sanity';

export const teamSection = defineType({
  name: 'teamSection',
  title: 'Stjórn',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titill',
      type: 'string',
      initialValue: 'Teymið',
    }),
    defineField({
      name: 'description',
      title: 'Lýsing',
      type: 'text',
      rows: 3,
      initialValue:
        'Við búum saman til leiðir sem byggja á rannsóknum, innblæstri og samtali við fólkið sem býr í hverfinu. Kynntu þér starfsfólkið og samstarfsaðila fljótlega hér.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: ({title}) => ({
      title: title || 'Stjórn',
      subtitle: 'Team section',
    }),
  },
});

