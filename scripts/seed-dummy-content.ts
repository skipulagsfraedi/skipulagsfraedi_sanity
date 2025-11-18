// scripts/seed-dummy-content.ts
// Script to populate Sanity with dummy content for styling the Astro frontend
import {createClient} from '@sanity/client'

const projectId = 'cpe0lcma'
const dataset = 'production'
const apiVersion = '2024-01-01'

// Note: This script requires a write token. Set it as an environment variable:
// SANITY_API_WRITE_TOKEN=your_token_here
const token = process.env.SANITY_API_WRITE_TOKEN

if (!token) {
  console.error('Error: SANITY_API_WRITE_TOKEN environment variable is required')
  console.error('\nTo get a token, try one of these methods:')
  console.error('1. Project API settings: https://www.sanity.io/manage/project/cpe0lcma/api')
  console.error('2. Through Sanity Studio: Run "npm run dev" → Profile → Settings → API')
  console.error('3. See scripts/get-token.md for detailed instructions')
  console.error('\nThen set it with: export SANITY_API_WRITE_TOKEN=your_token_here')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
})

async function createDummyContent() {
  console.log('🌱 Starting to seed dummy content...\n')

  try {
    // 1. Create Site Settings
    console.log('📝 Creating site settings...')
    const siteSettings = await client.createOrReplace({
      _id: 'siteSettings',
      _type: 'siteSettings',
      title: 'Site settings',
      footerNotice: 'Skipulagsfræðingafélag Íslands - Að skapa betri borgarrými fyrir alla',
      footerEmail: 'hallo@skipulagsfraedi.is',
    })
    console.log('✅ Site settings created\n')

    // 2. Create Frontpage Content
    console.log('🏠 Creating frontpage content...')
    const frontpageContent = await client.createOrReplace({
      _id: 'frontpageContent',
      _type: 'frontpageContent',
      title: 'Forsíða',
      hero: {
        _type: 'heroSection',
        badge: 'Vefur í vinnslu',
        title: 'Skipulagsfræði skapar sveigjanlegar lausnir fyrir íslenskt skipulag',
        subtitle:
          'Við vinnum með sveitarfélögum, stofnunum og samstarfsaðilum að því að skilgreina og móta nýju kynslóðina af borgarrýmum. Þessi síða er í uppbyggingu en hér má finna helstu upplýsingar og tengiliði.',
        primaryCta: {
          label: 'Skoða verkefni',
          href: '#project',
        },
        secondaryCta: {
          label: 'Hafðu samband',
          href: '#contact',
        },
      },
      news: {
        _type: 'newsSection',
        badge: 'Fréttir',
        title: 'Nýjustu tíðindi úr starfseminni',
        description: 'Lestu um verkefni, viðburði og sjónarmið skipulagsfræðinga.',
        readMoreLabel: 'Lesa meira →',
        cta: {
          label: 'Sjá allar fréttir',
          href: '/frettir',
        },
      },
      sections: [
        {
          _type: 'pillarsSection',
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
        },
        {
          _type: 'teamSection',
          title: 'Stjórn',
          description:
            'Við búum saman til leiðir sem byggja á rannsóknum, innblæstri og samtali við fólkið sem býr í hverfinu. Kynntu þér starfsfólkið og samstarfsaðila fljótlega hér.',
        },
        {
          _type: 'contactSection',
          title: 'Hafðu samband',
          lead: 'Best er að senda okkur línu á',
          email: 'hallo@skipulagsfraedi.is',
          note: 'Við svarum fljótt og erum ávallt opin fyrir samtali um nýjar hugmyndir.',
        },
      ],
    })
    console.log('✅ Frontpage content created\n')

    // 3. Create Dummy Pages
    console.log('📄 Creating dummy pages...')
    const umOkkurPage = await client.create({
      _type: 'page',
      title: 'Um okkur',
      slug: {
        _type: 'slug',
        current: 'um-okkur',
      },
      content: [
        {
          _type: 'block',
          style: 'h1',
          children: [
            {
              _type: 'span',
              text: 'Um Skipulagsfræðingafélag Íslands',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Skipulagsfræðingafélag Íslands er félag skipulagsfræðinga sem starfar að því að efla starfssviðið og kynna mikilvægi skipulagsfræði fyrir íslenskt samfélag.',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Félagið var stofnað árið 1985 og hefur síðan verið leiðandi í umræðu um skipulagsmál á Íslandi.',
              marks: [],
            },
          ],
        },
      ],
    })
    console.log('✅ Created page: Um okkur')

    const hafaSambandPage = await client.create({
      _type: 'page',
      title: 'Hafa samband',
      slug: {
        _type: 'slug',
        current: 'hafa-samband',
      },
      parent: {
        _type: 'reference',
        _ref: umOkkurPage._id,
      },
      content: [
        {
          _type: 'block',
          style: 'h1',
          children: [
            {
              _type: 'span',
              text: 'Hafa samband',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Ef þú hefur spurningar eða vilt hafa samband við okkur, vinsamlegast sendu okkur línu á ',
              marks: [],
            },
            {
              _type: 'span',
              text: 'hallo@skipulagsfraedi.is',
              marks: ['strong'],
            },
            {
              _type: 'span',
              text: '.',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Við svarum fljótt og erum ávallt opin fyrir samtali um nýjar hugmyndir og samstarf.',
              marks: [],
            },
          ],
        },
      ],
    })
    console.log('✅ Created page: Hafa samband (child of Um okkur)')

    const umFelagidPage = await client.create({
      _type: 'page',
      title: 'Um félagið',
      slug: {
        _type: 'slug',
        current: 'um-felagid',
      },
      parent: {
        _type: 'reference',
        _ref: umOkkurPage._id,
      },
      content: [
        {
          _type: 'block',
          style: 'h1',
          children: [
            {
              _type: 'span',
              text: 'Um félagið',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Skipulagsfræðingafélag Íslands er félag sem sameinar skipulagsfræðinga um allt land. Félagið starfar að því að:',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: '• Efla starfssvið skipulagsfræðinga',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: '• Kynna mikilvægi skipulagsfræði',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: '• Stuðla að faglegri þróun',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: '• Efla samskipti milli fagfólks',
              marks: [],
            },
          ],
        },
      ],
    })
    console.log('✅ Created page: Um félagið (child of Um okkur)')

    const namPage = await client.create({
      _type: 'page',
      title: 'Nám í skipulagsfræði',
      slug: {
        _type: 'slug',
        current: 'nam-i-skipulagsfraedi',
      },
      content: [
        {
          _type: 'block',
          style: 'h1',
          children: [
            {
              _type: 'span',
              text: 'Nám í skipulagsfræði',
              marks: [],
            },
          ],
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Skipulagsfræði er námið sem fjallar um skipulag borga og byggða. Á Íslandi er hægt að læra skipulagsfræði við Háskóla Íslands.',
              marks: [],
            },
          ],
        },
        {
          _type: 'collapsibleList',
          title: 'Algengar spurningar um námið',
          items: [
            {
              title: 'Hvað er skipulagsfræði?',
              body: [
                {
                  _type: 'block',
                  style: 'normal',
                  children: [
                    {
                      _type: 'span',
                      text: 'Skipulagsfræði er fag sem fjallar um skipulag borga og byggða. Skipulagsfræðingar vinna að því að móta borgarrými sem eru sjálfbær, aðgengileg og góð fyrir íbúa.',
                      marks: [],
                    },
                  ],
                },
              ],
            },
            {
              title: 'Hvar get ég lært skipulagsfræði?',
              body: [
                {
                  _type: 'block',
                  style: 'normal',
                  children: [
                    {
                      _type: 'span',
                      text: 'Á Íslandi er hægt að læra skipulagsfræði við Háskóla Íslands. Námið er fjögurra ára grunnnám sem veitir grunn í skipulagsfræði og tengdum greinum.',
                      marks: [],
                    },
                  ],
                },
              ],
            },
            {
              title: 'Hvaða störf get ég fengið með gráðu í skipulagsfræði?',
              body: [
                {
                  _type: 'block',
                  style: 'normal',
                  children: [
                    {
                      _type: 'span',
                      text: 'Skipulagsfræðingar geta unnið hjá sveitarfélögum, ríkisstofnunum, ráðgjafafyrirtækjum og öðrum stofnunum sem vinna að skipulagsmálum.',
                      marks: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    })
    console.log('✅ Created page: Nám í skipulagsfræði (with collapsible list)\n')

    // 4. Create Dummy Posts (Fréttir)
    console.log('📰 Creating dummy news posts...')
    const now = new Date()
    const posts = [
      {
        title: 'Nýtt verkefni: Endurbætur á göngustígum í miðbænum',
        slug: 'nytt-verkefni-endurbaetur-a-gongustigum-i-midbaenum',
        publishedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
        content: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Skipulagsfræðingafélag Íslands hefur hafið nýtt verkefni um endurbætur á göngustígum í miðbænum. Verkefnið miðar að því að gera göngustígina öruggari og aðgengilegri fyrir alla.',
                marks: [],
              },
            ],
          },
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Verkefnið er í samstarfi við Reykjavíkurborg og er ætlað að vera lokið á næsta ári.',
                marks: [],
              },
            ],
          },
        ],
      },
      {
        title: 'Árlegur fundur félagsins',
        slug: 'arlegur-fundur-felagsins',
        publishedAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
        content: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Árlegur fundur Skipulagsfræðingafélags Íslands verður haldinn 15. mars. Á fundinum verður rætt um starfsemi félagsins á síðasta ári og framtíðarsýn.',
                marks: [],
              },
            ],
          },
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Allir meðlimir eru velkomnir. Nánari upplýsingar verða sendar út í febrúar.',
                marks: [],
              },
            ],
          },
        ],
      },
      {
        title: 'Ný rannsókn um áhrif skipulags á lífsgæði',
        slug: 'ny-rannsokn-um-ahrif-skipulags-a-lifsgaedi',
        publishedAt: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
        content: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Ný rannsókn sem birt var í síðustu viku sýnir mikilvægi góðs skipulags fyrir lífsgæði íbúa. Rannsóknin fjallar um tengsl milli skipulags og heilsu, félagslegs samstarfs og umhverfis.',
                marks: [],
              },
            ],
          },
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Rannsóknin er í fullu texta aðgengileg á vefnum okkar.',
                marks: [],
              },
            ],
          },
        ],
      },
      {
        title: 'Vinnustofa um sjálfbært skipulag',
        slug: 'vinnustofa-um-sjalfbaert-skipulag',
        publishedAt: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days ago
        content: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Skipulagsfræðingafélag Íslands heldur vinnustofu um sjálfbært skipulag í næstu viku. Vinnustofan er opið öllum sem hafa áhuga á að læra meira um sjálfbært skipulag og bestu starfsvenjur.',
                marks: [],
              },
            ],
          },
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Skráning er opið á vefnum okkar.',
                marks: [],
              },
            ],
          },
        ],
      },
      {
        title: 'Nýr meðlimur í stjórn félagsins',
        slug: 'nyr-medlimur-i-stjorn-felagsins',
        publishedAt: new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000).toISOString(), // 25 days ago
        content: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Skipulagsfræðingafélag Íslands hefur valið nýjan meðlim í stjórn félagsins. Nýi meðlimurinn hefur mikla reynslu af skipulagsmálum og mun bæta við stjórnina með sinni sérfræðiþekkingu.',
                marks: [],
              },
            ],
          },
        ],
      },
    ]

    for (const post of posts) {
      await client.create({
        _type: 'post',
        ...post,
        slug: {
          _type: 'slug',
          current: post.slug,
        },
      })
      console.log(`✅ Created post: ${post.title}`)
    }

    console.log('\n🎉 Successfully seeded all dummy content!')
    console.log('\n📋 Summary:')
    console.log('  • Site settings created')
    console.log('  • Frontpage content created (with hero, news, and sections)')
    console.log('  • 4 pages created (including nested pages)')
    console.log('  • 5 news posts created')
    console.log('\n✨ You can now view the content in your Astro site!')
  } catch (error) {
    console.error('❌ Error seeding content:', error)
    process.exit(1)
  }
}

createDummyContent()

