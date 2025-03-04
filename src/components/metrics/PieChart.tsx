
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Cell,
  Legend,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface PieChartProps {
  title: string;
  data: Array<{ name: string; value: number; color?: string }>;
  className?: string;
  showLegend?: boolean;
  isLoading?: boolean;
}

export function PieChart({
  title,
  data,
  className,
  showLegend = true,
  isLoading = false,
}: PieChartProps) {
  // Default color palette
  const colors = ["#0051ff", "#4485fd", "#6ba5ff", "#95c5ff", "#b6d8fd", "#3366cc", "#9ec5fe", "#3390ff", "#1a56db", "#004fd0"];

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
            <RechartsPieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={1}
                dataKey="value"
                animationDuration={800}
                animationEasing="ease-out"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color || colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "rgba(255, 255, 255, 0.95)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                  padding: "8px 12px",
                }}
                formatter={(value) => [`${value}`, ""]}
              />
              {showLegend && (
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ fontSize: 12, paddingTop: 16 }}
                />
              )}
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
