import { createContext, useContext, useState, type ReactNode } from 'react';
import { mockEvents, type Event } from '../data/events';

interface EventsContextType {
    events: Event[];
    addEvent: (event: Omit<Event, 'id'>) => void;
    updateEvent: (id: number, event: Omit<Event, 'id'>) => void;
    deleteEvent: (id: number) => void;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export function EventsProvider({ children }: { children: ReactNode }) {
    const [events, setEvents] = useState<Event[]>(() => {
        const stored = localStorage.getItem('events_data');
        return stored ? JSON.parse(stored) : mockEvents;
    });

    const saveToStorage = (newEvents: Event[]) => {
        localStorage.setItem('events_data', JSON.stringify(newEvents));
        setEvents(newEvents);
    };

    const addEvent = (event: Omit<Event, 'id'>) => {
        const newId = Math.max(...events.map(e => e.id), 0) + 1;
        const newEvent = { ...event, id: newId };
        saveToStorage([...events, newEvent]);
    };

    const updateEvent = (id: number, event: Omit<Event, 'id'>) => {
        const updated = events.map(e => e.id === id ? { ...event, id } : e);
        saveToStorage(updated);
    };

    const deleteEvent = (id: number) => {
        const filtered = events.filter(e => e.id !== id);
        saveToStorage(filtered);
    };

    return (
        <EventsContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
            {children}
        </EventsContext.Provider>
    );
}

export function useEvents() {
    const context = useContext(EventsContext);
    if (!context) {
        throw new Error('useEvents must be used within EventsProvider');
    }
    return context;
}
