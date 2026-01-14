# How to set up Google Drive Automatic Backup

To enable automatic backups of your portfolio data to Google Drive, follow these steps:

### 1. Create a Google Apps Script
1.  Log in to your Google Account: **ishoracharya.bct076@mbman.edu.np**
2.  Go to [script.google.com](https://script.google.com/).
3.  Click **New Project**.
4.  Delete any code in the editor and paste the following:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const folderName = "Portfolio_Backups";
    
    // Find or create folder
    let folders = DriveApp.getFoldersByName(folderName);
    let folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(folderName);
    
    // Create new file with timestamp
    const fileName = "backup_" + new Date().toISOString().replace(/[:.]/g, "-") + ".json";
    folder.createFile(fileName, JSON.stringify(data, null, 2), MimeType.PLAIN_TEXT);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Backup saved to Drive" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### 2. Deploy as a Web App
1.  Click **Deploy** > **New deployment**.
2.  Select Type: **Web app**.
3.  Description: `Portfolio Backup Service`.
4.  Execute as: **Me**.
5.  Who has access: **Anyone** (This is necessary for your static site to send data, but the URL is private to you).
6.  Click **Deploy**.
7.  **Authorize Access**: Follow the prompts to allow the script to access your Google Drive.
8.  **Copy the Web App URL**: It will look like `https://script.google.com/macros/s/.../exec`.

### 3. Connect to your Admin Panel
1.  Go to your **Admin Panel** > **Settings**.
2.  Paste the URL into the **Google Drive Backup URL** field.
3.  Click **Save Settings**.
4.  Click **Backup Now** to test it!

Once set up, your data will be stored safely in a folder named `Portfolio_Backups` in your Google Drive.
