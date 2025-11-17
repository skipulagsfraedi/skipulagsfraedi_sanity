// schemaTypes/sections/pillarsSection.ts
import {defineField, defineType} from 'sanity';

export const pillarsSection = defineType({
  name: 'pillarsSection',
  title: 'Stoðir',
  type: 'object',
  fields: [
    defineField({
      name: 'badge',
      title: 'Yfirtexti',
      type: 'string',
      initialValue: 'Skipulag í forgrunni',
    }),
    defineField({
      name: 'title',
      title: 'Titill',
      type: 'string',
      initialValue: 'Hvernig við mótum framtíðarrými',
    }),
    defineField({
      name: 'description',
      title: 'Lýsing',
      type: 'text',
      rows: 3,
      initialValue:
        'Við unnum af alúð að lausnum sem gera byggðir að betri stöðum. Hér eru þrír lykilþættir sem leiða vinnuna áfram.',
    }),
    defineField({
      name: 'items',
      title: 'Stoðir',
      type: 'array',
      of: [
        defineField({
          name: 'pillar',
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Titill', type: 'string'}),
            defineField({
              name: 'description',
              title: 'Lýsing',
              type: 'text',
              rows: 3,
            }),
          ],
        }),
      ],
      initialValue: [
        {
          title: 'Gagnadrifið greiningarferli',
          description:
            'Við lesum í gögnin um hvern stað og kortleggjum tækifæri til að styrkja samfélagið og hagræna innviði.',
        },
        {
          title: 'Samráð og samvinna',
          description:
            'Við leiðum samtal milli íbúa, stofnana og hagsmunaaðila til að tryggja að lausnirnar séu sameiginleg framtíðarsýn.',
        },
        {
          title: 'Árangur sem standast próf',
          description:
            'Við fylgjum verkefnum eftir með mælikvörðum sem sýna raunveruleg áhrif á lífsgæði og umhverfi til lengri tíma.',
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'badge',
    },
    prepare: ({title, subtitle}) => ({
      title: title || 'Stoðir',
      subtitle: subtitle || 'Pillars section',
    }),
  },
});

