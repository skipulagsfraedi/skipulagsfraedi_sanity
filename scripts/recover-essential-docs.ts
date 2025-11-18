// scripts/recover-essential-docs.ts
// Script to recover/recreate deleted siteSettings and frontpageContent documents
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

async function recoverEssentialDocuments() {
  console.log('🔧 Starting recovery of essential documents...\n')

  try {
    // 1. Recover Site Settings
    console.log('📝 Recovering site settings...')
    const siteSettings = await client.createOrReplace({
      _id: 'siteSettings',
      _type: 'siteSettings',
      title: 'Site settings',
      footerNotice: 'Skipulagsfræðingafélag Íslands - Að skapa betri borgarrými fyrir alla',
      footerEmail: 'hallo@skipulagsfraedi.is',
    })
    console.log('✅ Site settings recovered/created\n')

    // 2. Recover Frontpage Content
    console.log('🏠 Recovering frontpage content...')
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
    console.log('✅ Frontpage content recovered/created\n')

    console.log('🎉 Successfully recovered essential documents!')
    console.log('\n📋 Summary:')
    console.log('  • Site settings recovered/created')
    console.log('  • Frontpage content recovered/created (with hero, news, and sections)')
    console.log('\n✨ You can now view and edit these documents in Sanity Studio!')
    console.log('   The "deleted" prompt should be gone.')
  } catch (error) {
    console.error('❌ Error recovering documents:', error)
    process.exit(1)
  }
}

recoverEssentialDocuments()

