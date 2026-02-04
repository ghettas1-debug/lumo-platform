"use client";

import React from 'react';

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onChange: (value: string) => void;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="tabs">
      {tabs.map(tab => (
        <button 
          key={tab} 
          className={activeTab === tab ? 'active' : ''} 
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export function TabsList({ children, className = "" }: TabsListProps) {
  return (
    <div className={`tabs-list ${className}`}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children, isActive = false, onClick, className = "" }: TabsTriggerProps) {
  return (
    <button
      className={`tabs-trigger ${isActive ? 'active' : ''} ${className}`}
      onClick={onClick}
      data-value={value}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, isActive = false, className = "" }: TabsContentProps) {
  if (!isActive) return null;
  
  return (
    <div className={`tabs-content ${className}`} data-value={value}>
      {children}
    </div>
  );
}

export default Tabs;
