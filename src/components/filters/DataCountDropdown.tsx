"use client"

import { useMemo, useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MdDataUsage } from "react-icons/md"

type DataCountValue = "10" | "20" | "30" | "all" | number

type Props = {
  value: DataCountValue
  onChange: (val: DataCountValue) => void
}

export function DataCountDropdown({ value, onChange }: Props) {
  const [customValue, setCustomValue] = useState<string>("")

  const label = useMemo(() => {
    if (typeof value === "string") {
      if (value === "all") return "All"
      return `${value} items`
    }
    return `${value} items`
  }, [value])

  const presets = [
    { key: "10" as const, label: "10 items" },
    { key: "20" as const, label: "20 items" },
    { key: "30" as const, label: "30 items" },
    { key: "all" as const, label: "All" },
  ]

  const handleCustomApply = () => {
    const num = parseInt(customValue)
    if (num > 0) {
      onChange(num)
      setCustomValue("")
    }
  }

  const isValidCustom = () => {
    const num = parseInt(customValue)
    return num > 0 && num <= 1000 // reasonable limit
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <MdDataUsage className="w-4 h-4" />
          {label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        {presets.map((preset) => (
          <DropdownMenuItem
            key={preset.key}
            onClick={() => onChange(preset.key)}
            className={value === preset.key ? "bg-accent text-accent-foreground" : ""}
          >
            {preset.label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <div className="p-3">
          <div className="text-sm text-muted-foreground mb-2">Custom Count</div>
          <div className="flex gap-2 mb-3">
            <input
              type="number"
              placeholder="Enter number"
              className="border rounded px-2 py-1 text-sm flex-1"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              min="1"
              max="1000"
            />
            <Button
              size="sm"
              disabled={!isValidCustom()}
              onClick={handleCustomApply}
            >
              Apply
            </Button>
          </div>
          <div className="text-xs text-muted-foreground">
            Enter a number between 1 and 1000
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
