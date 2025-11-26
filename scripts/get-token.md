# Getting a Sanity API Token

If you're getting a "Insufficient permissions" error, try these methods:

## Method 1: Project-Specific API Settings (Easiest)

1. Go directly to your project's API settings:
   ```
   https://www.sanity.io/manage/project/cpe0lcma/api
   ```

2. Click **"Add API token"**

3. Configure the token:
   - **Name**: "Seed Script" (or any name you prefer)
   - **Permissions**: Select **"Editor"** (or "Admin" if you need full access)
   - **Dataset**: Leave as "All datasets" or select "production"

4. Click **"Save"** and copy the token

## Method 2: Through Sanity Studio

1. Make sure you're logged into Sanity Studio:
   ```bash
   cd skipulagsfraedi_sanity
   npm run dev
   ```

2. Open the Studio in your browser (usually http://localhost:3333)

3. Click on your profile icon (top right)

4. Go to **Settings** → **API**

5. Click **"Add API token"** and follow the steps

## Method 3: Check Your Account Access

If you're getting permission errors, you might not have access to the project:

1. **Check if you're logged into the correct account**
   - The project `cpe0lcma` might belong to a different Sanity account
   - Try logging out and logging back in

2. **Ask the project owner to add you**
   - The project owner needs to add you as a collaborator
   - Go to: https://www.sanity.io/manage/project/cpe0lcma/members
   - (You'll need the owner to do this if you don't have access)

3. **Check if the project is in an organization**
   - If the project is in an organization, you need to be a member
   - Contact the organization admin

## Method 4: Use Sanity CLI (Alternative)

If you have the Sanity CLI installed and authenticated:

```bash
# Login to Sanity
npx sanity login

# The CLI will handle authentication automatically
# You can then use the scripts with the token from the CLI session
```

## Troubleshooting

**"Insufficient permissions" error:**
- Make sure you're logged into the account that owns/has access to project `cpe0lcma`
- Try accessing the project directly: https://www.sanity.io/manage/project/cpe0lcma
- If you can't access the project, you need to be added as a collaborator

**Token not working:**
- Make sure the token has **Editor** or **Admin** permissions (not just **Viewer**)
- Check that the token is for the correct dataset (`production`)
- Verify the token is set correctly: `echo $SANITY_API_WRITE_TOKEN` (or `echo %SANITY_API_WRITE_TOKEN%` on Windows)


