
import { toast } from "sonner";

export type MetricType = 
  | "platform_chat_details" 
  | "additional_chat_details" 
  | "advanced_chat_details" 
  | "platform_chat_analysis"
  | "fetch_conversation_details"
  | "chat_analysis_totals";

export type FilterParams = {
  user_id?: string;
  app_id?: string;
  model_name?: string;
};

export const fetchMetrics = async (metricType: MetricType, params: { filters?: FilterParams, batch_size?: number } = {}) => {
  try {
    // Simulate API request with a short delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Return mock data based on the metric type
    let data;
    
    switch (metricType) {
      case "platform_chat_details":
        data = {
          "result": {
            "app_usage_distribution": {
              "1b2d3e4c-5a6f-7d8a-9e0f-3b2c1d4a5e6f": 22,
              "1e4d9f35-6b1f-4238-91f0-8a7c2d5e4a11": 18,
              "2f3e4d5a-1b6c-7d8e-9a0f-4c5b1a2d3e6f": 32,
              "3f1a0e24-b5b4-4f3e-9e8c-2f1dcb1d8b44": 19,
              "4d5a6c7d-9e3b-2f1a-0f8c-7d3e1b4c5a6f": 29,
              "5a6c7d9e-3b2f-4a1d-8c9e-0f7b1a2d3c4e": 19,
              "7c2b8a5d-1f2e-4839-8d9a-3c5e0f7a6c92": 29,
              "8c9e0f7b-5a1d-2d3e-4c6b-7d8a1f3e5c2b": 31,
              "9b5c6d84-2e1f-4a3b-9d8c-7e2f1a0d5b6c": 23,
              "9e0f7b1a-2d3e-4c5a-6f8d-1b2c3d4a5e7f": 28
            },
            "total_active_chats": 127,
            "total_conversations": 250,
            "total_file_attachments": 0,
            "total_liked_messages": 0,
            "total_messages": 250,
            "total_users": 10
          }
        };
        break;
      
      case "additional_chat_details":
        data = {
          "result": {
            "app_usage_distribution": {
              "1b2d3e4c-5a6f-7d8a-9e0f-3b2c1d4a5e6f": 22,
              "1e4d9f35-6b1f-4238-91f0-8a7c2d5e4a11": 18,
              "2f3e4d5a-1b6c-7d8e-9a0f-4c5b1a2d3e6f": 32,
              "3f1a0e24-b5b4-4f3e-9e8c-2f1dcb1d8b44": 19,
              "4d5a6c7d-9e3b-2f1a-0f8c-7d3e1b4c5a6f": 29,
              "5a6c7d9e-3b2f-4a1d-8c9e-0f7b1a2d3c4e": 19,
              "7c2b8a5d-1f2e-4839-8d9a-3c5e0f7a6c92": 29,
              "8c9e0f7b-5a1d-2d3e-4c6b-7d8a1f3e5c2b": 31,
              "9b5c6d84-2e1f-4a3b-9d8c-7e2f1a0d5b6c": 23,
              "9e0f7b1a-2d3e-4c5a-6f8d-1b2c3d4a5e7f": 28
            },
            "average_messages_per_conversation": 1.0,
            "average_messages_per_user": 25.0,
            "file_type_distribution": {},
            "like_ratio": 0.0,
            "model_usage_distribution": {
              "gpt-3.5": 49,
              "gpt-4": 74,
              "lamma": 61,
              "mixtral": 66
            },
            "system_prompt_usage": 0,
            "total_active_conversations": 127,
            "total_conversations": 250,
            "total_file_attachments": 0,
            "total_inactive_conversations": 123,
            "total_liked_messages": 0,
            "total_messages": 250,
            "total_users": 10
          }
        };
        break;
      
      case "advanced_chat_details":
        data = {
          "result": {
            "average_message_length": 34.0,
            "conversation_duration_stats": {
              "avg_duration": "0:00:00.000007",
              "max_duration": "0:00:00.001000",
              "min_duration": "0:00:00"
            },
            "daily_message_counts": [
              {
                "day": "Thu, 27 Feb 2025 00:00:00 GMT",
                "message_count": 250
              }
            ],
            "longest_conversation": {
              "conv_id": "db8c2c46-7d36-403b-af1d-48ab93686618",
              "message_count": 1
            },
            "max_message_length": 34,
            "multi_model_conversations": 0,
            "top_5_most_active_users": [
              {
                "message_count": 34,
                "user_id": "5c4b3a2d-1e0f-98b7-6a5c-4d3e2f1e0d9c"
              },
              {
                "message_count": 28,
                "user_id": "9e8d7c6b-5a4f-32e1-bc0a-8d7e6f5c4b3a"
              },
              {
                "message_count": 25,
                "user_id": "3f1a3b92-8c2b-4a44-bc93-6e6f0f786b98"
              },
              {
                "message_count": 25,
                "user_id": "b7e1a2d3-6c4e-45f2-9b88-1c2d3a4e5f67"
              },
              {
                "message_count": 24,
                "user_id": "f3c5b8a4-17a2-4f8e-91b6-2d0a9cfeb6f9"
              }
            ]
          }
        };
        break;
      
      case "platform_chat_analysis":
        data = {
          "result": {
            "average_execution_time": 1.292,
            "average_tokens_per_request": 486.36,
            "daily_tokens_trend": [
              {
                "daily_tokens": 695009,
                "day": "Thu, 27 Feb 2025 00:00:00 GMT"
              }
            ],
            "guardrail_trigger_distribution": {
              "Policy violation": 19,
              "Potentially harmful language": 32,
              "Sensitive content detected": 29,
              "Spam detected": 20,
              "User flagged inappropriate": 22
            },
            "prompt_vs_completion_ratio": 0.671,
            "total_completion_tokens": 385214,
            "total_guardrail_events": 122,
            "total_prompt_tokens": 258606,
            "total_successful_requests": 1429,
            "total_tokens": 695009
          }
        };
        break;
        
      case "chat_analysis_totals":
        // This data would typically be filtered based on params.filters
        data = {
          "result": {
            "total_completion": 1279,
            "total_prompt": 355,
            "total_successful_requests": 2,
            "total_tokens": 2266
          }
        };
        break;
        
      case "fetch_conversation_details":
        // Return filtered conversation details
        data = {
          "result": {
            "0414b579-3bc3-4c7b-986d-9250fae68bdc": [
              {
                "app_id": "5a6c7d9e-3b2f-4a1d-8c9e-0f7b1a2d3c4e",
                "chat_id": "0a447e88-3d48-45ff-88a4-80e574b77c2f",
                "chat_title": "User Support Chat",
                "completion_tokens": 702,
                "conv_id": "0414b579-3bc3-4c7b-986d-9250fae68bdc",
                "created_at": "Thu, 27 Feb 2025 16:12:03 GMT",
                "execution_time": 0.58,
                "guardrails_reason": "Potentially harmful language",
                "guardrails_status": "no",
                "id": 441,
                "is_active": true,
                "model_name": "gpt-3.5",
                "model_provider": "watsonx",
                "msg": "Hello! How can I assist you today?",
                "msg_from": "AI",
                "msg_to": "user",
                "prompt_tokens": 1216,
                "successful_requests": 5,
                "total_tokens": 4213,
                "user_id": "9e8d7c6b-5a4f-32e1-bc0a-8d7e6f5c4b3a"
              }
            ]
            // We'd include more conversations here, but shortened for brevity
          }
        };
        break;
      
      default:
        data = { result: {} };
    }
    
    // Filter based on the provided params if we're fetching conversation details
    if (metricType === "fetch_conversation_details" && params.filters) {
      const { user_id, app_id, model_name } = params.filters;
      
      // In a real implementation, we'd filter the data based on these parameters
      console.log(`Filtering by: User ID: ${user_id}, App ID: ${app_id}, Model: ${model_name}`);
    }
    
    return data;
    
  } catch (error) {
    console.error("Failed to fetch metrics:", error);
    toast.error("Failed to fetch metrics");
    return { result: {} };
  }
};

