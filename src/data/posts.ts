export interface BlogPost {
    id: number;
    title: string;
    date: string;
    content: string;
    coverImage: string;
    excerpt: string;
    highlight?: boolean;
}

export const mockPosts: BlogPost[] = [
    {
        id: 1,
        title: 'Resgate Emocionante: Thor Encontra um Lar',
        date: '2024-11-25',
        coverImage: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        excerpt: 'Thor, um labrador de 4 anos, foi resgatado das ruas e finalmente encontrou uma família amorosa...',
        content: 'Thor, um labrador de 4 anos, foi resgatado das ruas em condições precárias há 6 meses. Estava desnutrido e assustado, mas com muito amor e cuidados veterinários, se recuperou completamente. Hoje, Thor tem um lar cheio de amor e um quintal grande para brincar. Esta é mais uma história de sucesso do Instituto Acolher!',
        highlight: true,
    },
    {
        id: 2,
        title: 'Mutirão de Castração Beneficia 50 Animais',
        date: '2024-11-20',
        coverImage: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        excerpt: 'Nosso mutirão mensal de castração foi um sucesso absoluto, ajudando dezenas de animais...',
        content: 'No último sábado, realizamos nosso mutirão mensal de castração com a ajuda de veterinários voluntários. Foram 50 animais atendidos gratuitamente, entre cães e gatos. A castração é fundamental para controlar a população de animais de rua e prevenir doenças. Agradecemos a todos os voluntários e doadores que tornaram este evento possível!',
        highlight: false,
    },
    {
        id: 3,
        title: 'Família de Gatos Resgatada de Situação de Risco',
        date: '2024-11-15',
        coverImage: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        excerpt: 'Uma mãe gata e seus 5 filhotes foram resgatados de um prédio abandonado...',
        content: 'Recebemos uma denúncia sobre uma família de gatos vivendo em condições perigosas em um prédio abandonado. Nossa equipe de resgate conseguiu resgatar a mãe e todos os 5 filhotes com segurança. Todos estão recebendo cuidados veterinários e em breve estarão disponíveis para adoção. A mãe gata, que chamamos de Luna, mostrou-se extremamente protetora e carinhosa com seus bebês.',
        highlight: false,
    },
];
