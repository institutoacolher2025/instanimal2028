import { useEffect, useState } from 'react';

type ConsentPrefs = {
    status: 'accepted' | 'declined' | 'custom';
    analytics: boolean;
};

export function CookieBanner() {
    const [visible, setVisible] = useState(false);
    const [prefs, setPrefs] = useState<ConsentPrefs | null>(null);
    const [showConfig, setShowConfig] = useState(false);
    const [analyticsOptIn, setAnalyticsOptIn] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem('cookie_consent');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed && parsed.status) {
                    setPrefs(parsed);
                } else {
                    setVisible(true);
                }
            } catch {
                setVisible(true);
            }
        } else {
            setVisible(true);
        }
    }, []);

    const savePrefs = (value: ConsentPrefs) => {
        localStorage.setItem('cookie_consent', JSON.stringify(value));
        setPrefs(value);
        setVisible(false);
        setShowConfig(false);
    };

    if (!visible || prefs) return null;

    return (
        <div className="fixed bottom-4 inset-x-0 px-4 z-50">
            <div className="max-w-4xl mx-auto bg-white shadow-xl border border-gray-200 rounded-2xl p-4 md:p-5 flex flex-col gap-3">
                <div>
                    <p className="font-semibold text-gray-900">Aviso de cookies</p>
                    <p className="text-sm text-gray-600 mt-1">
                        Nós usamos cookies para melhorar sua experiência e analisar o tráfego. Ao continuar navegando, você concorda com nossa Política de Privacidade.
                    </p>
                </div>

                {showConfig && (
                    <div className="rounded-lg border border-gray-200 p-3 bg-gray-50">
                        <label className="flex items-center gap-2 text-sm text-gray-800">
                            <input
                                type="checkbox"
                                checked
                                disabled
                                className="w-4 h-4 text-primary"
                    />
                    Cookies essenciais (obrigatórios)
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-800 mt-2">
                    <input
                        type="checkbox"
                        checked={analyticsOptIn}
                        onChange={(e) => setAnalyticsOptIn(e.target.checked)}
                        className="w-4 h-4 text-primary"
                    />
                    Cookies analíticos (apenas agregados)
                </label>
                <p className="text-xs text-gray-500 mt-2">
                            Você pode ajustar depois limpando os cookies no navegador.
                        </p>
                    </div>
                )}

                <div className="flex flex-wrap gap-2 justify-end">
                    <button
                        onClick={() => savePrefs({ status: 'declined', analytics: false })}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold"
                    >
                        Rejeitar
                    </button>
                    <button
                        onClick={() => setShowConfig(!showConfig)}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold"
                    >
                        Configurar
                    </button>
                    <button
                        onClick={() => savePrefs({ status: 'custom', analytics: analyticsOptIn })}
                        className="px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-orange-600"
                    >
                        Aceitar Tudo
                    </button>
                </div>
            </div>
        </div>
    );
}
