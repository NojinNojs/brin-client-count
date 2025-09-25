"use client"

import React, { useCallback, useMemo } from "react"
import type { LocationKey, SessionKey, MetricKey } from "@/lib/types"
import { getKawasanList, getLocationLabel } from "@/lib/types"
import { DataCountDropdown } from "./DataCountDropdown"
import { MetricsDropdown } from "./MetricsDropdown"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MdLocationOn, MdAccessTime } from "react-icons/md"

type Props = {
  location: LocationKey
  session: SessionKey
  onChange: (next: { location?: LocationKey; session?: SessionKey }) => void
  onDataCountChange?: (count: "10" | "20" | "30" | "all" | number) => void
  dataCountValue?: "10" | "20" | "30" | "all" | number
  metrics?: Record<MetricKey, boolean>
  onMetricsChange?: (next: Record<MetricKey, boolean>) => void
}

// Dynamic location mapping - now supports any kawasan from env

const timeLabel: Record<SessionKey, string> = {
  pagi: "Morning",
  siang: "Afternoon",
}

export const Filters = React.memo(function Filters({
  location,
  session,
  onChange,
  onDataCountChange,
  dataCountValue = "10",
  metrics,
  onMetricsChange
}: Props) {
  // Get dynamic kawasan list from environment
  const kawasanList = useMemo(() => getKawasanList(), [])
  
  // Memoized event handlers to prevent child re-renders
  const handleLocationChange = useCallback((l: LocationKey) => {
    onChange({ location: l })
  }, [onChange])

  const handleSessionChange = useCallback((s: SessionKey) => {
    onChange({ session: s })
  }, [onChange])

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="flex items-center gap-2">
        <label className="text-sm flex items-center gap-1">
          <MdLocationOn className="w-4 h-4" />
          Location
        </label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <MdLocationOn className="w-4 h-4" />
              {getLocationLabel(location)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {kawasanList.map((kawasan) => (
              <DropdownMenuItem
                key={kawasan}
                onClick={() => handleLocationChange(kawasan)}
                className={location === kawasan ? "bg-accent text-accent-foreground" : ""}
              >
                {getLocationLabel(kawasan)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm flex items-center gap-1">
          <MdAccessTime className="w-4 h-4" />
          Session
        </label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <MdAccessTime className="w-4 h-4" />
              {timeLabel[session]}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {(Object.keys(timeLabel) as SessionKey[]).map((t) => (
              <DropdownMenuItem
                key={t}
                onClick={() => handleSessionChange(t)}
                className={session === t ? "bg-accent text-accent-foreground" : ""}
              >
                {timeLabel[t]}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {onDataCountChange && (
        <div className="flex items-center gap-2">
          <label className="text-sm">Data Count</label>
          <DataCountDropdown value={dataCountValue} onChange={onDataCountChange} />
        </div>
      )}
      {metrics && onMetricsChange && (
        <div className="flex items-center gap-2">
          <label className="text-sm">Metrics</label>
          <MetricsDropdown value={metrics} onChange={onMetricsChange} />
        </div>
      )}
    </div>
  )
})


