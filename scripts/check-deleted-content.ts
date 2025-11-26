// scripts/check-deleted-content.ts
// Script to check for recently deleted or modified content in Sanity
import {createClient} from '@sanity/client'

const projectId = 'cpe0lcma'
const dataset = 'production'
const apiVersion = '2024-01-01'

const token = process.env.SANITY_API_WRITE_TOKEN

if (!token) {
  console.error('Error: SANITY_API_WRITE_TOKEN environment variable is required')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
})

async function checkDeletedContent() {
  console.log('🔍 Checking for recently modified content...\n')

  try {
    // Get all pages ordered by update time
    console.log('📄 Recent pages (last 20):')
    const recentPages = await client.fetch(`
      *[_type == "page"] | order(_updatedAt desc) [0...20] {
        _id,
        title,
        "slug": slug.current,
        _updatedAt,
        _createdAt
      }
    `)

    if (recentPages.length === 0) {
      console.log('   No pages found\n')
    } else {
      recentPages.forEach((page: any) => {
        const updated = new Date(page._updatedAt).toLocaleString()
        console.log(`   - ${page.title} (${page.slug}) - Updated: ${updated}`)
      })
      console.log('')
    }

    // Get all posts ordered by update time
    console.log('📰 Recent posts (last 20):')
    const recentPosts = await client.fetch(`
      *[_type == "post"] | order(_updatedAt desc) [0...20] {
        _id,
        title,
        "slug": slug.current,
        _updatedAt,
        _createdAt,
        publishedAt
      }
    `)

    if (recentPosts.length === 0) {
      console.log('   No posts found\n')
    } else {
      recentPosts.forEach((post: any) => {
        const updated = new Date(post._updatedAt).toLocaleString()
        console.log(`   - ${post.title} (${post.slug}) - Updated: ${updated}`)
      })
      console.log('')
    }

    // Check for site settings
    console.log('⚙️  Site settings:')
    const siteSettings = await client.fetch('*[_id == "siteSettings"][0]')
    if (siteSettings) {
      console.log('   ✅ Site settings document exists')
      console.log(`   Updated: ${new Date(siteSettings._updatedAt).toLocaleString()}\n`)
    } else {
      console.log('   ❌ Site settings document NOT FOUND (may have been deleted)\n')
    }

    // Check for frontpage content
    console.log('🏠 Frontpage content:')
    const frontpage = await client.fetch('*[_id == "frontpageContent"][0]')
    if (frontpage) {
      console.log('   ✅ Frontpage content document exists')
      console.log(`   Updated: ${new Date(frontpage._updatedAt).toLocaleString()}\n`)
    } else {
      console.log('   ❌ Frontpage content document NOT FOUND (may have been deleted)\n')
    }

    console.log('💡 Tip: Check Sanity Studio for deleted documents that might be recoverable')
    console.log('   Run: npm run dev (in Sanity project) and look for deleted items')
    console.log('   See scripts/recover-content.md for more recovery options')
  } catch (error) {
    console.error('❌ Error checking content:', error)
    process.exit(1)
  }
}

checkDeletedContent()


