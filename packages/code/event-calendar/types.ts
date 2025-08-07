export type EventColor = 
  | "emerald" 
  | "orange" 
  | "violet" 
  | "blue" 
  | "red" 
  | "yellow" 
  | "pink" 
  | "purple" 
  | "indigo" 
  | "gray"
  | "rose";

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  color: EventColor;
  etiquette: string;
  location?: string;
  allDay?: boolean;
}

export interface CalendarEtiquette {
  id: string;
  name: string;
  color: EventColor;
  isActive: boolean;
}
