export interface Event {
    id: number;
    name: string;
    date: string;
    time: string;
    location: string;
    description: string;
    status?: 'Agendado' | 'Concluído';
}

export const mockEvents: Event[] = [
    {
        id: 1,
        name: 'Feira de Adoção - Shopping Center',
        date: '2024-12-15',
        time: '10:00',
        location: 'Shopping Center Norte - Praça de Eventos',
        description: 'Grande feira de adoção com mais de 30 animais disponíveis. Venha conhecer seu novo melhor amigo!',
        status: 'Agendado',
    },
    {
        id: 2,
        name: 'Bingo Beneficente',
        date: '2024-12-20',
        time: '19:00',
        location: 'Salão Paroquial São Francisco',
        description: 'Bingo beneficente para arrecadar fundos para ração e medicamentos. Prêmios incríveis!',
        status: 'Agendado',
    },
    {
        id: 3,
        name: 'Mutirão de Castração Gratuita',
        date: '2024-12-28',
        time: '08:00',
        location: 'Sede do Instituto Acolher',
        description: 'Mutirão de castração gratuita. Vagas limitadas, inscrições pelo WhatsApp.',
        status: 'Agendado',
    },
    {
        id: 4,
        name: 'Palestra: Posse Responsável',
        date: '2024-11-10',
        time: '14:00',
        location: 'Biblioteca Municipal',
        description: 'Palestra sobre posse responsável de animais de estimação com veterinária especializada.',
        status: 'Concluído',
    },
    {
        id: 5,
        name: 'Caminhada Pet Solidária',
        date: '2024-10-28',
        time: '09:00',
        location: 'Parque Ibirapuera',
        description: 'Caminhada solidária com pets para arrecadar doações. Participação gratuita!',
        status: 'Concluído',
    },
];
