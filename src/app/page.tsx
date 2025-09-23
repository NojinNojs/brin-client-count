"use client";

import { useState, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filters } from "@/components/filters/Filters";
import { ClientAreaChart } from "@/components/charts/ClientAreaChart";
import { KpiSummary } from "@/components/kpi/KpiSummary";
import type { LocationKey, MetricKey, SessionKey } from "@/lib/types";
import { useClientCounts } from "@/lib/useClientCounts";

export default function Home() {
  const [location, setLocation] = useState<LocationKey>("gatsu");
  const [session, setSession] = useState<SessionKey>("pagi");
  const [enabled, setEnabled] = useState<Record<MetricKey, boolean>>({ dhcp: true, dynamic: true, hotspot: true, guest: true });

  const { chartData, latest, loading, error, refetch } = useClientCounts({ location, session, metrics: Object.keys(enabled) as MetricKey[] });
  const [range, setRange] = useState<"7d" | "1m" | "3m" | { from: number; to: number } | null>("7d");

  // Memoized range calculation to avoid recalculating on every render
  const filteredData = useMemo(() => {
    if (!range) return chartData
    const now = Date.now()
    let from: number
    if (typeof range === "string") {
      if (range === "7d") from = now - 7 * 24 * 60 * 60 * 1000
      else if (range === "1m") from = now - 30 * 24 * 60 * 60 * 1000
      else from = now - 90 * 24 * 60 * 60 * 1000
      return chartData.filter((d) => d.ts >= from)
    }
    return chartData.filter((d) => d.ts >= range.from && d.ts <= range.to)
  }, [chartData, range]);

  // Memoized change handlers to prevent unnecessary re-renders
  const handleFilterChange = useCallback((n: { location?: LocationKey; session?: SessionKey }) => {
    if (n.location) setLocation(n.location)
    if (n.session) setSession(n.session)
  }, []);

  const handleMetricsChange = useCallback((m: Record<MetricKey, boolean>) => {
    setEnabled(m)
  }, []);

  return (
    <div className="font-sans min-h-dvh bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-[1200px] mx-auto p-4 sm:p-6 md:p-8">
        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--primary)" }}>BRIN Client Count</h1>
          <p className="text-sm text-muted-foreground">Select location and time session to explore client trends.</p>
        </header>

        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <Filters
            location={location}
            session={session}
            onChange={handleFilterChange}
            onRangeChange={setRange}
            rangeValue={range ?? "7d"}
            metrics={enabled}
            onMetricsChange={handleMetricsChange}
          />
          <div className="flex gap-2">
            <Button onClick={() => refetch()}>Refresh</Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
              Client Trend — {location === "gatsu" ? "Gatot Subroto" : location.charAt(0).toUpperCase() + location.slice(1)} / {session === "pagi" ? "Morning" : "Afternoon"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="text-destructive text-sm">{error}</div>
            ) : (
              <ClientAreaChart data={filteredData} enabled={enabled} />
            )}
            {loading && <div className="text-sm text-muted-foreground mt-2">Loading…</div>}
            <div className="mt-4">
              <KpiSummary latest={latest} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
