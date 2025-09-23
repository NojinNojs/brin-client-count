"use client"

import React, { useCallback } from "react"
import type { LocationKey, SessionKey, MetricKey } from "@/lib/types"
import { DateRangeDropdown } from "./DateRangeDropdown"
import { MetricsDropdown } from "./MetricsDropdown"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

type Props = {
  location: LocationKey
  session: SessionKey
  onChange: (next: { location?: LocationKey; session?: SessionKey }) => void
  onRangeChange?: (range: "7d" | "1m" | "3m" | { from: number; to: number }) => void
  rangeValue?: "7d" | "1m" | "3m" | { from: number; to: number }
  metrics?: Record<MetricKey, boolean>
  onMetricsChange?: (next: Record<MetricKey, boolean>) => void
}

const locationLabel: Record<LocationKey, string> = {
  gatsu: "Gatot Subroto",
  ancol: "Ancol",
  pejaten: "Pejaten",
}

const timeLabel: Record<SessionKey, string> = {
  pagi: "Morning",
  siang: "Afternoon",
}

export const Filters = React.memo(function Filters({
  location,
  session,
  onChange,
  onRangeChange,
  rangeValue = "7d",
  metrics,
  onMetricsChange
}: Props) {
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
        <label className="text-sm">Location</label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              {locationLabel[location]}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {(Object.keys(locationLabel) as LocationKey[]).map((l) => (
              <DropdownMenuItem
                key={l}
                onClick={() => handleLocationChange(l)}
                className={location === l ? "bg-accent text-accent-foreground" : ""}
              >
                {locationLabel[l]}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm">Session</label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
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
      {onRangeChange && (
        <div className="flex items-center gap-2">
          <label className="text-sm">Range</label>
          <DateRangeDropdown value={rangeValue} onChange={onRangeChange} />
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


