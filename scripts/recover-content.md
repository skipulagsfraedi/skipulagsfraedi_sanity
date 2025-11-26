# Recovering Deleted Content

If the cleanup script accidentally deleted content, here are ways to recover it:

## Method 1: Sanity History (Best Option)

Sanity keeps a history of all document changes. You can recover deleted documents:

1. **Through Sanity Studio:**
   - Open your Sanity Studio: `npm run dev` in the Sanity project
   - Navigate to the document type (e.g., "Síða" for pages, "Færsla" for posts)
   - Look for deleted documents in the list - they may show as "Deleted" or in a trash/recent section
   - Click on the deleted document and look for a "Restore" or "History" option

2. **Through Sanity Vision (GROQ):**
   - In Sanity Studio, open the Vision tool (usually in the top menu)
   - Run this query to see deleted documents:
   ```groq
   *[_type == "page" && !defined(_deleted) == false] | order(_updatedAt desc)
   ```
   - Or check the history:
   ```groq
   *[_type == "page"] | order(_updatedAt desc) [0...10]
   ```

## Method 2: Check Drafts

Sometimes deleted documents are moved to drafts:

1. In Sanity Studio, look for a "Drafts" section
2. Check if your deleted content appears there
3. If found, you can restore it by publishing it again

## Method 3: Sanity API History

You can query the Sanity API for document history:

```javascript
// Check recent changes
const recentChanges = await client.fetch(`
  *[_type == "page"] | order(_updatedAt desc) [0...20] {
    _id,
    title,
    _updatedAt,
    _createdAt
  }
`)
```

## Method 4: Contact Sanity Support

If you have a paid plan, Sanity Support may be able to help recover deleted content from backups.

## Method 5: Manual Recreation

If recovery isn't possible, you'll need to manually recreate the content in Sanity Studio.

## Prevention for Future

The cleanup script has been updated to be much safer:
- It now requires explicit confirmation before deleting
- It only deletes content that matches specific criteria
- It won't delete siteSettings or frontpageContent unless you explicitly confirm


