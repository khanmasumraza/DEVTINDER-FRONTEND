const isLocalhost =
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1'

export const BASE_URL = isLocalhost
  ? 'http://localhost:7777' // Local backend
  : 'http://16.170.224.154' // EC2 backend
