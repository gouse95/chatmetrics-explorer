
import { APP_NAMES, MODEL_NAMES, USER_NAMES } from "@/services/api";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Check } from "lucide-react";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterBarProps {
  userId?: string;
  appId?: string;
  modelName?: string;
  onFilterChange: (filters: { userId?: string; appId?: string; modelName?: string }) => void;
  className?: string;
}

export function FilterBar({
  userId,
  appId,
  modelName,
  onFilterChange,
  className,
}: FilterBarProps) {
  const [userOpen, setUserOpen] = useState(false);
  const [appOpen, setAppOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);

  // Convert data to FilterOption format
  const userOptions: FilterOption[] = Object.entries(USER_NAMES).map(
    ([value, label]) => ({ value, label })
  );

  const appOptions: FilterOption[] = Object.entries(APP_NAMES).map(
    ([value, label]) => ({ value, label })
  );

  const modelOptions: FilterOption[] = Object.entries(MODEL_NAMES).map(
    ([value, label]) => ({ value, label })
  );

  // Helper functions
  const getSelectedLabel = (
    options: FilterOption[],
    value?: string
  ): string => {
    if (!value) return "Select...";
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : "Select...";
  };

  const handleClearFilters = () => {
    onFilterChange({ userId: undefined, appId: undefined, modelName: undefined });
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        <span className="text-sm font-medium text-muted-foreground">Filter by:</span>

        {/* User Filter */}
        <Popover open={userOpen} onOpenChange={setUserOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-9 border-dashed"
              role="combobox"
              aria-expanded={userOpen}
            >
              <span className="truncate">
                {userId
                  ? `User: ${getSelectedLabel(userOptions, userId)}`
                  : "Select User"}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" align="start">
            <Command>
              <CommandInput placeholder="Search users..." />
              <CommandList>
                <CommandEmpty>No users found.</CommandEmpty>
                <CommandGroup>
                  {userOptions.map((option) => (
                    <CommandItem
                      key={option.value}
                      onSelect={() => {
                        onFilterChange({
                          userId: option.value === userId ? undefined : option.value,
                          appId,
                          modelName,
                        });
                        setUserOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          userId === option.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* App Filter */}
        <Popover open={appOpen} onOpenChange={setAppOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-9 border-dashed"
              role="combobox"
              aria-expanded={appOpen}
            >
              <span className="truncate">
                {appId
                  ? `App: ${getSelectedLabel(appOptions, appId)}`
                  : "Select App"}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" align="start">
            <Command>
              <CommandInput placeholder="Search apps..." />
              <CommandList>
                <CommandEmpty>No apps found.</CommandEmpty>
                <CommandGroup>
                  {appOptions.map((option) => (
                    <CommandItem
                      key={option.value}
                      onSelect={() => {
                        onFilterChange({
                          userId,
                          appId: option.value === appId ? undefined : option.value,
                          modelName,
                        });
                        setAppOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          appId === option.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Model Filter */}
        <Popover open={modelOpen} onOpenChange={setModelOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-9 border-dashed"
              role="combobox"
              aria-expanded={modelOpen}
            >
              <span className="truncate">
                {modelName
                  ? `Model: ${getSelectedLabel(modelOptions, modelName)}`
                  : "Select Model"}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" align="start">
            <Command>
              <CommandInput placeholder="Search models..." />
              <CommandList>
                <CommandEmpty>No models found.</CommandEmpty>
                <CommandGroup>
                  {modelOptions.map((option) => (
                    <CommandItem
                      key={option.value}
                      onSelect={() => {
                        onFilterChange({
                          userId,
                          appId,
                          modelName:
                            option.value === modelName ? undefined : option.value,
                        });
                        setModelOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          modelName === option.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Display active filters as badges */}
      <div className="flex flex-wrap gap-2">
        {userId && (
          <Badge variant="secondary" className="flex items-center gap-1">
            User: {getSelectedLabel(userOptions, userId)}
            <button
              onClick={() =>
                onFilterChange({ userId: undefined, appId, modelName })
              }
              className="ml-1 rounded-full p-0.5 hover:bg-muted"
            >
              ×
            </button>
          </Badge>
        )}
        {appId && (
          <Badge variant="secondary" className="flex items-center gap-1">
            App: {getSelectedLabel(appOptions, appId)}
            <button
              onClick={() =>
                onFilterChange({ userId, appId: undefined, modelName })
              }
              className="ml-1 rounded-full p-0.5 hover:bg-muted"
            >
              ×
            </button>
          </Badge>
        )}
        {modelName && (
          <Badge variant="secondary" className="flex items-center gap-1">
            Model: {getSelectedLabel(modelOptions, modelName)}
            <button
              onClick={() =>
                onFilterChange({ userId, appId, modelName: undefined })
              }
              className="ml-1 rounded-full p-0.5 hover:bg-muted"
            >
              ×
            </button>
          </Badge>
        )}
      </div>

      {/* Clear filters button */}
      {(userId || appId || modelName) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearFilters}
          className="ml-auto h-8 px-2 text-xs"
        >
          Clear filters
        </Button>
      )}
    </div>
  );
}
