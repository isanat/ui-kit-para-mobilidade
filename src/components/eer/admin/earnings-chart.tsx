"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { cn } from "@/lib/utils";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface EarningsDataPoint {
  day: string;
  earnings: number;
}

const defaultData: EarningsDataPoint[] = [
  { day: "Mon", earnings: 3120 },
  { day: "Tue", earnings: 3840 },
  { day: "Wed", earnings: 3520 },
  { day: "Thu", earnings: 4760 },
  { day: "Fri", earnings: 6240 },
  { day: "Sat", earnings: 7180 },
  { day: "Sun", earnings: 5420 },
];

const chartConfig: ChartConfig = {
  earnings: {
    label: "Earnings",
    color: "var(--primary)",
  },
};

interface EarningsChartProps {
  data?: EarningsDataPoint[];
  height?: number;
  className?: string;
  title?: string;
}

export function EarningsChart({
  data = defaultData,
  height = 280,
  className,
  title = "Earnings (last 7 days)",
}: EarningsChartProps) {
  return (
    <Card className={cn("rounded-2xl", className)}>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="w-full"
          style={{ height }}
        >
          <AreaChart
            data={data}
            margin={{ left: 4, right: 12, top: 8, bottom: 0 }}
          >
            <defs>
              <linearGradient id="eer-earnings-fill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-earnings)"
                  stopOpacity={0.4}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-earnings)"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="var(--border)"
              strokeOpacity={0.5}
            />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              stroke="var(--muted-foreground)"
              fontSize={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={48}
              tickMargin={4}
              stroke="var(--muted-foreground)"
              fontSize={12}
              tickFormatter={(value: number) => `$${(value / 1000).toFixed(1)}k`}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  formatter={(value) => (
                    <span className="font-mono font-medium tabular-nums text-foreground">
                      ${Number(value).toLocaleString()}
                    </span>
                  )}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="earnings"
              stroke="var(--color-earnings)"
              strokeWidth={2}
              fill="url(#eer-earnings-fill)"
              dot={false}
              activeDot={{
                r: 4,
                fill: "var(--color-earnings)",
                stroke: "var(--background)",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default EarningsChart;
