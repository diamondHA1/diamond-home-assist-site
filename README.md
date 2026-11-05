# Diamond Home Assist — Website

A clean, static marketing site for **Diamond Home Assist**, a Michigan non-medical
in-home care agency.

**Tagline:** *Because your loved one is a gem.*

---

## How to open it

**Option A — just preview**
Double-click `index.html` and it opens in your browser. That's it.

**Option B — in VS Code (recommended)**
1. Open this folder in VS Code (`File → Open Folder…`).
2. Install the **Live Server** extension (Microsoft).
3. Right-click `index.html` → **Open with Live Server**.
   This auto-refreshes as you edit.

No build step, no installs, no frameworks — plain HTML, CSS, and a little JavaScript.

---

## What's inside

```
diamond-home-assist/
├── index.html                      ← Home (AI-chat hero + logo + tagline)
├── services.html                   ← Services
├── about.html                      ← About / values
├── articles.html                   ← Resources listing
├── contact.html                    ← Contact form + details
├── articles/
│   ├── family-caregiver-pay.html
│   ├── home-help-guide.html
│   └── what-home-care-covers.html
├── styles.css                      ← Shared styles + brand colors
├── chat.css                        ← Homepage chat styles
├── script.js                       ← Mobile menu + chat demo logic
└── assets/
    ├── logo.png                    ← Your full uploaded logo
    ├── mark.png                    ← Logo emblem only (used in nav/footer)
    ├── wordmark.png                ← "DIAMOND HOME ASSIST" text only
    ├── elder-care.jpg              ← Stock photo (Pexels)
    ├── elder-home.jpg
    ├── elder-companion.jpg
    └── caregiver-help.jpg
```

---

## ⚠️ Placeholders to replace with YOUR real info

These are stand-ins so the site looks finished. Search-and-replace across files:

| Placeholder | Found in | Replace with |
|---|---|---|
| `(248) 555-0156` | footer + contact page | DONE: (313) 889-7575 |
| `info@diamondhomeassist.com` | footer + contact page | your real email |
| `Troy, MI (mailing)` | contact page | your real service area / mailing city |
| `Mon–Fri, 8 AM – 6 PM ET` | contact page | your real hours |

> The phone number used is a reserved "555-01xx" fictional number on purpose, so it
> won't ring a real person before you swap it out.

---

## Photos

The site uses **stock photos** in `assets/` (sourced from Pexels) as placeholders.
When you have your own photos of clients and caregivers in uniform, replace the
`elder-*.jpg` and `caregiver-help.jpg` files and keep the same filenames — or
update the `src` paths in the HTML. Use bright, warm, well-lit photos and ensure
you have permission or model releases for anyone pictured.

---

## Making the chat assistant "real" (optional, later)

The homepage chat currently gives helpful **scripted** answers (see `script.js`).
That's perfect for a launch — it works offline and costs nothing.

To connect it to a live AI model later, you'd add a small backend (so your API key
stays secret — never put an API key in `script.js`, since visitors can read it).
A simple serverless function (e.g. Cloudflare Workers, Vercel, Netlify) that calls
the model and returns the reply is the standard approach. Happy to help wire that up.

---

## Making the contact form actually send

The form on `contact.html` shows a success message but doesn't email yet. Easiest
no-code option: sign up for a form service like **Formspree** or **Web3Forms**,
then point the form at their endpoint. Ask and I'll set it up for you.

---

*Built for Diamond Home Assist. Non-medical home care · Michigan.*
