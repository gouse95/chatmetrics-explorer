
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface BarChartProps {
  title: string;
  data: Array<{ name: string; value: number; color?: string; }>;
  className?: string;
  showLegend?: boolean;
  yAxisLabel?: string;
  isLoading?: boolean;
}

export function BarChart({
  title,
  data,
  className,
  showLegend = false,
  yAxisLabel,
  isLoading = false,
}: BarChartProps) {
  // Format data for Recharts
  const chartData = data.map((item) => ({
    name: item.name,
    value: item.value,
  }));

  // Default color palette
  const colors = ["#0051ff", "#4485fd", "#6ba5ff", "#95c5ff", "#b6d8fd"];

  return (
    <Card className={cn("glass-card overflow-hidden p-6", className)}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-medium">{title}</h3>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              data={chartData}
              margin={{ top: 5, right: 20, left: 20, bottom: 30 }}
              barCategoryGap="20%"
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "#eee" }}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "#eee" }}
                label={
                  yAxisLabel
                    ? {
                        value: yAxisLabel,
                        angle: -90,
                        position: "insideLeft",
                        style: { textAnchor: "middle", fontSize: 12 },
                      }
                    : undefined
                }
              />
              <Tooltip
                cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                contentStyle={{
                  background: "rgba(255, 255, 255, 0.95)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                  padding: "8px 12px",
                }}
              />
              {showLegend && <Legend />}
              <Bar dataKey="value" radius={[4, 4, 0, 0]} animationDuration={800}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color || colors[index % colors.length]}
                  />
                ))}
              </Bar>
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
