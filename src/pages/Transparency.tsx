import { FileText, Download } from 'lucide-react';

export function Transparency() {
    const documents = [
        { name: 'Balanço Financeiro 2024', type: 'PDF', size: '2.4 MB', date: '2024-12-01' },
        { name: 'Estatuto Social', type: 'PDF', size: '1.8 MB', date: '2023-01-15' },
        { name: 'Ata de Diretoria 2024', type: 'PDF', size: '856 KB', date: '2024-01-10' },
        { name: 'Relatório de Atividades 2023', type: 'PDF', size: '3.2 MB', date: '2024-01-05' },
    ];

    return (
        <div className="min-h-screen bg-background pt-16">
            <div className="bg-gradient-to-r from-secondary to-emerald-700 py-12 mb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Transparência</h1>
                    <p className="text-xl">Prestação de contas e documentos oficiais</p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                {/* Expense Breakdown */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                    <h2 className="text-2xl font-bold mb-6">Como Usamos os Recursos</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                Cada real doado é investido com responsabilidade para garantir o bem-estar dos animais.
                                Veja abaixo como distribuímos nossos recursos:
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-semibold text-gray-900">Veterinário e Medicamentos</span>
                                        <span className="font-bold text-primary">60%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div className="bg-primary h-3 rounded-full" style={{ width: '60%' }}></div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-semibold text-gray-900">Ração e Alimentação</span>
                                        <span className="font-bold text-secondary">30%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div className="bg-secondary h-3 rounded-full" style={{ width: '30%' }}></div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-semibold text-gray-900">Infraestrutura e Manutenção</span>
                                        <span className="font-bold text-blue-600">10%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div className="bg-blue-600 h-3 rounded-full" style={{ width: '10%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="relative w-64 h-64">
                                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                                    {/* Veterinário - 60% */}
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        fill="none"
                                        stroke="#F97316"
                                        strokeWidth="20"
                                        strokeDasharray="150.8 251.2"
                                        strokeDashoffset="0"
                                    />
                                    {/* Ração - 30% */}
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        fill="none"
                                        stroke="#10B981"
                                        strokeWidth="20"
                                        strokeDasharray="75.4 251.2"
                                        strokeDashoffset="-150.8"
                                    />
                                    {/* Infraestrutura - 10% */}
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        fill="none"
                                        stroke="#2563EB"
                                        strokeWidth="20"
                                        strokeDasharray="25.1 251.2"
                                        strokeDashoffset="-226.2"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <p className="text-3xl font-bold text-gray-900">100%</p>
                                        <p className="text-sm text-gray-600">Transparente</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Documents Table */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold mb-6">Documentos para Download</h2>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b-2 border-gray-200">
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Documento</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Tipo</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Tamanho</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Data</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.map((doc, index) => (
                                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <FileText className="text-red-600" size={24} />
                                                <span className="font-medium text-gray-900">{doc.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-semibold">
                                                {doc.type}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-gray-600">{doc.size}</td>
                                        <td className="py-4 px-4 text-gray-600">
                                            {new Date(doc.date).toLocaleDateString('pt-BR')}
                                        </td>
                                        <td className="py-4 px-4">
                                            <button className="flex items-center gap-2 text-primary hover:text-orange-700 font-semibold transition-colors">
                                                <Download size={18} />
                                                Baixar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 p-4 bg-emerald-50 rounded-xl">
                        <p className="text-sm text-gray-700">
                            <strong>Certificação OSCIP:</strong> O Instituto Acolher é uma Organização da Sociedade Civil de Interesse Público,
                            certificada pelo Ministério da Justiça. CNPJ: 12.345.678/0001-90
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
