export type LocationKey = "gatsu" | "ancol" | "pejaten"
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


