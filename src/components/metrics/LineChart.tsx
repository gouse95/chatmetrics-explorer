
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface LineChartProps {
  title: string;
  data: Array<{
    name: string;
    [key: string]: string | number;
  }>;
  lines: Array<{
    dataKey: string;
    color: string;
    name?: string;
  }>;
  className?: string;
  showLegend?: boolean;
  yAxisLabel?: string;
  isLoading?: boolean;
}

export function LineChart({
  title,
  data,
  lines,
  className,
  showLegend = false,
  yAxisLabel,
  isLoading = false,
}: LineChartProps) {
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
            <RechartsLineChart
              data={data}
              margin={{ top: 5, right: 20, left: 20, bottom: 30 }}
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
                contentStyle={{
                  background: "rgba(255, 255, 255, 0.95)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                  padding: "8px 12px",
                }}
              />
              {showLegend && <Legend />}
              {lines.map((line, index) => (
                <Line
                  key={index}
                  type="monotone"
                  dataKey={line.dataKey}
                  stroke={line.color}
                  name={line.name || line.dataKey}
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 1 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                  animationDuration={1000}
                  animationEasing="ease-out"
                />
              ))}
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
