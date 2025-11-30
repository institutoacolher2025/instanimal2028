export function PrivacyPolicy() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-16 text-gray-800 space-y-8">
            <header className="space-y-2">
                <p className="text-sm text-primary font-semibold uppercase">LGPD</p>
                <h1 className="text-3xl font-bold text-gray-900">Política de Privacidade</h1>
                <p className="text-gray-600">Transparência e conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).</p>
            </header>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-gray-900">1. Quem somos</h2>
                <p>
                    Somos o Instituto Acolher, uma OSCIP dedicada ao resgate, reabilitação e adoção responsável de animais. Tratamos dados pessoais com base na LGPD.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-gray-900">2. Quais dados coletamos</h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>Dados de identificação e contato: nome, e-mail, telefone, CPF (quando necessário).</li>
                    <li>Dados para Processamento de Doações: valor, meio de pagamento, CPF para emissão de recibos.</li>
                    <li>Dados para Contato de Adoção: informações do adotante para análise de perfil e assinatura de termo.</li>
                    <li>Dados para Newsletter: e-mail para envio de campanhas e atualizações.</li>
                    <li>Dados de navegação: cookies essenciais e analíticos (quando consentidos).</li>
                </ul>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-gray-900">3. Finalidades do tratamento</h2>
                <p>Usamos os dados para:</p>
                <ul className="list-disc list-inside space-y-1">
                    <li>Processar doações e prestar contas.</li>
                    <li>Gerir solicitações de adoção, apadrinhamento e voluntariado.</li>
                    <li>Enviar comunicações institucionais, campanhas e newsletter (quando autorizado).</li>
                    <li>Cumprir obrigações legais, fiscais e regulatórias.</li>
                </ul>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-gray-900">4. Compartilhamento</h2>
                <p>
                    Não vendemos dados a terceiros. Compartilhamos apenas com parceiros de pagamento, contabilidade, autoridades ou órgãos de fiscalização, quando necessário ou exigido por lei.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-gray-900">5. Base legal</h2>
                <p>Tratamos dados com fundamento em: consentimento; execução de contrato ou procedimentos preliminares (adoção/doação); cumprimento de obrigação legal; legítimo interesse do Instituto para finalidades institucionais, sempre respeitando direitos e liberdades do titular.</p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-gray-900">6. Retenção e segurança</h2>
                <p>
                    Guardamos dados somente pelo tempo necessário às finalidades ou exigido por lei. Adotamos controles técnicos e administrativos para proteger contra acesso não autorizado, perda, alteração ou divulgação indevida.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-gray-900">7. Seus Direitos</h2>
                <p>Nos termos da LGPD, você pode solicitar:</p>
                <ul className="list-disc list-inside space-y-1">
                    <li>Confirmação de tratamento e acesso aos dados.</li>
                    <li>Correção de dados incompletos, inexatos ou desatualizados.</li>
                    <li>Anonimização, bloqueio ou eliminação de dados desnecessários.</li>
                    <li>Portabilidade e informação sobre compartilhamentos.</li>
                    <li>Revogação do consentimento e oposição ao tratamento, quando aplicável.</li>
                </ul>
                <p className="text-sm text-gray-700">
                    Para exercer seus direitos ou solicitar exclusão dos seus dados, envie um e-mail para{' '}
                    <a href="mailto:privacidade@isa.org" className="text-primary font-semibold hover:text-orange-700">
                        privacidade@isa.org
                    </a>.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-gray-900">8. Cookies</h2>
                <p>
                    Usamos cookies essenciais para funcionamento do site e cookies analíticos apenas com seu consentimento. Você pode revisar ou atualizar sua escolha na barra de cookies e no seu navegador.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-gray-900">9. Contato do Encarregado (DPO)</h2>
                <p>
                    E-mail: privacidade@isa.org<br />
                    Assunto: “Privacidade de Dados”
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-gray-900">10. Atualizações</h2>
                <p>
                    Esta política pode ser atualizada. A data da última revisão será sempre informada.
                </p>
            </section>
        </div>
    );
}
