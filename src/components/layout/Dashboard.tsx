
import { FilterBar } from "@/components/filters/FilterBar";
import { BarChart } from "@/components/metrics/BarChart";
import { DataTable } from "@/components/metrics/DataTable";
import { LineChart } from "@/components/metrics/LineChart";
import { MetricCard } from "@/components/metrics/MetricCard";
import { PieChart } from "@/components/metrics/PieChart";
import { APP_NAMES, MODEL_NAMES, USER_NAMES, fetchMetrics } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { 
  BarChart as BarChartIcon, 
  PieChart as PieChartIcon, 
  LineChart as LineChartIcon, 
  Table as TableIcon,
  Zap, 
  Users, 
  MessageSquare, 
  Coins,
  Check,
  Info,
  AlertTriangle 
} from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/assets/logo";

export function Dashboard() {
  // State for filters
  const [filters, setFilters] = useState<{
    userId?: string;
    appId?: string;
    modelName?: string;
  }>({});

  // Debug logs for component lifecycle
  useEffect(() => {
    console.log("🚀 Dashboard mounted | Initializing metrics explorer");
    toast("Dashboard loaded successfully", {
      description: "Welcome to Chat Metrics Explorer",
      icon: <Check className="h-4 w-4 text-green-500" />,
    });
    
    return () => {
      console.log("💤 Dashboard unmounted | Cleaning up resources");
    };
  }, []);

  // Handle filter changes
  const handleFilterChange = (newFilters: {
    userId?: string;
    appId?: string;
    modelName?: string;
  }) => {
    console.log("🔍 Filters changed:", newFilters);
    setFilters(newFilters);
    
    if (Object.values(newFilters).some(value => value)) {
      toast("Filters applied", {
        description: "Loading filtered data...",
        icon: <Info className="h-4 w-4 text-blue-500" />,
      });
    } else {
      toast("Filters cleared", {
        description: "Showing all data",
      });
    }
  };

  // Fetch main metrics data
  const { data: platformData, isLoading: isPlatformLoading } = useQuery({
    queryKey: ["platform_chat_details"],
    queryFn: () => {
      console.log("📊 Fetching platform data");
      return fetchMetrics("platform_chat_details");
    },
    onError: (error) => {
      console.error("❌ Error loading platform data:", error);
      toast.error("Failed to load platform metrics");
    }
  });

  const { data: additionalData, isLoading: isAdditionalLoading } = useQuery({
    queryKey: ["additional_chat_details"],
    queryFn: () => {
      console.log("📊 Fetching additional data");
      return fetchMetrics("additional_chat_details");
    },
    onError: (error) => {
      console.error("❌ Error loading additional data:", error);
      toast.error("Failed to load additional metrics");
    }
  });

  const { data: advancedData, isLoading: isAdvancedLoading } = useQuery({
    queryKey: ["advanced_chat_details"],
    queryFn: () => {
      console.log("📊 Fetching advanced data");
      return fetchMetrics("advanced_chat_details");
    },
    onError: (error) => {
      console.error("❌ Error loading advanced data:", error);
      toast.error("Failed to load advanced metrics");
    }
  });

  const { data: analysisData, isLoading: isAnalysisLoading } = useQuery({
    queryKey: ["platform_chat_analysis"],
    queryFn: () => {
      console.log("📊 Fetching analysis data");
      return fetchMetrics("platform_chat_analysis");
    },
    onError: (error) => {
      console.error("❌ Error loading analysis data:", error);
      toast.error("Failed to load analysis metrics");
    }
  });

  // Fetch filtered data
  const { data: filteredData, isLoading: isFilteredLoading } = useQuery({
    queryKey: ["conversation_details", filters],
    queryFn: () => {
      console.log("📊 Fetching filtered data with:", filters);
      return fetchMetrics("fetch_conversation_details", {
        filters: {
          user_id: filters.userId,
          app_id: filters.appId,
          model_name: filters.modelName,
        },
        batch_size: 1000,
      });
    },
    enabled: Boolean(filters.userId || filters.appId || filters.modelName),
    onError: (error) => {
      console.error("❌ Error loading filtered data:", error);
      toast.error("Failed to load filtered conversations");
    }
  });

  // Log data loading state
  useEffect(() => {
    if (!isPlatformLoading && platformData) {
      console.log("✅ Platform data loaded successfully");
    }
    if (!isAdditionalLoading && additionalData) {
      console.log("✅ Additional data loaded successfully");
    }
    if (!isAdvancedLoading && advancedData) {
      console.log("✅ Advanced data loaded successfully");
    }
    if (!isAnalysisLoading && analysisData) {
      console.log("✅ Analysis data loaded successfully");
    }
  }, [
    isPlatformLoading, 
    isAdditionalLoading, 
    isAdvancedLoading, 
    isAnalysisLoading, 
    platformData, 
    additionalData, 
    advancedData, 
    analysisData
  ]);

  // Effect for handling filtered data
  useEffect(() => {
    if (filteredData?.result) {
      // Count the number of conversations
      const conversationCount = filteredData?.result ? Object.keys(filteredData.result).length : 0;
      console.log(`🔍 Found ${conversationCount} conversations in filtered data`);
      
      if (conversationCount > 0) {
        toast.success(`Found ${conversationCount} conversations`, {
          description: "Filtered data loaded successfully",
        });
      } else if (conversationCount === 0 && (filters.userId || filters.appId || filters.modelName)) {
        toast.info("No conversations found with current filters", {
          description: "Try adjusting your filters",
          icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
        });
      }
    }
  }, [filteredData, filters]);

  // Prepare data for visualizations
  const platformResult = platformData?.result || {};
  const additionalResult = additionalData?.result || {};
  const advancedResult = advancedData?.result || {};
  const analysisResult = analysisData?.result || {};
  
  // Format app usage data for bar chart
  const appUsageData = Object.entries(additionalResult.app_usage_distribution || {}).map(
    ([id, count]) => ({
      name: APP_NAMES[id] || id.substring(0, 8),
      value: count as number,
    })
  ).sort((a, b) => b.value - a.value);

  // Format model usage data for bar chart
  const modelUsageData = Object.entries(additionalResult.model_usage_distribution || {}).map(
    ([id, count]) => ({
      name: MODEL_NAMES[id] || id,
      value: count as number,
    })
  ).sort((a, b) => b.value - a.value);

  // Format guardrail data for pie chart
  const guardrailData = Object.entries(analysisResult.guardrail_trigger_distribution || {}).map(
    ([reason, count]) => ({
      name: reason,
      value: count as number,
    })
  );

  // Format user activity data for bar chart
  const topUsersData = (advancedResult.top_5_most_active_users || []).map(
    (user: any) => ({
      name: USER_NAMES[user.user_id] || user.user_id.substring(0, 8),
      value: user.message_count as number,
    })
  );

  // Format token trend data for line chart
  const tokenTrendData = (analysisResult.daily_tokens_trend || []).map(
    (day: any) => ({
      name: new Date(day.day).toLocaleDateString(),
      tokens: day.daily_tokens,
    })
  );

  // Prepare conversation data for table
  const conversationData = [];
  if (filteredData?.result) {
    const resultObj = filteredData.result;
    if (resultObj && typeof resultObj === 'object') {
      for (const [convId, messages] of Object.entries(resultObj)) {
        if (Array.isArray(messages) && messages.length > 0) {
          const message = messages[0];
          conversationData.push({
            id: convId,
            title: message.chat_title || "Untitled",
            model: message.model_name,
            app: APP_NAMES[message.app_id] || message.app_id.substring(0, 8),
            tokens: message.total_tokens,
            executionTime: message.execution_time.toFixed(2),
            status: message.is_active ? "Active" : "Inactive",
            guardrails: message.guardrails_status === "yes" ? message.guardrails_reason : "No issues",
          });
        }
      }
    } else {
      console.error("❌ filteredData.result is not an object:", resultObj);
    }
  }

  return (
    <div className="container py-8 animate-fade-in bg-gradient-to-br from-background to-muted/20">
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <Logo className="h-10 w-auto" />
          <h1 className="text-3xl font-semibold tracking-tight bg-gradient-to-r from-[#0F83A0] to-[#F79138] bg-clip-text text-transparent">
            Chat Metrics Explorer
          </h1>
        </div>
        <p className="mt-2 text-muted-foreground">
          Advanced analytics and performance insights for AI conversations
        </p>
      </header>

      <FilterBar
        userId={filters.userId}
        appId={filters.appId}
        modelName={filters.modelName}
        onFilterChange={handleFilterChange}
        className="mb-8 glass-card shadow-lg"
      />

      {/* KPI Cards */}
      <section className="mb-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 staggered-fade">
          <MetricCard
            title="Total Users"
            value={platformResult.total_users || 0}
            icon={<Users className="h-5 w-5 text-blue-600" />}
            isLoading={isPlatformLoading}
            className="border-l-4 border-blue-500 hover:translate-y-[-4px] transition-all duration-300"
          />
          <MetricCard
            title="Total Conversations"
            value={platformResult.total_conversations || 0}
            icon={<MessageSquare className="h-5 w-5 text-green-600" />}
            isLoading={isPlatformLoading}
            className="border-l-4 border-green-500 hover:translate-y-[-4px] transition-all duration-300"
          />
          <MetricCard
            title="Total Messages"
            value={platformResult.total_messages || 0}
            icon={<PieChartIcon className="h-5 w-5 text-purple-600" />}
            isLoading={isPlatformLoading}
            className="border-l-4 border-purple-500 hover:translate-y-[-4px] transition-all duration-300"
          />
          <MetricCard
            title="Total Tokens"
            value={analysisResult.total_tokens?.toLocaleString() || 0}
            icon={<Coins className="h-5 w-5 text-amber-600" />}
            isLoading={isAnalysisLoading}
            className="border-l-4 border-amber-500 hover:translate-y-[-4px] transition-all duration-300"
          />
        </div>
      </section>

      {/* Charts - First Row */}
      <section className="mb-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 staggered-fade">
          <BarChart
            title="Model Usage Distribution"
            data={modelUsageData}
            isLoading={isAdditionalLoading}
          />
          <PieChart
            title="Guardrail Triggers"
            data={guardrailData}
            isLoading={isAnalysisLoading}
          />
        </div>
      </section>

      {/* Charts - Second Row */}
      <section className="mb-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 staggered-fade">
          <BarChart
            title="Top 5 Active Users"
            data={topUsersData}
            isLoading={isAdvancedLoading}
          />
          <BarChart
            title="App Usage Distribution"
            data={appUsageData}
            isLoading={isAdditionalLoading}
          />
        </div>
      </section>
      
      {/* Additional Metrics */}
      <section className="mb-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 staggered-fade">
          <MetricCard
            title="Avg. Messages per Conversation"
            value={additionalResult.average_messages_per_conversation?.toFixed(1) || 0}
            isLoading={isAdditionalLoading}
            className="bg-gradient-to-br from-white/90 to-white/70 shadow-sm hover:shadow-md transition-all duration-300"
          />
          <MetricCard
            title="Avg. Tokens per Request"
            value={analysisResult.average_tokens_per_request?.toFixed(1) || 0}
            isLoading={isAnalysisLoading}
            className="bg-gradient-to-br from-white/90 to-white/70 shadow-sm hover:shadow-md transition-all duration-300"
          />
          <MetricCard
            title="Avg. Execution Time (s)"
            value={analysisResult.average_execution_time?.toFixed(2) || 0}
            isLoading={isAnalysisLoading}
            className="bg-gradient-to-br from-white/90 to-white/70 shadow-sm hover:shadow-md transition-all duration-300"
          />
        </div>
      </section>

      {/* Conversation Data Table */}
      {conversationData.length > 0 && (
        <section className="mb-8 animate-fade-up">
          <DataTable
            title={`Filtered Conversations (${conversationData.length})`}
            columns={[
              { header: "Title", accessorKey: "title" },
              { header: "Model", accessorKey: "model" },
              { header: "App", accessorKey: "app" },
              { header: "Tokens", accessorKey: "tokens" },
              { header: "Exec Time (s)", accessorKey: "executionTime" },
              { header: "Status", accessorKey: "status" },
              { header: "Guardrails", accessorKey: "guardrails" },
            ]}
            data={conversationData}
            isLoading={isFilteredLoading}
          />
        </section>
      )}
      
      {/* Footer with attribution */}
      <footer className="mt-16 text-center text-sm text-muted-foreground p-4 border-t">
        <p>AI Chat Metrics Explorer v1.0 — © {new Date().getFullYear()}</p>
        <p className="mt-1">Providing insights for modern AI communication platforms</p>
      </footer>
    </div>
  );
}
