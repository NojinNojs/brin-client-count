"use client"

import { useMemo, useState, useEffect } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

type PresetKey = "7d" | "1m" | "3m"

type Props = {
  value: PresetKey | { from: number; to: number }
  onChange: (val: PresetKey | { from: number; to: number }) => void
}

export function DateRangeDropdown({ value, onChange }: Props) {
  const [temp, setTemp] = useState<{ from?: string; to?: string }>({})
  const [today, setToday] = useState<string>("")

  const label = useMemo(() => {
    if (typeof value === "string") {
      if (value === "7d") return "7 days"
      if (value === "1m") return "1 month"
      if (value === "3m") return "3 months"
    }
    const from = new Date(value.from).toLocaleDateString()
    const to = new Date(value.to).toLocaleDateString()
    return `${from} - ${to}`
  }, [value])

  const presets = [
    { key: "7d" as const, label: "7 days" },
    { key: "1m" as const, label: "1 month" },
    { key: "3m" as const, label: "3 months" },
  ]

  // Update today after component mounts to avoid hydration mismatch
  useEffect(() => {
    const now = new Date()
    const jakartaTime = new Date(now.getTime() + (7 * 60 * 60 * 1000))
    setToday(jakartaTime.toISOString().split('T')[0])
  }, [])

  // Validation functions
  const isValidRange = () => {
    if (!temp.from || !temp.to || !today) return false
    const fromDate = new Date(temp.from + 'T00:00:00')
    const toDate = new Date(temp.to + 'T23:59:59')
    const todayDate = new Date(today + 'T23:59:59')

    // Check if end date is not after today (Jakarta time)
    if (toDate > todayDate) return false

    // Check if start date is not after end date
    if (fromDate > toDate) return false

    return true
  }

  const handleApply = () => {
    if (!isValidRange() || !temp.from || !temp.to) return

    const from = new Date(`${temp.from}T00:00:00`).getTime()
    const to = new Date(`${temp.to}T23:59:59`).getTime()
    onChange({ from, to })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80">
        {presets.map((preset) => (
          <DropdownMenuItem
            key={preset.key}
            onClick={() => onChange(preset.key)}
            className={typeof value === "string" && value === preset.key ? "bg-accent text-accent-foreground" : ""}
          >
            {preset.label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <div className="p-3">
          <div className="text-sm text-muted-foreground mb-2">Custom Range</div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Start Date</label>
              <input
                type="date"
                className="border rounded px-2 py-1 text-sm w-full"
                value={temp.from || ""}
                max={today || undefined}
                onChange={(e) => setTemp(prev => ({ ...prev, from: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">End Date</label>
              <input
                type="date"
                className="border rounded px-2 py-1 text-sm w-full"
                value={temp.to || ""}
                max={today || undefined}
                onChange={(e) => setTemp(prev => ({ ...prev, to: e.target.value }))}
              />
            </div>
          </div>

          {/* Validation Messages */}
          <div className="text-xs text-red-500 mb-2 min-h-[1rem]">
            {temp.from && temp.to && !today && (
              <div>Loading...</div>
            )}
            {temp.from && temp.to && today && new Date(temp.from + 'T00:00:00') > new Date(temp.to + 'T23:59:59') && (
              <div>Start date cannot be after end date</div>
            )}
            {temp.to && today && new Date(temp.to + 'T23:59:59') > new Date(today + 'T23:59:59') && (
              <div>End date cannot be after today</div>
            )}
            {temp.from && today && temp.from > today && (
              <div>Start date cannot be after today</div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setTemp({})}>
              Clear
            </Button>
            <Button
              size="sm"
              disabled={!isValidRange() || !today}
              onClick={handleApply}
            >
              Apply
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


