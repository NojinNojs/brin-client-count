"use client"

import React from "react"
import type { ClientCountItem } from "@/lib/types"
import { formatNumber } from "@/lib/utils"

type Props = {
  latest?: ClientCountItem
}

const items: { key: keyof ClientCountItem; label: string; colorVar: string }[] = [
  { key: "dhcp", label: "DHCP", colorVar: "var(--chart-1)" },
  { key: "dynamic", label: "Dynamic", colorVar: "var(--chart-2)" },
  { key: "hotspot", label: "Hotspot", colorVar: "var(--chart-3)" },
  { key: "guest", label: "Guest", colorVar: "var(--chart-5)" },
]

// Memoized KPI component to prevent unnecessary re-renders
export const KpiSummary = React.memo(function KpiSummary({ latest }: Props) {
  if (!latest) return null

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {items.map((i) => {
        const value = Number(latest[i.key] as number)
        return (
          <div key={i.label} className="rounded-lg border p-3 bg-white">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-block h-2.5 w-2.5 rounded" style={{ backgroundColor: i.colorVar }} />
              {i.label}
            </div>
            <div className="text-lg font-semibold mt-1 tabular-nums">
              {formatNumber(value)}
            </div>
          </div>
        )
      })}
    </div>
  )
})


