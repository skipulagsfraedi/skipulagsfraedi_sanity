# Seed Dummy Content Script

This script populates your Sanity dataset with dummy content for styling and development purposes.

## Prerequisites

1. You need a Sanity write token. Here are several ways to get one:

   **Option A: Through Project Settings (Recommended)**
   - Go to: https://www.sanity.io/manage/project/cpe0lcma/api
   - Click "Add API token"
   - Give it a name (e.g., "Seed Script")
   - Select permissions: **Editor** (or **Admin** for full access)
   - Copy the token

   **Option B: Through Sanity Studio**
   - Run `npm run dev` in the Sanity project
   - Open the Studio (usually http://localhost:3333)
   - Click on your profile icon → Settings → API → Add API token

   **Option C: Through Personal API Tokens**
   - Make sure you're logged into the correct Sanity account
   - Go to: https://www.sanity.io/manage/personal/api
   - If you get a permissions error, you may need to:
     - Log in with the account that has access to project `cpe0lcma`
     - Or ask the project owner to add you as a collaborator

2. Set the token as an environment variable:
   ```bash
   export SANITY_API_WRITE_TOKEN=your_token_here
   ```
   
   Or on Windows:
   ```cmd
   set SANITY_API_WRITE_TOKEN=your_token_here
   ```

## Usage

1. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

2. Run the seed script:
   ```bash
   npm run seed
   ```

## What it creates

The script creates:

- **Site Settings**: Footer notice and email
- **Frontpage Content**: Complete frontpage with:
  - Hero section (with badge, title, subtitle, CTAs)
  - News section
  - Pillars section (3 pillars)
  - Team section
  - Contact section
- **Pages**:
  - "Um okkur" (parent page)
    - "Hafa samband" (child page)
    - "Um félagið" (child page)
  - "Nám í skipulagsfræði" (with collapsible list)
- **News Posts**: 5 dummy news posts with different publication dates

## Notes

- The script uses `createOrReplace` for site settings and frontpage content, so it's safe to run multiple times
- Pages and posts are created fresh each time (you may get duplicates if you run it multiple times)
- All content is in Icelandic (Íslenska) to match your site's language

## Removing Dummy Content

When you're done styling and want to remove all the dummy content:

```bash
npm run cleanup
```

**⚠️ IMPORTANT**: The cleanup script now requires explicit confirmation for each deletion. It will:
- Show you exactly what will be deleted before deleting
- Ask for confirmation before deleting site settings (singleton document)
- Ask for confirmation before deleting frontpage content (singleton document)
- Show a list of pages and posts that match dummy slugs and ask for confirmation
- Allow you to skip any deletion you don't want to perform

This will delete (only if you confirm):
- Site settings (ONLY if you explicitly confirm - this is a singleton document!)
- Frontpage content (ONLY if you explicitly confirm - this is a singleton document!)
- Dummy pages (by slug): "Um okkur", "Hafa samband", "Um félagið", "Nám í skipulagsfræði"
- Dummy posts (by slug): All 5 news posts created by the seed script

**✅ Safe**: The cleanup script only deletes content that matches specific dummy slugs, and requires confirmation for singleton documents (siteSettings, frontpageContent) which may contain real content.

## Recovering Deleted Content

If content was accidentally deleted, see `scripts/recover-content.md` for recovery instructions.

