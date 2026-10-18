# Edubros · Study in Italy

Next.js 16, React, TypeScript and Tailwind v4. Run `npm install`, then `npm run dev -- --port 3001` and open http://localhost:3001.

## Application service at /applynow

- €50 covers one programme application at one university.
- Each explicitly selected assistance service adds €10. Missing documents alone never add fees.
- CV/SOP assistance uses genuine student information. English-language guidance includes no tests, certificates or test fees.
- University fees stay unknown until manual verification. The displayed figure is a service estimate, not the final quote. €0 is payable now.
- Shortlisting requests require manual review. Document collection, quotes, payments, private WhatsApp groups and university submission remain manual. The student approves the quote before payment and the application before submission.
- The initial form accepts no document files, passwords, passport numbers or financial records. No admission guarantee.

## Resend setup and launch gate

1. Verify `updates.edubros.in` in Resend. Add sender-verification records only, leaving website records and inbound email routing unchanged.
2. Create a sending-only API key restricted to that domain. Configure `RESEND_API_KEY` and `APPLICATION_EMAIL_FROM` from `.env.example` in an ignored `.env.local` for local testing and encrypted Vercel environment variables for deployment. Never expose keys through `NEXT_PUBLIC_` or commit them.
3. Requests go only to `edubros.in@gmail.com`; the student address is Reply-To.
4. Send a clearly marked dummy application through the real endpoint and ask the owner to confirm inbox receipt. Provider acceptance is not proof of inbox delivery.
5. Only after confirmation set `applicationIntake.emailVerified` in `src/lib/application-config.ts` to true. Production is deliberately closed until then. Missing configuration produces an error, not a fake success.
6. Before opening production intake, configure a Vercel WAF rate-limit rule for `/api/applications` and check Resend account quotas. The Edubros project now has a fixed-window rule allowing eight requests per IP per 600 seconds, then returning 429. Other routes are unaffected.

The endpoint validates allowlisted fields, recalculates pricing, checks origins, bounds body size, uses a honeypot, and has bounded per-instance throttling. The in-memory throttle is not cross-instance protection, so the WAF rule is a launch requirement. Resend idempotency keys protect retries; the browser reuses an ID for an identical normalized payload, including reverted edits. The browser retry map lasts only while the form remains mounted, not across reloads.

There is no application database or durable retry queue. Requests are delivered into the Edubros mailbox, with provider delivery records according to account settings. The code does not log form contents. Failed submissions retain browser answers. The application privacy notice explains providers and follow-up. The owner is responsible for retention practices and must supply applicable quote, tax and cancellation terms before accepting payment.

## Main files

- `src/lib/site.ts`: brand/contact configuration.
- `src/app/page.tsx`: existing homepage, now linking to Apply now. Its free assessment still opens WhatsApp.
- `src/app/applynow/`: new page, metadata and application privacy notice.
- `src/components/application-form.tsx`: four-step form, estimate, review, success/error states.
- `src/lib/application*.ts`: pricing, validation, email adapter and protected intake.
- `src/app/api/applications/route.ts`: server-only POST route.
- `tests/application.test.ts`: mocked-email regression tests.

## Instagram reels and student stories

The homepage includes `#instagram-reels` after Why Italy and `#student-stories`
after Testimonials. The approved selection is maintained in `src/lib/instagram.ts`.
The view counts are a manually verified snapshot dated 18 October 2026, not a
live Instagram feed. Refresh counts and the displayed date together. Future
intake dates in admissions reels are not student-placement dates.

`public/media/instagram/` contains the ten owner-approved source thumbnails,
including the visa posts' existing redactions, unchanged. Next Image serves
responsive optimized copies. Do not replace local assets with expiring signed
Instagram CDN URLs. Check student permission and document privacy before adding
new posts; the owner requested that this selection retain its existing artwork.

The two carousels support touch scrolling, previous/next buttons, pause/resume,
keyboard controls, hover/focus suspension and reduced-motion preferences.
Filtering to a row that fits on screen disables scrolling controls. Motion stops
offscreen, while a player is open, or when the browser is hidden. Original cards
are keyboard accessible; loop copies are excluded from the accessibility tree.

No Instagram iframe or script loads on initial page render. Selecting a post
opens an on-demand native-dialog Instagram embed with an always-available link
to the original post. Closing unmounts the player and restores focus. Instagram
can require login or block embeds; this remains outside our control. The nearby
media notice links to the privacy explanation. There are no new analytics events.

For updates, check all assets and canonical source URLs, mobile widths from
320px upward, filters, pause, arrow navigation, keyboard/focus, reduced motion,
and a working reel player. Run the regression tests and production build before
pushing to the connected Vercel deployment.

## Verification and deployment

Vercel Web Analytics is integrated site-wide through a client-only, deferred
`SiteAnalytics` component. Its project dashboard is
https://vercel.com/heyharshyt-bytes-projects/edubros-site/analytics.
Only page views for `/`, `/applynow` and `/applynow/privacy` are allowed. Query
strings and fragments are removed, and custom events are rejected; application
answers and request references are not sent. Add future public paths deliberately
in `src/lib/analytics.ts`. UTM query-parameter reporting is intentionally omitted.
No paid analytics upgrade or Speed Insights subscription is configured by this integration.

Run `npm test`, `npm run lint`, `npm run build` and `npm audit`.

Browser QA: desktop, 320/375px phones and landscape; validation and focus; Back/Edit retaining answers; all-No leaving €50; opt-ins increasing/decreasing by €10; shortlisting; consent; provider failure retaining answers; and success showing a reference. Confirm a real owner-inbox email separately.

The GitHub repository is connected to Vercel. Do not open production intake merely because a build or mocked test passes.
