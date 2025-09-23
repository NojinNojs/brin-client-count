"use client"

import { useCallback, useEffect, useMemo, useState, useRef } from "react"
import type { ClientCountItem, ClientCountResponse, LocationKey, MetricKey, SessionKey } from "./types"
import { toLocalDateLabel } from "./utils"

export type UseClientCountsOptions = {
  location: LocationKey
  session: SessionKey
  metrics: MetricKey[]
}

export function useClientCounts({ location, session }: UseClientCountsOptions) {
  const [data, setData] = useState<ClientCountItem[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  // Cache for API responses to avoid duplicate requests
  const cacheRef = useRef<Map<string, ClientCountItem[]>>(new Map())

  const endpoint = useMemo(() => `http://10.13.222.10:5010/client-count/${location}/${session}`, [location, session])

  const fetchData = useCallback(async (forceRefresh = false) => {
    // Check cache first
    if (!forceRefresh && cacheRef.current.has(endpoint)) {
      setData(cacheRef.current.get(endpoint)!)
      return
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    const controller = new AbortController()
    abortControllerRef.current = controller

    setLoading(true)
    setError(null)

    try {
      const res = await fetch(endpoint, {
        cache: "no-store",
        signal: controller.signal
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json: ClientCountResponse = await res.json()

      if (!controller.signal.aborted) {
        const newData = json?.data?.clientCount ?? []
        setData(newData)
        cacheRef.current.set(endpoint, newData)
      }
    } catch (e) {
      if (!controller.signal.aborted) {
        const msg = e instanceof Error ? e.message : "Failed to load data"
        setError(msg)
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false)
      }
    }
  }, [endpoint])

  useEffect(() => {
    fetchData()
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [fetchData])

  const chartData = useMemo(
    () =>
      [...data]
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        .map((d) => {
          const ts = new Date(d.createdAt).getTime()
          return {
            ts,
            date: toLocalDateLabel(d.createdAt, 7 * 60),
            dhcp: d.dhcp,
            dynamic: d.dynamic,
            hotspot: d.hotspot,
            guest: d.guest,
          }
        }),
    [data]
  )

  const latest = useMemo(() => data[0] ? data.reduce((a, b) => (new Date(a.createdAt) > new Date(b.createdAt) ? a : b)) : undefined, [data])

  return { data, chartData, latest, loading, error, refetch: fetchData }
}


