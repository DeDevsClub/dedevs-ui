"use client";

import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';
import { cn } from '@repo/shadcn-ui/lib/utils';
import { CalendarEvent, EventColor } from './types';
import { useCalendarContext } from './calendar-context';

interface EventCalendarProps {
  className?: string;
  events?: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  onDateClick?: (date: Date) => void;
}

const colorClasses: Record<EventColor, string> = {
  emerald: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  orange: 'bg-orange-100 text-orange-800 border-orange-200',
  violet: 'bg-violet-100 text-violet-800 border-violet-200',
  blue: 'bg-blue-100 text-blue-800 border-blue-200',
  red: 'bg-red-100 text-red-800 border-red-200',
  yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  pink: 'bg-pink-100 text-pink-800 border-pink-200',
  purple: 'bg-purple-100 text-purple-800 border-purple-200',
  indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  gray: 'bg-gray-100 text-gray-800 border-gray-200',
  rose: 'bg-rose-100 text-rose-800 border-rose-200',
};

export function EventCalendar({ 
  className, 
  events: propEvents, 
  onEventClick, 
  onDateClick 
}: EventCalendarProps) {
  const { selectedDate, events: contextEvents, etiquettes } = useCalendarContext();
  const events = propEvents || contextEvents;
  
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getEventsForDate = (date: Date) => {
    const activeEtiquetteIds = etiquettes
      .filter(e => e.isActive)
      .map(e => e.id);
    
    return events.filter(event => 
      isSameDay(event.start, date) && 
      activeEtiquetteIds.includes(event.etiquette)
    );
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Calendar Header */}
      <div className="mb-4">
        <h2 className="text-2xl font-semibold">
          {format(selectedDate, 'MMMM yyyy')}
        </h2>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Day Headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}

        {/* Calendar Days */}
        {monthDays.map((day: Date) => {
          const dayEvents = getEventsForDate(day);
          const isCurrentMonth = isSameMonth(day, selectedDate);
          const isDayToday = isToday(day);

          return (
            <div
              key={day.toISOString()}
              className={cn(
                "min-h-[100px] p-1 border border-gray-200 cursor-pointer hover:bg-gray-50",
                !isCurrentMonth && "bg-gray-50 text-gray-400",
                isDayToday && "bg-blue-50 border-blue-200"
              )}
              onClick={() => onDateClick?.(day)}
            >
              <div className="text-sm font-medium mb-1">
                {format(day, 'd')}
              </div>
              
              <div className="space-y-1">
                {dayEvents.slice(0, 3).map(event => (
                  <div
                    key={event.id}
                    className={cn(
                      "text-xs p-1 rounded border cursor-pointer truncate",
                      colorClasses[event.color]
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick?.(event);
                    }}
                    title={event.title}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-gray-500 p-1">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
