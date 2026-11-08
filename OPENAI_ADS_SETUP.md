# OpenAI Ads tracking repair — 9 November 2026

Applied locally to the existing React 18 / Vite 5 site and optional Node server, using Pixel + CAPI. No deployment or Ads Manager settings were changed.

Files: `src/lib/oaiPixel.js` (consent, initialization, page views, failure isolation), `src/pages/Founder.jsx` (consultation event), `server.cjs` (CAPI attribution, validation, timeout, logging), `.env.example` (server configuration), and `tests/oaiPixel.test.mjs` (regression checks). Existing OpenAI wrappers were extended; no other ad-platform abstraction was found.

## Coverage

- Existing `page_viewed`: now runs on acceptance, suppresses duplicate same-path/anchor views, and skips private rate-card URLs. SDK initialization can also occur from the page-view helper, avoiding effect-order dependencies.
- Existing `lead_created`: contact form success; consultation request success now uses this event too, without an unearned booking value.
- Existing `registration_completed`: career application success, unchanged. This is application completion, not account signup; confirm whether this should remain a campaign goal.
- `appointment_scheduled`: deferred until a time is actually confirmed. The form currently promises a later reply to arrange time and payment.
- `contents_viewed`: deferred because page views already cover browsing and no additional meaningful content boundary was established.
- `items_added`, `checkout_started`, `order_created`, `subscription_created`, `trial_started`: no confirmed commerce/subscription success boundaries found; not added.
- No native/mobile surfaces were instrumented.

## Pixel and consent

The existing `PIXEL_ID` in `src/lib/oaiPixel.js` is preserved. `OPENAI_ADS_PIXEL_ID`, if overridden on the server, must match it. Debug is off. Consent is queued before initialization; denial prevents both browser measurement and browser CAPI dispatch. Acceptance works for the current page even if browser storage is unavailable. A later matching update passes only `user`, with normalized SHA-256 email, phone, first name and last name from the successful form submission. No new identity fields or personalization opt-out policy were introduced. Existing measurement consent remains the gate; there is no separate personalization preference to map to `opt_out`.

## Server delivery

`OPENAI_ADS_API_KEY` remains server-only; its deployment availability was not checked. The checked-in template contains no credential. `OPENAI_ADS_VALIDATE_ONLY=1` is available for manual validation; the template defaults to normal delivery.

CAPI requires explicit measurement consent in the request and the canonical Origin header. Source URLs must match `SITE_ORIGIN` (default https://paraloxmedia.com), contain HTTP(S), and are reduced to origin + pathname. Invalid origins fall back to the canonical homepage. Query strings and fragments are never forwarded by the application. SDK-generated Pixel URL context remains under SDK control.

The raw `__oppref` cookie is forwarded at event level unchanged. The existing raw `__obref` cookie is retained in `user`, without decoding. Contact identifiers are normalized and hashed on the server; user agent remains available. IP is omitted unless `OPENAI_ADS_TRUSTED_IP_HEADER` names a header that a verified hosting proxy overwrites and protects from direct client access. Configure it only after confirming that deployment trust boundary.

Pixel and CAPI retain the same event name and generated event ID per successful submission, using the same configured pixel. CAPI uses receipt-time timestamps. Browser dispatch is fire-and-forget; hashing/SDK failures cannot turn a successful form into a failure. Server event construction and dispatch are caught, fetch is limited to five seconds, and logs omit response bodies and raw exception details. No retries or durable queue were added.

## Verification and limits

- Five mocked regression tests pass (`node --test tests/oaiPixel.test.mjs`); no test conversions sent to OpenAI.
- Node syntax checks and `git diff --check` pass.
- Production browser build, SSR build, and 47 static route previews generated successfully (`npm run build --ignore-scripts`). Review-fetch and sitemap prebuild hooks were intentionally not invoked.
- Installed conversion setup checker passes Pixel/CAPI/deduplication/shared-pixel/attribution/source-URL checks.
- Secret scanner reports one false positive on the literal `placeholder-for-mocked-fetch` in the mocked test environment. It reports no production-code findings; no real credential is present in the test.
- Paralox Media account resolved successfully. Conversion-source inventory failed with the connector's non-retryable “under construction” response. Pixel ownership, event receipt, and Event Quality Score could not be verified.
- This remains a browser-triggered CAPI relay. It cannot independently prove Formspree submission success or recover conversions when website JavaScript never runs. A verified form webhook would be a separate enhancement.
- Use the Node server for `/api/conversion`; static-only hosting does not provide this endpoint. Before deployment, verify hosting secrets, canonical origin, matching Pixel IDs, trusted proxy configuration, and real events in Ads Manager. No performance or EQS improvement is claimed without live evidence.

Current documentation checked: [Measurement Pixel](https://developers.openai.com/ads/measurement-pixel), [Conversions API](https://developers.openai.com/ads/conversions-api), and [Supported Events](https://developers.openai.com/ads/supported-events).

Before deploying, review that this implementation satisfies your privacy, security, consent, and data handling requirements.
