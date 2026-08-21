# JobEngine Auto-Apply — Chrome Extension

Real auto-fill for job applications. A web app cannot fill forms on another
company's site (browser security), so this runs **inside your own browser** on
the actual Greenhouse / Lever apply page and fills it from your JobEngine
profile — exactly how Tsenta's extension works.

## What it does
- On any **Greenhouse** or **Lever** application page, shows a floating **⚡ JobEngine Auto-fill** button.
- Click it → fills **name, email, phone, LinkedIn, GitHub, location** and matching text fields from your saved JobEngine profile.
- You then **drag in your tailored resume** (download it from /jobengine) and hit Submit.

> The resume file must be attached by you — browsers block scripts from setting a file input for security. Everything else is auto-filled.

## Install (load unpacked)
1. Open your resume once at `http://localhost:3000/jobengine` (upload + match) so a profile exists for your email.
2. Go to `chrome://extensions` → toggle **Developer mode** (top right).
3. Click **Load unpacked** → select this `extension/` folder.
4. Click the extension icon → enter the **same email** you used on /jobengine → **Save**.
5. Open any Greenhouse/Lever job's **Apply** page → click **⚡ JobEngine Auto-fill**.

## Production
In the popup under **Advanced: API URL**, set your deployed app URL (e.g.
`https://yourapp.vercel.app`) instead of `http://localhost:3000`, and add that
origin to `host_permissions` in `manifest.json`.

## Roadmap (v2)
- Answer open-ended screener questions in the user's voice (via JobEngine tailoring).
- One-click flow straight from a JobEngine match.
- Cover-letter field auto-fill.
