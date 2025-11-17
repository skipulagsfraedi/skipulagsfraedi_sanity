// schemaTypes/frontpageContentType.ts
import {defineField, defineType} from 'sanity';

const heroDefaults = {
  badge: 'Vefur í vinnslu',
  title: 'Skipulagsfræði skapar sveigjanlegar lausnir fyrir íslenskt skipulag',
  subtitle:
    'Við vinnum með sveitarfélögum, stofnunum og samstarfsaðilum að því að skilgreina og móta nýju kynslóðina af borgarrýmum. Þessi síða er í uppbyggingu en hér má finna helstu upplýsingar og tengiliði.',
  primaryLabel: 'Skoða verkefni',
  primaryHref: '#project',
  secondaryLabel: 'Hafðu samband',
  secondaryHref: '#contact',
};

const newsDefaults = {
  badge: 'Fréttir',
  title: 'Nýjustu tíðindi úr starfseminni',
  description: 'Lestu um verkefni, viðburði og sjónarmið skipulagsfræðinga.',
  ctaLabel: 'Sjá allar fréttir',
  ctaHref: '/frettir',
  readMoreLabel: 'Lesa meira →',
};

const teamDefaults = {
  title: 'Teymið',
  body:
    'Við búum saman til leiðir sem byggja á rannsóknum, innblæstri og samtali við fólkið sem býr í hverfinu. Kynntu þér starfsfólkið og samstarfsaðila fljótlega hér.',
};

const pillarDefaults = {
  badge: 'Skipulag í forgrunni',
  title: 'Hvernig við mótum framtíðarrými',
  description:
    'Við unnum af alúð að lausnum sem gera byggðir að betri stöðum. Hér eru þrír lykilþættir sem leiða vinnuna áfram.',
  items: [
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
};

const contactDefaults = {
  title: 'Hafðu samband',
  lead: 'Best er að senda okkur línu á',
  note: 'Við svarum fljótt og erum ávallt opin fyrir samtali um nýjar hugmyndir.',
  email: 'hallo@skipulagsfraedi.is',
  emailLabel: 'hallo@skipulagsfraedi.is',
};

export const frontpageContentType = defineType({
  name: 'frontpageContent',
  title: 'Forsíðuefni',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'news', title: 'Fréttir'},
    {name: 'team', title: 'Stjórn'},
    {name: 'pillars', title: 'Stoðir'},
    {name: 'contact', title: 'Hafðu samband'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Heiti skráningar',
      type: 'string',
      initialValue: 'Forsíðuefni',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'heroBadge',
      title: 'Yfirtexti (hero)',
      type: 'string',
      initialValue: heroDefaults.badge,
      group: 'hero',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Titill (hero)',
      type: 'string',
      initialValue: heroDefaults.title,
      group: 'hero',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Undirtexti (hero)',
      type: 'text',
      rows: 4,
      initialValue: heroDefaults.subtitle,
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Mynd (hero)',
      type: 'image',
      options: {hotspot: true},
      group: 'hero',
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
      name: 'heroPrimaryCta',
      title: 'Aðalhnappur',
      type: 'object',
      initialValue: {
        label: heroDefaults.primaryLabel,
        href: heroDefaults.primaryHref,
      },
      group: 'hero',
      fields: [
        defineField({name: 'label', title: 'Texti', type: 'string'}),
        defineField({name: 'href', title: 'Slóð', type: 'string'}),
      ],
    }),
    defineField({
      name: 'heroSecondaryCta',
      title: 'Aukahnappur',
      type: 'object',
      initialValue: {
        label: heroDefaults.secondaryLabel,
        href: heroDefaults.secondaryHref,
      },
      group: 'hero',
      fields: [
        defineField({name: 'label', title: 'Texti', type: 'string'}),
        defineField({name: 'href', title: 'Slóð', type: 'string'}),
      ],
    }),
    defineField({
      name: 'newsBadge',
      title: 'Yfirtexti',
      type: 'string',
      initialValue: newsDefaults.badge,
      group: 'news',
    }),
    defineField({
      name: 'newsTitle',
      title: 'Titill',
      type: 'string',
      initialValue: newsDefaults.title,
      group: 'news',
    }),
    defineField({
      name: 'newsDescription',
      title: 'Lýsing',
      type: 'text',
      rows: 3,
      initialValue: newsDefaults.description,
      group: 'news',
    }),
    defineField({
      name: 'newsReadMoreLabel',
      title: 'Lesa meira texti',
      type: 'string',
      initialValue: newsDefaults.readMoreLabel,
      group: 'news',
    }),
    defineField({
      name: 'newsCta',
      title: 'CTA',
      type: 'object',
      initialValue: {
        label: newsDefaults.ctaLabel,
        href: newsDefaults.ctaHref,
      },
      group: 'news',
      fields: [
        defineField({name: 'label', title: 'Texti', type: 'string'}),
        defineField({name: 'href', title: 'Slóð', type: 'string'}),
      ],
    }),
    defineField({
      name: 'teamTitle',
      title: 'Titill',
      type: 'string',
      initialValue: teamDefaults.title,
      group: 'team',
    }),
    defineField({
      name: 'teamDescription',
      title: 'Lýsing',
      type: 'text',
      rows: 3,
      initialValue: teamDefaults.body,
      group: 'team',
    }),
    defineField({
      name: 'pillarsBadge',
      title: 'Yfirtexti ',
      type: 'string',
      initialValue: pillarDefaults.badge,
      group: 'pillars',
    }),
    defineField({
      name: 'pillarsTitle',
      title: 'Titill',
      type: 'string',
      initialValue: pillarDefaults.title,
      group: 'pillars',
    }),
    defineField({
      name: 'pillarsDescription',
      title: 'Lýsing',
      type: 'text',
      rows: 3,
      initialValue: pillarDefaults.description,
      group: 'pillars',
    }),
    defineField({
      name: 'pillars',
      title: 'Stoðir',
      type: 'array',
      group: 'pillars',
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
      initialValue: pillarDefaults.items,
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'contactTitle',
      title: 'Titill',
      type: 'string',
      initialValue: contactDefaults.title,
      group: 'contact',
    }),
    defineField({
      name: 'contactLead',
      title: 'Inngangur',
      type: 'string',
      initialValue: contactDefaults.lead,
      group: 'contact',
    }),

    // TODO: We only need one field for the email, the label should be the email address
    defineField({
      name: 'contactEmailLabel',
      title: 'Netfangstexti',
      type: 'string',
      initialValue: contactDefaults.emailLabel,
      group: 'contact',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Netfang / mailto',
      type: 'string',
      initialValue: contactDefaults.email,
      group: 'contact',
    }),
    defineField({
      name: 'contactNote',
      title: 'Viðbótartexti',
      type: 'text',
      rows: 3,
      initialValue: contactDefaults.note,
      group: 'contact',
    }),
  ],
  preview: {
    select: {
      // Selecting a field ensures Sanity runs prepare and avoids "Untitled" labels
      title: 'heroTitle',
    },
    prepare: () => ({
      title: 'Forsíðuefni',
      subtitle: 'Allt efni forsíðu',
    }),
  },
});


