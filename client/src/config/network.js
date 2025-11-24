// Network Configuration
// Auto-detect environment and use appropriate API URL

export const getServerConfig = () => {
  const currentHost = window.location.hostname
  
  // Production - Cloudflare Pages
  if (currentHost.includes('pages.dev') || currentHost.includes('workers.dev')) {
    return {
      apiBase: 'https://clinic-booking-api.YOUR_SUBDOMAIN.workers.dev/api',
      serverUrl: 'https://clinic-booking-api.YOUR_SUBDOMAIN.workers.dev'
    }
  }
  
  // Local development
  if (currentHost === 'localhost' || currentHost === '127.0.0.1') {
    return {
      apiBase: 'http://localhost:8787/api',
      serverUrl: 'http://localhost:8787'
    }
  }
  
  // LAN access
  return {
    apiBase: `http://${currentHost}:8787/api`,
    serverUrl: `http://${currentHost}:8787`
  }
}

export default getServerConfig()