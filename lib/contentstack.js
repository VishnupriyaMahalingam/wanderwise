// lib/contentstack.js
import Contentstack from 'contentstack'

const Stack = Contentstack.Stack({
  api_key: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY || process.env.CONTENTSTACK_STACK_API_KEY,
  delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN,
  environment: process.env.CONTENTSTACK_ENVIRONMENT || 'development',
  region: process.env.CONTENTSTACK_REGION || 'us'
})

/**
 * Fetch entries from a Contentstack content type
 * @param {string} contentTypeUid - The content type UID
 * @param {object} query - Optional query parameters
 * @returns {Promise<Array>} - Array of entries
 */
export async function getEntries(contentTypeUid, query = {}) {
  try {
    const Query = Stack.ContentType(contentTypeUid).Query()
    
    // Apply query filters
    Object.keys(query).forEach(key => {
      Query.where(key, query[key])
    })
    
    // Include references (important for getting related content)
    Query.includeReference(['region', 'destination'])
    
    const result = await Query.toJSON().find()
    
    // Return the entries array (first element of result)
    return result[0] || []
  } catch (err) {
    console.error(`Error fetching ${contentTypeUid}:`, err)
    return []
  }
}

/**
 * Fetch a single entry by UID
 * @param {string} contentTypeUid - The content type UID
 * @param {string} entryUid - The entry UID
 * @returns {Promise<object|null>} - Single entry or null
 */
export async function getEntryByUid(contentTypeUid, entryUid) {
  try {
    const result = await Stack
      .ContentType(contentTypeUid)
      .Entry(entryUid)
      .includeReference(['region', 'destination'])
      .toJSON()
      .fetch()
    
    return result || null
  } catch (err) {
    console.error(`Error fetching entry ${entryUid}:`, err)
    return null
  }
}

export default Stack
