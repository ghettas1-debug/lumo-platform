// Professional logging utility
import React from 'react';

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  data?: any;
  timestamp: string;
  userId?: string;
  sessionId?: string;
}

class Logger {
  private isDevelopment: boolean;
  private sessionId: string;

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
    this.sessionId = this.generateSessionId();
  }

  private generateSessionId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  private createLogEntry(level: LogLevel, message: string, data?: any): LogEntry {
    return {
      level,
      message,
      data,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
    };
  }

  private log(entry: LogEntry): void {
    if (!this.isDevelopment && entry.level !== LogLevel.ERROR) {
      return;
    }

    const logMessage = `[${entry.timestamp}] ${entry.level.toUpperCase()}: ${entry.message}`;
    
    switch (entry.level) {
      case LogLevel.ERROR:
        console.error(logMessage, entry.data);
        break;
      case LogLevel.WARN:
        console.warn(logMessage, entry.data);
        break;
      case LogLevel.INFO:
        console.info(logMessage, entry.data);
        break;
      case LogLevel.DEBUG:
        if (this.isDevelopment) {
          console.debug(logMessage, entry.data);
        }
        break;
    }
  }

  error(message: string, data?: any): void {
    const entry = this.createLogEntry(LogLevel.ERROR, message, data);
    this.log(entry);
  }

  warn(message: string, data?: any): void {
    const entry = this.createLogEntry(LogLevel.WARN, message, data);
    this.log(entry);
  }

  info(message: string, data?: any): void {
    const entry = this.createLogEntry(LogLevel.INFO, message, data);
    this.log(entry);
  }

  debug(message: string, data?: any): void {
    const entry = this.createLogEntry(LogLevel.DEBUG, message, data);
    this.log(entry);
  }

  // Performance logging
  time(label: string): void {
    if (this.isDevelopment) {
      console.time(label);
    }
  }

  timeEnd(label: string): void {
    if (this.isDevelopment) {
      console.timeEnd(label);
    }
  }

  // Analytics logging
  track(event: string, properties?: Record<string, any>): void {
    const entry = this.createLogEntry(LogLevel.INFO, `Analytics: ${event}`, properties);
    this.log(entry);
    
    // Send to analytics service in production
    if (!this.isDevelopment) {
      // TODO: Implement analytics service integration
      // analytics.track(event, properties);
    }
  }
}

export const logger = new Logger();

// Performance monitoring utility
export class PerformanceMonitor {
  private static measurements = new Map<string, number>();

  static start(label: string): void {
    this.measurements.set(label, performance.now());
  }

  static end(label: string): number {
    const startTime = this.measurements.get(label);
    if (!startTime) {
      logger.warn(`Performance measurement "${label}" was not started`);
      return 0;
    }

    const duration = performance.now() - startTime;
    this.measurements.delete(label);
    
    logger.debug(`Performance: ${label} took ${duration.toFixed(2)}ms`);
    return duration;
  }

  static measure<T>(label: string, fn: () => T): T {
    this.start(label);
    const result = fn();
    this.end(label);
    return result;
  }

  static async measureAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
    this.start(label);
    const result = await fn();
    this.end(label);
    return result;
  }
}

// React hook for performance monitoring
export function usePerformanceMonitor() {
  const monitor = React.useCallback((label: string, fn: () => void) => {
    PerformanceMonitor.measure(label, fn);
  }, []);

  const monitorAsync = React.useCallback(async <T>(label: string, fn: () => Promise<T>): Promise<T> => {
    return await PerformanceMonitor.measureAsync(label, fn);
  }, []);

  return { monitor, monitorAsync };
}
