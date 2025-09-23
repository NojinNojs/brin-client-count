"use client"

import { useMemo } from "react"
import type { MetricKey } from "@/lib/types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

type Props = {
  value: Record<MetricKey, boolean>
  onChange: (next: Record<MetricKey, boolean>) => void
}

const METRICS: MetricKey[] = ["dhcp", "dynamic", "hotspot", "guest"]

export function MetricsDropdown({ value, onChange }: Props) {
  const label = useMemo(() => {
    const active = METRICS.filter((m) => value[m])
    return active.length === METRICS.length ? "All metrics" : active.map((m) => m.toUpperCase()).join(", ")
  }, [value])

  function toggle(metric: MetricKey) {
    onChange({ ...value, [metric]: !value[metric] })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {METRICS.map((m) => (
          <DropdownMenuCheckboxItem
            key={m}
            checked={!!value[m]}
            onCheckedChange={() => toggle(m)}
            className="flex items-center gap-2"
          >
            <span className="h-2.5 w-2.5 rounded mr-2" style={{ backgroundColor: `var(--chart-${m === 'dhcp' ? 1 : m === 'dynamic' ? 2 : m === 'hotspot' ? 3 : 5})` }} />
            {m.toUpperCase()}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <div className="flex justify-between px-2 py-1">
          <button className="text-xs text-muted-foreground hover:text-foreground" onClick={() => onChange({ dhcp: true, dynamic: true, hotspot: true, guest: true })}>Select all</button>
          <button className="text-xs text-muted-foreground hover:text-foreground" onClick={() => onChange({ dhcp: false, dynamic: false, hotspot: false, guest: false })}>Clear</button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


