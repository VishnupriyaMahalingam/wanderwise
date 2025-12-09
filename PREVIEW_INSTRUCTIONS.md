# Preview Webhook & Preview Mode Instructions

1. Add an environment variable in your hosting or .env.local:
   - NEXT_PUBLIC_PREVIEW_BASE_URL=http://localhost:3000

2. Expose a preview route in your Next.js app at `/api/preview` (already included). Contentstack's Automation or Webhooks can call this endpoint when an entry is published/drafted.
   - The webhook should include `entryUid` and `content_type_uid` as query params.
   - In production, validate requests with a shared secret token (`token` param) to prevent abuse.

3. To enable Next.js Preview Mode for a specific entry, you should implement the flow:
   - The webhook handler fetches the entry from Contentstack Delivery API using `entryUid`, get the slug, then call `res.setPreviewData({})` and redirect to the preview URL including the slug.
   - Example flow pseudo:
     - GET /api/preview?entryUid=...&content_type_uid=destination&token=...
     - Verify token
     - Fetch entry by uid -> get slug
     - res.setPreviewData({ source: 'contentstack' })
     - res.writeHead(307, { Location: `/destination/${slug}` }) and res.end()

4. Contentstack docs: use Webhooks > Create Webhook > set target to your Next.js /api/preview endpoint.
