// pages/api/preview.js
export default async function handler(req, res) {
  // Example preview route for Contentstack. Contentstack will call this webhook
  // with entry uid and content_type_uid. You must verify the request (token) in production.
  const { token, entryUid, content_type_uid } = req.query
  // TODO: validate token
  if (!entryUid || !content_type_uid) {
    return res.status(400).json({ message: 'Missing entryUid or content_type_uid' })
  }

  // Build the preview URL — depends on your routing. Here we attempt basic mapping.
  // For demonstration, assume destination content_type -> /destination/[slug]
  // You may want to call Contentstack Delivery API to get the entry's slug.
  const previewUrl = `${process.env.NEXT_PUBLIC_PREVIEW_BASE_URL || 'http://localhost:3000'}`

  // Redirect to preview UI (Contentstack will include more params in a real webhook)
  res.writeHead(307, { Location: previewUrl })
  res.end()
}
