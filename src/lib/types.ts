// NOTE: Allow Next.js to load .env files automatically. Do not require dotenv here.

// Dynamic types based on environment variables
export type LocationKey = string // Now supports any location from env
export type SessionKey = "pagi" | "siang"

export type ClientCountItem = {
  id: string
  kawasan: string
  session: SessionKey | string
  dhcp: number
  dynamic: number
  hotspot: number
  guest: number
  createdAt: string
}

export type ClientCountResponse = {
  status: string
  data: { clientCount: ClientCountItem[] }
}

export type MetricKey = "dhcp" | "dynamic" | "hotspot" | "guest"

// Helper functions to get config from environment
export const getApiConfig = () => {
  // Only use NEXT_PUBLIC_* vars for client-side code
  const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || ''
  const rawApiPort = process.env.NEXT_PUBLIC_API_PORT || ''

  // Normalize helpers: strip surrounding quotes and whitespace
  const normalize = (v: string) => {
    let s = String(v).trim()
    if ((s.startsWith("'") && s.endsWith("'")) || (s.startsWith('"') && s.endsWith('"'))) {
      s = s.slice(1, -1).trim()
    }
    return s
  }

  const apiUrl = normalize(rawApiUrl)
  const apiPort = normalize(rawApiPort)

  // Debug: Show all available env vars
  console.log('All process.env keys:', Object.keys(process.env).filter(key => 
    key.includes('API') || key.includes('KAWASAN') || key.includes('NODE')
  ))
  console.log('Raw NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL)
  console.log('Raw NEXT_PUBLIC_API_PORT:', process.env.NEXT_PUBLIC_API_PORT)
  console.log('Resolved API_URL:', apiUrl ? `[set:${apiUrl}]` : '[not set]')
  console.log('Resolved API_PORT:', apiPort ? `[set:${apiPort}]` : '[not set]')

  if (!apiUrl) {
    throw new Error('NEXT_PUBLIC_API_URL environment variable is required')
  }

  if (!apiPort) {
    throw new Error('NEXT_PUBLIC_API_PORT environment variable is required')
  }

  return { apiUrl: String(apiUrl), apiPort: String(apiPort) }
}

export const getKawasanList = (): string[] => {
  // Only use NEXT_PUBLIC_KAWASAN for client-side visibility
  const raw = process.env.NEXT_PUBLIC_KAWASAN || ''

  console.log('Raw NEXT_PUBLIC_KAWASAN:', process.env.NEXT_PUBLIC_KAWASAN)
  console.log('KAWASAN (raw):', raw ? '[set]' : '[not set]')

  if (!raw) {
    throw new Error('NEXT_PUBLIC_KAWASAN environment variable is required')
  }

  // Normalize input to try to accept multiple common formats:
  // - Proper JSON: ["a","b"]
  // - Single-quoted JSON: ['a','b']
  // - CSV: a, b, c
  const normalizeListString = (v: string) => {
    let s = String(v).trim()
    // strip surrounding single/double quotes
    if ((s.startsWith("'") && s.endsWith("'")) || (s.startsWith('"') && s.endsWith('"'))) {
      s = s.slice(1, -1).trim()
    }
    // If it looks like single-quoted JSON, replace single quotes with double quotes
    if (s.startsWith('[') && s.indexOf("'") !== -1) {
      s = s.replace(/'/g, '"')
    }
    return s
  }

  const s = normalizeListString(raw)

  try {
    if (s.startsWith('[')) {
      const parsed = JSON.parse(s)
      if (!Array.isArray(parsed)) {
        throw new Error('NEXT_PUBLIC_KAWASAN must be a JSON array')
      }
      if (parsed.length === 0) {
        throw new Error('NEXT_PUBLIC_KAWASAN array cannot be empty')
      }
      return parsed.map(String)
    }

    // Fallback: CSV
    const parts = s.split(',').map(p => p.trim()).filter(Boolean)
    if (parts.length === 0) {
      throw new Error('NEXT_PUBLIC_KAWASAN array cannot be empty')
    }
    return parts
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(`Failed to parse NEXT_PUBLIC_KAWASAN environment variable: ${error.message}`)
    }
    throw error
  }
}

// Location labels mapping (can be extended)
export const getLocationLabel = (key: string): string => {
  const labels: Record<string, string> = {
    'gatsu': 'Gatot Subroto',
    'ancol': 'Ancol',
    'pejaten': 'Pejaten',
    'thamrin': 'Thamrin',
    'agam': 'Agam'
  }
  return labels[key] || key.charAt(0).toUpperCase() + key.slice(1)
}


