# Little Sparks Nursery & Primary School — Website

A complete, static, responsive school website: Home, About, Contact, Blog (+3 articles), Privacy Policy, Terms & Conditions.

## 1. Preview it locally
No build tools needed — it's plain HTML/CSS/JS.
- Easiest: double-click `index.html` to open it in a browser.
- Better (so relative links behave exactly like a real server): in VS Code, install the "Live Server" extension, right-click `index.html` → "Open with Live Server".

## 2. Customize before going live
Search-and-replace across all `.html` files for:
- `Little Sparks` → your real school name
- `123 Learning Lane, Coimbatore, Tamil Nadu` → your real address
- `hello@littlesparks-school.example` / `+91 00000 00000` → your real contact details
- `littlesparks-school.example` → your real domain (appears in `<link rel="canonical">`, Open Graph tags, `sitemap.xml`, `robots.txt`)

In VS Code: `Ctrl+Shift+H` (Windows) or `Cmd+Shift+H` (Mac) opens Find & Replace across all files.

## 3. Hook up the contact form
The form in `contact.html` currently only validates in the browser — it doesn't send anywhere yet. Easiest options:
- **Formspree** (no backend code): sign up, get a form endpoint, set `<form id="contactForm" action="https://formspree.io/f/yourid" method="POST">`.
- **Netlify Forms**: if you deploy on Netlify, add `data-netlify="true"` to the `<form>` tag.

## 4. Deploy (free options)
Since you already use Git/GitHub:
1. Push this folder to a new GitHub repo.
2. Go to the repo's Settings → Pages → set source to your main branch, root folder.
3. GitHub gives you a live URL like `yourname.github.io/repo-name`.
4. (Optional) Point a custom domain at it later.

## 5. Before applying for Google AdSense
AdSense typically wants to see:
- [ ] A **real, custom domain** (not just a subdomain like `.github.io` in most regions — check current AdSense requirements)
- [ ] **Original content** — the 3 blog posts included are a starting point; add more over time
- [ ] Working **Privacy Policy** and **Terms & Conditions** pages (included — just update placeholder details)
- [ ] Easy **navigation** and a working **Contact** page (included)
- [ ] The site **live and indexed for a few weeks** with real traffic before applying
- [ ] No copyrighted/placeholder images left on the live site — replace the emoji/CSS placeholders with real photos of your actual school if you want a more authentic feel
- [ ] Fast load time and mobile-friendliness (this site is lightweight — no heavy images, minimal JS)

Apply at https://www.google.com/adsense/ once the above are in place, and follow their program policies at https://support.google.com/adsense/answer/48182.

## 6. File structure
```
school-site/
├── index.html
├── about.html
├── contact.html
├── blog.html
├── blog-post-1.html / 2 / 3
├── privacy-policy.html
├── terms.html
├── robots.txt
├── sitemap.xml
├── css/style.css
└── js/script.js
```
