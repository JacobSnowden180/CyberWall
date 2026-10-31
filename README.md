# CyberWall website (static, early-access)

A clean, static marketing site for **CyberWall**, a mostly-human web security service for small businesses running PHP-based online stores (WooCommerce, WordPress, Magento, Shopware). Plain HTML + CSS + a little vanilla JS. No build step, no external dependencies, no external fonts. It works by opening `index.html`.

## Files

| File | What it is |
|---|---|
| `index.html` | Home: hero, trust strip, "Why this matters now" (PHP2Shell), how it works, example update message, honest cost context, final CTA |
| `services.html` | What our people do (7 services), how it works, stores we support, honesty box, PHP2Shell context |
| `pricing.html` | Launch pricing (Essentials / Standard / Priority), what setup covers, price comparison line, FAQ accordion (`<details>`) |
| `about.html` | Founder-led, human-run team, mission, values, "Meet the team: bios coming soon" placeholder |
| `contact.html` | "Get started" form (front-end only), placeholder email |
| `style.css` | Shared styles (mobile-first, navy + teal, focus styles, responsive) |
| `script.js` | Mobile nav toggle, `?plan=` prefill, contact-form validation and confirmation message |
| `README.md` | This file |

The logo (shield + wall motif) is an inline SVG in each page's header/footer; the favicon is an inline SVG data-URI in each page's `<head>`. No image files are used.

## Preview

Open `index.html` directly in a browser, or:

```
cd cyberwall
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy

Any static host works; upload the folder contents as-is.

- **Netlify:** drag-and-drop the folder at app.netlify.com/drop, or connect the repo (no build command, publish directory `.`).
- **Vercel:** `vercel` from the folder (framework: "Other", no build command, output directory `.`).
- **GitHub Pages:** push to a repo, then Settings > Pages > deploy from the branch root.
- **Any host / PHP hosting / S3 / etc.:** upload the files to the web root.

## TODOs before going live

1. **Form backend (required).** `contact.html` is front-end only. It validates in the browser and shows a friendly confirmation, **but nothing is sent or stored**. Connect it to Formspree, Netlify Forms, or a PHP mail handler (see the HTML comment in `contact.html` and the TODO in `script.js`). The on-page confirmation also currently says nothing has been delivered; remove that demo note once the backend works.
2. **Real email address.** `hello@cyberwall.example` is a **placeholder** (appears in the footer of every page and on the contact page). No real phone number or postal address has been invented; add them only if they exist.
3. **Domain.** Replace the placeholder `https://www.cyberwall.example` in the `og:url` tags with the real domain; consider adding an `og:image` and canonical links.
4. **Name check.** The name "CyberWall" has **not** been checked for trademark or domain conflicts. Do this (trademark search, domain and social handles) before investing in the brand.
5. **Analytics** (privacy-friendly, if wanted) and a cookie notice if required where you operate.
6. **Legal pages:** privacy policy, terms of service, and (if relevant) refund and data-processing terms. The pricing FAQ currently says the privacy policy is "coming soon".
7. **Pricing:** shown as "launch pricing", and final pricing may change. Target response times per plan are not published yet; add them once decided.
8. **Team content:** the About page has a labelled "bios coming soon" placeholder. No names, photos, headcounts or credentials were invented. Customer stories are likewise a labelled "coming soon" note.
9. **Keep the copy true.** The site says CyberWall is run by real people ("mostly human"), supported by monitoring tools and standard checks, that a real person reviews **every** update on the Priority plan, and that on Essentials/Standard the team reviews and monitors while routine updates use standard tools and checks. Make sure the way the business actually operates matches these statements, and update the copy if it changes. Avoid claims like "100% human" or "no automation".
10. Confirm the service claims (daily monitoring, rollback, checkout test, skimmer/backdoor checks, hosting compatibility, data location) match what is actually delivered at launch.
11. Verify the exact source links (see below) and the "researchers confirmed code execution against test servers" wording before launch.

## Content notes and sources

- **PHP2Shell (CVE-2026-109618 and CVE-2026-109619):** two critical PHP flaws, severity 9.2/10, patched 21 Oct 2026; affect PHP back to 5.4 and so the software behind Magento, WooCommerce, Shopware and WordPress stores even when store code is clean; fixed by updating PHP, not store plugins. Sources: Sansec (<https://sansec.io/research/php2shell>), SecurityWeek, US CISA, and the PHP project / PHP Foundation release announcement. Only the Sansec link is included on the site; add exact URLs for the others if desired. The site also reflects Sansec's note that real-world attacks need specific conditions, to keep the tone non-alarmist.
- **Nationwide, 2024 small business survey:** owners mostly expected an attack to cost under $5,000; real claims averaged about $18,000 to $21,000. Shown with attribution; re-check the exact wording against the original before launch.
- **Price comparison** ("self-serve tools roughly $10 to $50/month; hands-on managed Magento patching roughly $300 to $1,200/month") is a rough market estimate supplied by the site owner, shown as approximate and not tied to any named company.
- The sample update message on the home page is clearly labelled as an **example**.
- No testimonials, customer counts, certifications, awards or logos are used, and the site never claims 100% protection.

## Accessibility and responsiveness

Semantic HTML (header/nav/main/footer, headings in order), skip link, `aria-current` on the active nav item, visible focus outlines, form labels and error messages announced with `role="alert"`, `<details>` FAQ, `prefers-reduced-motion` respected, colours chosen for AA text contrast. Mobile-first CSS; the nav collapses into a Menu button on small screens (and stays visible if JavaScript is off).


_Access test from Societas (Matthew Coppola), 2026-10-31._
