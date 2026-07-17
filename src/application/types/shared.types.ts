export interface PublishResult {
  success: boolean;
  url?: string;
  size?: number;
  error?: string;
}

export type LogLevel = 'info' | 'success' | 'error' | 'warning';

export type PublishingState = 'draft' | 'uploading' | 'success' | 'failed';

export interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: LogLevel;
}
