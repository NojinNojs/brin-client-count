"use client"

import { MdDataUsage } from "react-icons/md"

interface NoDataMessageProps {
  message?: string
  className?: string
}

export function NoDataMessage({ 
  message = "No data available at this time", 
  className = "" 
}: NoDataMessageProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      <MdDataUsage className="w-16 h-16 text-muted-foreground/50 mb-4" />
      <h3 className="text-lg font-medium text-muted-foreground mb-2">
        {message}
      </h3>
      <p className="text-sm text-muted-foreground/70">
        Please check your connection or try again later
      </p>
    </div>
  )
}
