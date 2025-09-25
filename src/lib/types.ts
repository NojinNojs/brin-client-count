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
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const apiPort = process.env.NEXT_PUBLIC_API_PORT
  
  if (!apiUrl) {
    throw new Error('NEXT_PUBLIC_API_URL environment variable is required')
  }
  
  if (!apiPort) {
    throw new Error('NEXT_PUBLIC_API_PORT environment variable is required')
  }
  
  return { apiUrl, apiPort }
}

export const getKawasanList = (): string[] => {
  const kawasanEnv = process.env.NEXT_PUBLIC_KAWASAN
  
  if (!kawasanEnv) {
    throw new Error('NEXT_PUBLIC_KAWASAN environment variable is required')
  }
  
  try {
    const parsed = JSON.parse(kawasanEnv)
    if (!Array.isArray(parsed)) {
      throw new Error('NEXT_PUBLIC_KAWASAN must be a JSON array')
    }
    if (parsed.length === 0) {
      throw new Error('NEXT_PUBLIC_KAWASAN array cannot be empty')
    }
    return parsed
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


