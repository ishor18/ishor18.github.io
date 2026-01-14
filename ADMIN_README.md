# Admin Panel Documentation

## Access Information

**Admin Panel URL:** `http://ishoracharya.com.np/admin.html`


## Features

### 1. Dashboard Overview
- View statistics for all content
- Total projects count
- Completed projects count
- Total testimonials
- Total expertise areas

### 2. Projects Management
**Add/Edit Projects:**
- Project Name
- Icon (FontAwesome class)
- Status (Completed, In Progress, Planning)
- Description
- Technologies/Tags
- Project Link (optional)

**Features:**
- Add new projects
- Edit existing projects
- Delete projects
- Manage project status
- Add project links

### 3. Testimonials Management
**Add/Edit Testimonials:**
- Client Name
- Role/Title
- Testimonial Text
- Photo Upload (optional, up to 2MB)

**Features:**
- Add new testimonials
- Edit existing testimonials
- Delete testimonials
- Upload client photos
- Preview photos before saving

### 4. Expertise Management
**Add/Edit Expertise:**
- Icon (FontAwesome class)
- Title
- Description
- Skills (comma-separated list)

**Features:**
- Add new expertise areas
- Edit existing expertise
- Delete expertise areas
- Manage skill lists

### 5. Settings
**Data Management:**
- Export all data (JSON format)
- Import data from backup
- Clear all data (with confirmation)
- View account information

## How to Use

### Login
1. Navigate to `admin.html`
2. Enter your email and password
3. Click "Sign In"

### Managing Projects
1. Click "Projects" in the sidebar
2. Click "Add New Project" button
3. Fill in the project details
4. For icons, browse [FontAwesome](https://fontawesome.com/icons) and copy the class name
5. Click "Save Project"

### Managing Testimonials
1. Click "Testimonials" in the sidebar
2. Click "Add New Testimonial"
3. Fill in the testimonial details
4. Optionally upload a photo (PNG/JPG, max 2MB)
5. Click "Save Testimonial"

### Managing Expertise
1. Click "Expertise" in the sidebar
2. Click "Add New Expertise"
3. Fill in the expertise details
4. Enter skills separated by commas
5. Click "Save Expertise"

### Exporting Data
1. Go to Settings
2. Click "Export All Data"
3. A JSON file will be downloaded with all your data

### Importing Data
1. Go to Settings
2. Click "Import Data"
3. Select a previously exported JSON file
4. Data will be restored

## Data Storage

All data is stored in the browser's localStorage. This means:
- Data persists across sessions
- Data is stored locally in your browser
- You should regularly export backups
- Clearing browser data will delete all content

## Security

- Authentication is required to access the dashboard
- Session is maintained using localStorage
- Logout clears the session
- Only the correct email and password combination grants access

## Tips

1. **Regular Backups:** Export your data regularly to avoid data loss
2. **FontAwesome Icons:** Use the format `fas fa-icon-name` for solid icons
3. **Image Size:** Keep testimonial photos under 2MB for best performance
4. **Project Links:** Use full URLs including `https://`
5. **Tags/Skills:** Separate multiple items with commas

## Troubleshooting

**Can't login?**
- Verify you're using the correct email and password
- Check for typos (password is case-sensitive)

**Data not showing?**
- Refresh the page
- Check if you're in the correct section
- Try logging out and back in

**Lost data?**
- Check if you have an exported backup
- Verify browser localStorage is enabled

**Images not uploading?**
- Ensure file size is under 2MB
- Use PNG or JPG format only
- Check browser console for errors

## Browser Compatibility

The admin panel works best on:
- Chrome (recommended)
- Firefox
- Edge
- Safari

## Support

For issues or questions, contact: ishoracharya977@gmail.com
