"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CalendarEvent, CalendarEtiquette } from './types';

interface CalendarContextType {
  events: CalendarEvent[];
  etiquettes: CalendarEtiquette[];
  selectedDate: Date;
  view: 'month' | 'week' | 'day';
  setEvents: (events: CalendarEvent[]) => void;
  setEtiquettes: (etiquettes: CalendarEtiquette[]) => void;
  setSelectedDate: (date: Date) => void;
  setView: (view: 'month' | 'week' | 'day') => void;
  addEvent: (event: CalendarEvent) => void;
  updateEvent: (eventId: string, updates: Partial<CalendarEvent>) => void;
  deleteEvent: (eventId: string) => void;
  toggleEtiquette: (etiquetteId: string) => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

interface CalendarProviderProps {
  children: ReactNode;
  initialEvents?: CalendarEvent[];
  initialEtiquettes?: CalendarEtiquette[];
}

export function CalendarProvider({ 
  children, 
  initialEvents = [], 
  initialEtiquettes = [] 
}: CalendarProviderProps) {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [etiquettes, setEtiquettes] = useState<CalendarEtiquette[]>(initialEtiquettes);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');

  const addEvent = (event: CalendarEvent) => {
    setEvents(prev => [...prev, event]);
  };

  const updateEvent = (eventId: string, updates: Partial<CalendarEvent>) => {
    setEvents(prev => 
      prev.map(event => 
        event.id === eventId ? { ...event, ...updates } : event
      )
    );
  };

  const deleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  const toggleEtiquette = (etiquetteId: string) => {
    setEtiquettes(prev =>
      prev.map(etiquette =>
        etiquette.id === etiquetteId
          ? { ...etiquette, isActive: !etiquette.isActive }
          : etiquette
      )
    );
  };

  const value: CalendarContextType = {
    events,
    etiquettes,
    selectedDate,
    view,
    setEvents,
    setEtiquettes,
    setSelectedDate,
    setView,
    addEvent,
    updateEvent,
    deleteEvent,
    toggleEtiquette,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendarContext() {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendarContext must be used within a CalendarProvider');
  }
  return context;
}
