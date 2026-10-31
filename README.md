# CyberWall website (static, early access)

A static marketing site for **CyberWall**, a mostly human web security service for small businesses running PHP online stores (WooCommerce, WordPress, Magento, Shopware). Plain HTML, CSS, and a little vanilla JavaScript. No build step, no external dependencies, no external fonts, no analytics.

Open `index.html` in a browser, or:

```
python3 -m http.server 8000
```

## What the site is for

Small-business owners who are not security people. The offer is a person who watches for new security holes, tries each fix on a private copy, checks that checkout still works, updates the live store with a rollback prepared, and writes a plain-English note. The only conversion path is **request early access**. Nothing on the site takes payment, and the contact form does not send yet.

## Files

| File | What it is |
|---|---|
| `index.html` | Home: the offer, the sequence, how joining works, an example note, PHP2Shell, a sourced cost figure, proposed prices, a short FAQ |
| `services.html` | What the team does, which plan includes it, who it is and is not for |
| `pricing.html` | Proposed Essentials / Standard / Priority prices, setup, a rough market comparison, FAQ |
| `about.html` | Why the service exists, values, how human review differs by plan, team placeholder |
| `contact.html` | Early-access form. It checks answers in the browser and then stops |
| `legal.html` | Status note: privacy policy and terms are not published. Not a legal document |
| `404.html` | Missing-page help |
| `style.css` | Shared styles. System fonts only |
| `script.js` | Mobile menu, `?plan=` prefill, form checks. Loaded from `<head>` so the menu state is set before first paint |
| `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `og.png` | Mark and social card. Generated type, not a photograph |
| `robots.txt`, `sitemap.xml` | Crawl basics. URLs use the placeholder host `www.cyberwall.example` |
| `_headers`, `_redirects` | Netlify and Cloudflare Pages: security headers, and `/index.html` → `/` |
| `vercel.json` | The same security headers, for Vercel |

The logo is an inline SVG (a shield on navy, with teal course lines). No image CDN and no tracker. Colors live in custom properties at the top of `style.css`: navy, white, cool slate, a sky tint, and one teal accent.

## Deploy

Upload the folder as-is. No build command. Publish directory `.`.

- **Netlify and Cloudflare Pages** read `_headers` and `_redirects`.
- **Vercel** reads `vercel.json` (framework “Other”, no build, output `.`).
- **GitHub Pages** will serve the HTML and ignore `_headers` and `vercel.json`. Set the same headers in front of Pages if you use it, or pick a host that applies them.

`Content-Security-Policy` is strict: no inline scripts or styles, no third-party origins. `form-action` is `'self'` and `connect-src` is `'none'` because the form does not submit anywhere. When a real form handler is connected, those two directives have to be opened up for that host and nothing else.

## Before launch

1. **Form delivery.** `contact.html` validates in the browser and then says, plainly, that nothing was sent. Connect Formspree, Netlify Forms, or your own mail handler, then remove the “does not send” copy. Update `form-action` and `connect-src`.
2. **Real email.** `hello@cyberwall.example` is a placeholder in the footer, the contact page, and `legal.html`. It is not a monitored inbox.
3. **Domain.** Replace `https://www.cyberwall.example` in canonical links, Open Graph tags, `robots.txt`, and `sitemap.xml`. The name CyberWall has not been checked for trademark, domain, or social-handle conflicts.
4. **Legal pages.** `legal.html` is a status note only. Publish a real privacy notice and terms before any customer data or payment is collected. Include where a private test copy lives, who can open it, how long it is kept, and how cancellation works.
5. **Prices and reply times.** The three prices are proposed launch prices and are labeled that way. No plan is called “most popular”. Target reply times are intentionally not printed.
6. **Team and customers.** Bios and customer stories are labeled placeholders. Do not add invented names, photos, quotes, counts, or certifications.
7. **Keep the operating claims true.** Priority: a person reviews every update. Essentials and Standard: the team monitors, routine updates use standard checks, and a person reviews a change that is large or that touches payment. Rollback is described as prepared before every live update, on every plan. Change the copy if the service works differently.
8. **Analytics.** None is installed. Add a privacy-respecting option, and a cookie notice if you need one, only when you actually want measurement.

## Sources on the page

- **PHP2Shell (CVE-2026-109618, CVE-2026-109619).** Patched 21 October 2026, CVSS 9.2, PHP back to 5.4, not fixed by plugin updates. Fixed releases named from CISA’s alert that day: 8.5.12, 8.4.27, 8.3.36, 8.2.35. The page also uses Sansec’s point that an attack needs specific server conditions. Linked sources: [Sansec](https://sansec.io/research/php2shell), [CISA](https://www.cisa.gov/news-events/alerts/2026/10/21/critical-vulnerabilities-php-require-immediate-patching). Re-read both before launch in case they are updated. Older mentions of SecurityWeek and a PHP Foundation post were removed because this repo did not have exact URLs for them.
- **Nationwide, September 2024.** 81% of small-business owners thought an attack would cost less than $5,000. Nationwide’s claims data: average small-business cyber claim about $18,000 to $21,000. [Nationwide release](https://news.nationwide.com/one-quarter-of-small-business-owners-have-been-targeted-by-ai-driven-scams/). Not a forecast for any one shop. CyberWall is not insurance.
- **Price comparison** (“about $10 to $50” and “about $300 to $1,200”) is a rough estimate from the site owner, labeled as such, and not tied to a named company.
- The sample note on the home page is labeled as an example. Sam is not a customer.

## Accessibility

Semantic regions, one `h1` per page, skip link, `aria-current` on the current page, visible `:focus-visible` outlines (navy on white, white on the navy header), form errors with a summary that takes focus, `<details>` FAQ, and `prefers-reduced-motion` respected. The menu works from the keyboard (Escape closes it). With JavaScript off, a plain list of links is still in the header. Colours were chosen for WCAG AA text contrast. The early-access button stays on screen on small phones, not only inside the menu.
