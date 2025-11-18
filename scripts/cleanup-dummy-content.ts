// scripts/cleanup-dummy-content.ts
// Script to remove dummy content created by seed-dummy-content.ts
// ⚠️ WARNING: This script will delete content. Use with caution!
import {createClient} from '@sanity/client'
import * as readline from 'readline'

const projectId = 'cpe0lcma'
const dataset = 'production'
const apiVersion = '2024-01-01'

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

function askQuestion(query: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close()
      resolve(ans)
    })
  )
}

async function cleanupDummyContent() {
  console.log('⚠️  WARNING: This script will delete dummy content from Sanity!')
  console.log('⚠️  Make sure you have a backup or can recover deleted content.\n')

  // Show what will be deleted
  console.log('📋 This script will delete:')
  console.log('  • Pages with slugs: um-okkur, hafa-samband, um-felagid, nam-i-skipulagsfraedi')
  console.log('  • Posts with specific dummy slugs (5 posts)')
  console.log('  • Site settings (ONLY if you confirm)')
  console.log('  • Frontpage content (ONLY if you confirm)\n')

  // Ask for confirmation
  const confirm = await askQuestion('❓ Do you want to continue? Type "yes" to confirm: ')
  if (confirm.toLowerCase() !== 'yes') {
    console.log('❌ Cleanup cancelled.')
    process.exit(0)
  }

  console.log('\n🧹 Starting cleanup of dummy content...\n')

  try {
    // Check if site settings and frontpage exist before asking
    const siteSettings = await client.fetch('*[_id == "siteSettings"][0]')
    const frontpageContent = await client.fetch('*[_id == "frontpageContent"][0]')

    // 1. Delete Site Settings (with confirmation)
    if (siteSettings) {
      console.log('⚠️  Site settings document found!')
      console.log('   This is a singleton document that may contain real content.')
      const confirmSettings = await askQuestion('   Delete site settings? Type "yes" to confirm: ')
      if (confirmSettings.toLowerCase() === 'yes') {
        try {
          await client.delete('siteSettings')
          console.log('✅ Site settings deleted\n')
        } catch (error: any) {
          if (error.statusCode !== 404) {
            throw error
          }
        }
      } else {
        console.log('⏭️  Skipping site settings deletion\n')
      }
    } else {
      console.log('ℹ️  Site settings not found\n')
    }

    // 2. Delete Frontpage Content (with confirmation)
    if (frontpageContent) {
      console.log('⚠️  Frontpage content document found!')
      console.log('   This is a singleton document that may contain real content.')
      const confirmFrontpage = await askQuestion('   Delete frontpage content? Type "yes" to confirm: ')
      if (confirmFrontpage.toLowerCase() === 'yes') {
        try {
          await client.delete('frontpageContent')
          console.log('✅ Frontpage content deleted\n')
        } catch (error: any) {
          if (error.statusCode !== 404) {
            throw error
          }
        }
      } else {
        console.log('⏭️  Skipping frontpage content deletion\n')
      }
    } else {
      console.log('ℹ️  Frontpage content not found\n')
    }

    // 3. Delete specific dummy Pages (by slug) - Show list first
    console.log('🗑️  Checking for dummy pages...')
    const dummyPageSlugs = [
      'um-okkur',
      'hafa-samband',
      'um-felagid',
      'nam-i-skipulagsfraedi',
    ]

    const pages = await client.fetch<Array<{_id: string; title: string; slug: {current: string}}>>(
      `*[_type == "page" && slug.current in $slugs]{_id, title, slug}`,
      {slugs: dummyPageSlugs}
    )

    if (pages.length === 0) {
      console.log('ℹ️  No dummy pages found\n')
    } else {
      console.log(`\n📄 Found ${pages.length} page(s) to delete:`)
      pages.forEach((page) => {
        console.log(`   - ${page.title} (${page.slug.current})`)
      })
      const confirmPages = await askQuestion('\n   Delete these pages? Type "yes" to confirm: ')
      if (confirmPages.toLowerCase() === 'yes') {
        for (const page of pages) {
          try {
            await client.delete(page._id)
            console.log(`✅ Deleted page: ${page.title} (${page.slug.current})`)
          } catch (error: any) {
            if (error.statusCode !== 404) {
              console.error(`❌ Error deleting page ${page.title}:`, error.message)
            }
          }
        }
        console.log(`✅ Deleted ${pages.length} page(s)\n`)
      } else {
        console.log('⏭️  Skipping pages deletion\n')
      }
    }

    // 4. Delete specific dummy Posts (by slug) - Show list first
    console.log('🗑️  Checking for dummy news posts...')
    const dummyPostSlugs = [
      'nytt-verkefni-endurbaetur-a-gongustigum-i-midbaenum',
      'arlegur-fundur-felagsins',
      'ny-rannsokn-um-ahrif-skipulags-a-lifsgaedi',
      'vinnustofa-um-sjalfbaert-skipulag',
      'nyr-medlimur-i-stjorn-felagsins',
    ]

    const posts = await client.fetch<Array<{_id: string; title: string; slug: {current: string}}>>(
      `*[_type == "post" && slug.current in $slugs]{_id, title, slug}`,
      {slugs: dummyPostSlugs}
    )

    if (posts.length === 0) {
      console.log('ℹ️  No dummy posts found\n')
    } else {
      console.log(`\n📰 Found ${posts.length} post(s) to delete:`)
      posts.forEach((post) => {
        console.log(`   - ${post.title} (${post.slug.current})`)
      })
      const confirmPosts = await askQuestion('\n   Delete these posts? Type "yes" to confirm: ')
      if (confirmPosts.toLowerCase() === 'yes') {
        for (const post of posts) {
          try {
            await client.delete(post._id)
            console.log(`✅ Deleted post: ${post.title} (${post.slug.current})`)
          } catch (error: any) {
            if (error.statusCode !== 404) {
              console.error(`❌ Error deleting post ${post.title}:`, error.message)
            }
          }
        }
        console.log(`✅ Deleted ${posts.length} post(s)\n`)
      } else {
        console.log('⏭️  Skipping posts deletion\n')
      }
    }

    console.log('🎉 Cleanup complete!')
    console.log('\n📋 Note: Only confirmed items were deleted.')
    console.log('   If you need to recover deleted content, see scripts/recover-content.md')
  } catch (error) {
    console.error('❌ Error during cleanup:', error)
    process.exit(1)
  }
}

cleanupDummyContent()