// App names mapping
export const APP_NAMES: Record<string, string> = {
  "1b2d3e4c-5a6f-7d8a-9e0f-3b2c1d4a5e6f": "Customer Support",
  "1e4d9f35-6b1f-4238-91f0-8a7c2d5e4a11": "Knowledge Base",
  "2f3e4d5a-1b6c-7d8e-9a0f-4c5b1a2d3e6f": "Product Assistant",
  "3f1a0e24-b5b4-4f3e-9e8c-2f1dcb1d8b44": "Code Helper",
  "4d5a6c7d-9e3b-2f1a-0f8c-7d3e1b4c5a6f": "Marketing Assistant",
  "5a6c7d9e-3b2f-4a1d-8c9e-0f7b1a2d3c4e": "Sales Assistant",
  "7c2b8a5d-1f2e-4839-8d9a-3c5e0f7a6c92": "HR Assistant",
  "8c9e0f7b-5a1d-2d3e-4c6b-7d8a1f3e5c2b": "Legal Assistant",
  "9b5c6d84-2e1f-4a3b-9d8c-7e2f1a0d5b6c": "Finance Assistant",
  "9e0f7b1a-2d3e-4c5a-6f8d-1b2c3d4a5e7f": "Analytics Assistant"
};

// User names mapping
export const USER_NAMES: Record<string, string> = {
  "5c4b3a2d-1e0f-98b7-6a5c-4d3e2f1e0d9c": "Sarah Johnson",
  "9e8d7c6b-5a4f-32e1-bc0a-8d7e6f5c4b3a": "Michael Chen",
  "3f1a3b92-8c2b-4a44-bc93-6e6f0f786b98": "Emily Rodriguez",
  "b7e1a2d3-6c4e-45f2-9b88-1c2d3a4e5f67": "David Kim",
  "f3c5b8a4-17a2-4f8e-91b6-2d0a9cfeb6f9": "Jessica Patel"
};

// Model display names
export const MODEL_NAMES: Record<string, string> = {
  "gpt-3.5": "GPT-3.5",
  "gpt-4": "GPT-4",
  "lamma": "Llama 2",
  "mixtral": "Mixtral 8x7B"
};
