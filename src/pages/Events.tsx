import { useEvents } from '../contexts/EventsContext';
import { Calendar, Clock, MapPin } from 'lucide-react';

export function Events() {
    const { events } = useEvents();
    const now = new Date();

    const upcomingEvents = events
        .filter(e => new Date(e.date) >= now)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const pastEvents = events
        .filter(e => new Date(e.date) < now)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="min-h-screen bg-background pt-16">
            <div className="bg-gradient-to-r from-primary to-orange-600 py-12 mb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Agenda de Eventos</h1>
                    <p className="text-xl">Participe de nossas atividades e ajude a causa animal</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-12">
                {/* Upcoming Events */}
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Próximos Eventos</h2>
                    {upcomingEvents.length > 0 ? (
                        <div className="grid gap-6">
                            {upcomingEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border-2 border-primary/20 hover:border-primary transition-colors"
                                >
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-primary to-orange-600 rounded-xl flex flex-col items-center justify-center text-white">
                                            <div className="text-3xl font-bold">
                                                {new Date(event.date).getDate()}
                                            </div>
                                            <div className="text-sm uppercase">
                                                {new Date(event.date).toLocaleDateString('pt-BR', { month: 'short' })}
                                            </div>
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-gray-900 mb-3">{event.name}</h3>
                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Clock size={18} className="text-primary" />
                                                    <span>{event.time}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <MapPin size={18} className="text-primary" />
                                                    <span>{event.location}</span>
                                                </div>
                                            </div>
                                            <p className="text-gray-700">{event.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-xl">
                            <Calendar className="mx-auto text-gray-400 mb-3" size={48} />
                            <p className="text-gray-600">Nenhum evento programado no momento</p>
                        </div>
                    )}
                </div>

                {/* Past Events */}
                {pastEvents.length > 0 && (
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Eventos Realizados</h2>
                        <div className="grid gap-4">
                            {pastEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className="bg-gray-50 rounded-xl p-6 border border-gray-200 opacity-75"
                                >
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="flex-shrink-0 w-16 h-16 bg-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-700">
                                            <div className="text-xl font-bold">
                                                {new Date(event.date).getDate()}
                                            </div>
                                            <div className="text-xs uppercase">
                                                {new Date(event.date).toLocaleDateString('pt-BR', { month: 'short' })}
                                            </div>
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-800 mb-2">{event.name}</h3>
                                            <p className="text-sm text-gray-600">{event.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
