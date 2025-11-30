import { useState } from 'react';
import { Copy, Check, Heart, Package } from 'lucide-react';

export function Donate() {
    const [activeTab, setActiveTab] = useState<'unica' | 'mensal'>('unica');
    const [copied, setCopied] = useState(false);
    const pixKey = 'pix@acolher.org.br';

    const handleCopyPix = () => {
        navigator.clipboard.writeText(pixKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const urgentItems = [
        { name: 'Ração Renal (Gatos)', priority: 'Alta' },
        { name: 'Água Sanitária', priority: 'Alta' },
        { name: 'Medicamentos Antiparasitários', priority: 'Média' },
        { name: 'Cobertores', priority: 'Média' },
        { name: 'Caixas de Transporte', priority: 'Baixa' },
    ];

    return (
        <div className="min-h-screen bg-background pt-16">
            <div className="bg-gradient-to-r from-primary to-orange-600 py-12 mb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Doe Agora</h1>
                    <p className="text-xl">Sua contribuição salva vidas</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                {/* PIX Section */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold mb-2">Doe via PIX</h2>
                        <p className="text-gray-600">A forma mais rápida e sem taxas</p>
                    </div>

                    <div className="bg-emerald-50 rounded-xl p-6 mb-4">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex-1">
                                <p className="text-sm text-gray-600 mb-1">Chave PIX</p>
                                <p className="text-xl font-mono font-bold text-gray-900">{pixKey}</p>
                            </div>
                            <button
                                onClick={handleCopyPix}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2"
                            >
                                {copied ? <Check size={20} /> : <Copy size={20} />}
                                {copied ? 'Copiado!' : 'Copiar'}
                            </button>
                        </div>
                    </div>

                    <p className="text-sm text-gray-500 text-center">
                        CNPJ: 12.345.678/0001-90 • Instituto Acolher
                    </p>
                </div>

                {/* Donation Tabs */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                    <div className="flex gap-4 mb-6 border-b">
                        <button
                            onClick={() => setActiveTab('unica')}
                            className={`pb-3 px-4 font-semibold transition-colors ${activeTab === 'unica'
                                    ? 'text-primary border-b-2 border-primary'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Doação Única
                        </button>
                        <button
                            onClick={() => setActiveTab('mensal')}
                            className={`pb-3 px-4 font-semibold transition-colors ${activeTab === 'mensal'
                                    ? 'text-primary border-b-2 border-primary'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Apadrinhamento Mensal
                        </button>
                    </div>

                    {activeTab === 'unica' && (
                        <div>
                            <h3 className="text-xl font-bold mb-4">Escolha o valor da sua doação</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <button className="border-2 border-gray-200 hover:border-primary rounded-xl p-6 text-center transition-colors group">
                                    <p className="text-3xl font-bold text-gray-900 mb-2">R$ 30</p>
                                    <p className="text-sm text-gray-600">Alimenta 1 animal por 1 semana</p>
                                </button>
                                <button className="border-2 border-primary bg-orange-50 rounded-xl p-6 text-center transition-colors group">
                                    <p className="text-3xl font-bold text-primary mb-2">R$ 50</p>
                                    <p className="text-sm text-gray-600">Vacinas para 1 animal</p>
                                    <span className="inline-block mt-2 text-xs bg-primary text-white px-2 py-1 rounded-full">Mais escolhido</span>
                                </button>
                                <button className="border-2 border-gray-200 hover:border-primary rounded-xl p-6 text-center transition-colors group">
                                    <p className="text-3xl font-bold text-gray-900 mb-2">R$ 100</p>
                                    <p className="text-sm text-gray-600">Castração de 1 animal</p>
                                </button>
                            </div>
                            <button className="w-full bg-primary hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2">
                                <Heart size={24} />
                                Continuar para Pagamento
                            </button>
                        </div>
                    )}

                    {activeTab === 'mensal' && (
                        <div>
                            <h3 className="text-xl font-bold mb-2">Seja um Padrinho</h3>
                            <p className="text-gray-600 mb-6">Contribua mensalmente e ajude a manter nosso abrigo funcionando</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <button className="border-2 border-gray-200 hover:border-secondary rounded-xl p-6 text-center transition-colors">
                                    <p className="text-3xl font-bold text-gray-900 mb-2">R$ 30/mês</p>
                                    <p className="text-sm text-gray-600">Padrinho Bronze</p>
                                </button>
                                <button className="border-2 border-secondary bg-emerald-50 rounded-xl p-6 text-center transition-colors">
                                    <p className="text-3xl font-bold text-secondary mb-2">R$ 50/mês</p>
                                    <p className="text-sm text-gray-600">Padrinho Prata</p>
                                    <span className="inline-block mt-2 text-xs bg-secondary text-white px-2 py-1 rounded-full">Recomendado</span>
                                </button>
                                <button className="border-2 border-gray-200 hover:border-secondary rounded-xl p-6 text-center transition-colors">
                                    <p className="text-3xl font-bold text-gray-900 mb-2">R$ 100/mês</p>
                                    <p className="text-sm text-gray-600">Padrinho Ouro</p>
                                </button>
                            </div>
                            <button className="w-full bg-secondary hover:bg-emerald-700 text-white py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2">
                                <Heart size={24} />
                                Tornar-se Padrinho
                            </button>
                        </div>
                    )}
                </div>

                {/* Urgent Items */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <Package className="text-primary" size={32} />
                        <div>
                            <h2 className="text-2xl font-bold">Itens Urgentes</h2>
                            <p className="text-gray-600">Precisamos da sua ajuda com estes itens</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {urgentItems.map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <span className="font-semibold text-gray-900">{item.name}</span>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${item.priority === 'Alta'
                                            ? 'bg-red-100 text-red-700'
                                            : item.priority === 'Média'
                                                ? 'bg-yellow-100 text-yellow-700'
                                                : 'bg-blue-100 text-blue-700'
                                        }`}
                                >
                                    Prioridade {item.priority}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                        <p className="text-sm text-gray-700">
                            <strong>Como doar itens físicos:</strong> Entre em contato pelo WhatsApp (11) 98765-4321 ou email contato@acolher.org.br para combinar a entrega.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
