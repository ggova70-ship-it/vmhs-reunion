# VMHS Reunion 2026-2027 — GRT Dashboard

A full-featured Next.js dashboard for the Vivekananda Municipal High School batch 2006-2007 reunion event.

## Features

✅ **Home Page** — Live countdown timer (days, hours, minutes, seconds)  
✅ **Mobile-First UI** — Fully responsive design for all devices  
✅ **Admin Authentication** — Secure login (Messi / Fifa2026)  
✅ **Gallery** — Public view images; admin upload/delete; like & comment system for all users  
✅ **Students** — Filter by All / Boys / Girls  
✅ **Events** — View-only for public; admin can add/edit/delete events  
✅ **Persistent Storage** — JSON-based storage + Cloudinary for images  
✅ **Production-Ready** — Deploy on Vercel with automated builds  

## Event Details

- **Event Name:** GRT - Grand Reunion & Get Together
- **Batch:** 2006-2007
- **School:** Vivekananda Municipal High School
- **Location:** VMHS school, NG Palle, Madanapalle
- **Date:** August 9, 2026
- **Time:** 9:00 PM onwards

## Setup & Deployment

### Prerequisites

1. Create a free Cloudinary account (for image storage)
   - Sign up at https://cloudinary.com/
   - Copy your Cloud name, API Key, and API Secret from Account Details

2. Node.js 18+ installed locally (for testing)

### Environment Variables

You must set these in Vercel before deploying:

- `CLOUDINARY_CLOUD_NAME` — Your Cloudinary cloud name
- `CLOUDINARY_API_KEY` — Your Cloudinary API key
- `CLOUDINARY_API_SECRET` — Your Cloudinary API secret
- `OWNER_PASSWORD` — Admin password (default: Fifa2026)

### Deploy to Vercel

1. Go to https://vercel.com and log in
2. Click "New Project" → "Import Git Repository"
3. Select `ggova70-ship-it/vmhs-reunion` repository
4. In **Environment Variables** section, add:
   - CLOUDINARY_CLOUD_NAME
   - CLOUDINARY_API_KEY
   - CLOUDINARY_API_SECRET
   - OWNER_PASSWORD
5. Click "Deploy"
6. Once deployment completes ("Ready"), you'll get a public `.vercel.app` URL

### Test Locally (Optional)

```bash
# Clone and install
git clone https://github.com/ggova70-ship-it/vmhs-reunion
cd vmhs-reunion
npm install

# Create .env.local file
cat > .env.local << EOF
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
OWNER_PASSWORD=Fifa2026
EOF

# Run dev server
npm run dev

# Open http://localhost:3000
```

## Usage

### Public Users
- View the home page with live countdown
- Browse students (filter by All/Boys/Girls)
- View events
- View gallery images
- Like and comment on gallery images

### Admin Users

1. Click "Login" button (top-right)
2. Enter credentials:
   - Username: `Messi`
   - Password: `Fifa2026` (or your OWNER_PASSWORD env var)
3. Admin access includes:
   - Upload images to gallery (max 10 images)
   - Delete images
   - Add, edit, and delete events

### Gallery

- **Public:** Can view all images, like (❤️), and comment (💬)
- **Admin:** Can upload and delete images
- **Max images:** 10 (enforced on both client and server)
- **Storage:** Cloudinary (automatically resized and optimized)

## API Endpoints

- `POST /api/login` — Admin login
- `POST /api/logout` — Admin logout
- `GET /api/auth` — Check admin session
- `GET /api/images` — List all images with likes/comments
- `POST /api/images` — Upload image (admin only)
- `DELETE /api/images/:id` — Delete image (admin only)
- `POST /api/likes/:imageId` — Like an image
- `POST /api/comments/:imageId` — Add comment to image
- `GET /api/events` — List all events
- `POST /api/events` — Create event (admin only)
- `PUT /api/events/:id` — Update event (admin only)
- `DELETE /api/events/:id` — Delete event (admin only)

## Security Notes

- Admin password is stored server-side only (in OWNER_PASSWORD env var)
- Credentials are never embedded in client JavaScript
- HTTP-only cookies used for session management
- Images are publicly served via Cloudinary CDN
- All admin operations require valid authentication token

## Troubleshooting

### "404: DEPLOYMENT_NOT_FOUND"
- Ensure environment variables are set in Vercel Project Settings
- Trigger a redeploy from Vercel dashboard
- Check deployment logs for build errors

### Images not uploading
- Verify Cloudinary credentials in env vars
- Check Cloudinary account storage limits
- Ensure you're logged in as admin

### Comments/likes not persisting
- Data is stored in JSON files in the `/data` directory
- On Vercel's serverless functions, this storage is ephemeral
- For permanent storage, consider upgrading to a database (Firebase, Supabase, etc.)

## Future Enhancements

- Add persistent database (Firebase, PostgreSQL) for likes/comments
- Email notifications for admin events
- Image tagging and filters
- Photo download functionality
- RSVP system for events
- Social media sharing

## Support

For issues or questions, open an issue on the GitHub repository.

---

**Made with ❤️ for VMHS Batch 2006-2007**
