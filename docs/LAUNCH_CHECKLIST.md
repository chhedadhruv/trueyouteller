# Launch checklist: hosting, analytics and Google Search

Steps that need your accounts (Firebase, Google Analytics, Search Console, DNS). Do them in order.

## 1. Environment variables

Copy `.env.example` to `.env` and fill in every value. Firebase values come from
**Firebase console → Project settings → General → Your apps → Web app → SDK setup and configuration**.

## 2. Turn on Google Analytics (GA4)

1. Firebase console → **Project settings → Integrations → Google Analytics → Enable**. Create a new GA4 property or link an existing one.
2. Back in **Project settings → General → Your apps**, the web app config now includes `measurementId` (`G-XXXXXXXXXX`). Put it in `.env` as `VITE_FIREBASE_MEASUREMENT_ID`.
3. In Google Analytics → **Admin → Data streams → (your web stream) → Enhanced measurement**, make sure **Page views → "Page changes based on browser history events"** is on. The site relies on it to count page views as visitors move between pages.
4. Admin → **Data retention** → set event data retention to **14 months** (the default is 2).
5. Admin → **Events** → mark these as **key events** so they show up as conversions:
   - `test_complete`
   - `quiz_complete`
   - `share`
   - `invite_send`
6. Optional: Admin → **Custom definitions** → create event-scoped custom dimensions so you can break reports down by:
   - `personality_type`
   - `quiz`
   - `outcome`
   - `method`
   - `pair`
7. To test locally, set `VITE_ANALYTICS_DEBUG=true` in `.env`, run `yarn dev`, and watch **Admin → DebugView**.

### Events the site sends

| Event | When | Parameters |
|---|---|---|
| `test_start` | Name entered, test begins | `invited` (1 if from a friend's invite) |
| `test_resume` | "Resume my test" clicked | `answered` |
| `test_progress` | 25%, 50%, 75% answered | `percent` |
| `test_complete` | "Reveal my personality" | `personality_type`, `invited` |
| `share` | Any share button on a result | `method`, `content_type`, `item_id` |
| `invite_send` | "Send invite link" / WhatsApp invite | `method`, `personality_type` |
| `invite_match` | Invited friend sees their match | `pair`, `score` |
| `quiz_start` / `quiz_complete` | Mini-quizzes | `quiz`, `outcome`, `from_shared_link` |
| `compat_check` | A compatibility pair page is viewed | `pair`, `score` |
| `theme_change` | Dark/light toggle | `theme` |
| `unlock_achievement` | A badge is earned | `achievement_id` |

Visitors can opt out using the notice banner or on `/privacy`. Once they do, nothing is sent.

## 3. Deploy to Firebase Hosting

```bash
firebase login
firebase use --add            # pick your project; this writes .firebaserc
yarn deploy                   # yarn build + firebase deploy --only hosting
```

Firestore security rules live in `firestore.rules`. Compare them with the rules currently in the console, then deploy:

```bash
firebase deploy --only firestore:rules
```

## 4. Domains: make www.trueyouteller.com the only address

1. Firebase console → **Hosting → Add custom domain** → `www.trueyouteller.com` → add the DNS records it shows at your registrar.
2. Add `trueyouteller.com` (the bare domain) as a second custom domain and choose **Redirect to www.trueyouteller.com**.
3. Add `trueyouteller.dhruvchheda.com` as another custom domain with **Redirect to www.trueyouteller.com**. If that subdomain currently points somewhere else, point its DNS at Firebase first. The 301 redirect passes the old subdomain's search history to the new domain.
4. Wait for the SSL certificates to show "Connected" (this can take up to 24 hours).

## 5. Google Search Console

1. Go to <https://search.google.com/search-console> → **Add property → Domain** → `trueyouteller.com`.
2. Verify with the **DNS TXT record** it gives you (add it at your registrar). A Domain property covers www, the bare domain and every subdomain.
3. If you also verified `trueyouteller.dhruvchheda.com` before, keep that property, and once the redirect is live use **Settings → Change of address** to tell Google you moved.
4. **Sitemaps** → submit `https://www.trueyouteller.com/sitemap.xml`. It lists every indexable page (about 166 URLs) and is regenerated on every build.
5. **URL inspection** → request indexing for these first:
   - `https://www.trueyouteller.com/`
   - `https://www.trueyouteller.com/test`
   - `https://www.trueyouteller.com/types`
   - `https://www.trueyouteller.com/quizzes`
6. In Google Analytics → **Admin → Product links → Search Console links**, link the two. Search queries such as "personality test" then show up in GA reports.
7. Check back after 1–2 weeks:
   - **Pages** shows what's indexed.
   - **Performance** shows which queries you appear for.
   - **Enhancements** shows the FAQ, breadcrumb and other structured data Google detected.

## 6. Check the live site

- <https://search.google.com/test/rich-results>: test `/`, `/types/intj` and `/compatibility/enfp-intj`. You should see FAQ, Article and Breadcrumb results.
- <https://www.opengraph.xyz>: paste a result link such as `/result/intj?n=Sam` and a quiz link to check the share previews.
- Chrome DevTools → **Lighthouse** (mobile): aim for SEO 100, Accessibility 95+, Performance 90+.

## 7. Grow traffic (off-page SEO)

Ranking for a competitive term like "personality test" depends heavily on other sites linking to you. Ideas:

- Launch on **Product Hunt** and share in relevant communities (r/mbti, r/INTJ and the other type subreddits, r/SampleSize). Read each community's self-promotion rules first.
- Post your own result cards on Instagram and WhatsApp status. Every shared card and link points back to the site.
- Ask friends to use the "Compare with a friend" invite. Each invite brings a new visitor who lands directly in the test.
- Write a few longer articles (for example "INTJ vs INTP: what's the difference?" or "Best careers for introverts") that link to the type pages. Long-tail searches like these are easier to rank for than "personality test" and build authority over time.
- List the site in free directories for quizzes and tools, and in your GitHub and LinkedIn profiles.
