# How to Deploy Your Portfolio Updates

Since your website is static (GitHub Pages), the changes you make in the Admin Panel are saved to your **browser** only. To make them visible to the **public**, you need to export your data and upload it to GitHub.

### Step 1: Export Data from Admin
1.  Log in to your **Admin Dashboard**.
2.  Go to **Settings**.
3.  Click **Export All Data**.
4.  A file named `backup.json` will be downloaded.

### Step 2: Prepare for Deployment
1.  Rename that file to `site-data.json`.
2.  Move `site-data.json` to the **root folder** of your project (where `index.html` is).

### Step 3: Push to GitHub
1.  Upload/Commit the new `site-data.json` file to your GitHub repository.
2.  Wait a minute for GitHub Pages to update.

### Result
- **You (Admin)**: Will see changes instantly (via LocalStorage).
- **Visitors**: Will see the content from `site-data.json` that you uploaded.

*Note: Your Google Drive backup is for your personal safety. The `site-data.json` file is what the public website reads.*
