"use client"

import React from "react"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts"
import type { MetricKey } from "@/lib/types"
import { ChartContainer, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

type Props = {
  data: { ts: number; date: string; dhcp: number; dynamic: number; hotspot: number; guest: number }[]
  enabled: Record<MetricKey, boolean>
}

const chartConfig = {
  dhcp: { label: "DHCP", color: "var(--chart-1)" },
  dynamic: { label: "Dynamic", color: "var(--chart-2)" },
  hotspot: { label: "Hotspot", color: "var(--chart-3)" },
  guest: { label: "Guest", color: "var(--chart-5)" },
} as const

// Memoized chart component to prevent unnecessary re-renders
export const ClientAreaChart = React.memo(function ClientAreaChart({ data, enabled }: Props) {
  return (
    <ChartContainer config={chartConfig}>
      <LineChart data={data} margin={{ left: 12, right: 12 }}>
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis dataKey="date" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip cursor={{ stroke: 'var(--border)' }} content={<ChartTooltipContent />} />
        <Legend content={<ChartLegendContent />} />
        {enabled.dhcp && (
          <Line type="linear" dataKey="dhcp" stroke="var(--chart-1)" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 4 }} />
        )}
        {enabled.dynamic && (
          <Line type="linear" dataKey="dynamic" stroke="var(--chart-2)" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 4 }} />
        )}
        {enabled.hotspot && (
          <Line type="linear" dataKey="hotspot" stroke="var(--chart-3)" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 4 }} />
        )}
        {enabled.guest && (
          <Line type="linear" dataKey="guest" stroke="var(--chart-5)" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 4 }} />
        )}
      </LineChart>
    </ChartContainer>
  )
})


