

## Remove Announcement Bar from All Pages

Remove the sticky "Schedule Your Strategy Session" banner that appears across the site.

### Changes

**`src/App.tsx`**
- Remove the `AnnouncementBar` import
- Remove the `showAnnouncementBar` logic and the `{showAnnouncementBar && <AnnouncementBar />}` render

**`src/components/AnnouncementBar.tsx`**
- Delete the file (no longer needed)

