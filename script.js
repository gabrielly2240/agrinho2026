function calcular() {
    // 1. Pegar os valores dos inputs
    const combustivel = document.getElementById('combustivel').value;
    const consumo = parseFloat(document.getElementById('consumo').value);
    const horas = parseFloat(document.getElementById('horas').value);

    // Validação simples para não calcular com campos vazios
    if (isNaN(consumo) || isNaN(horas) || consumo <= 0 || horas <= 0) {
        alert("Por favor, insira valores válidos para o consumo e as horas trabalhadas.");
        return;
    }

    // 2. Definir o fator de emissão
    let fatorEmissao = 2.68; // Diesel comum
    if (combustivel === 'biodiesel') {
        fatorEmissao = 0.50; // Biodiesel
    }

    // 3. Realizar as contas
    // Total Litros = Consumo por hora * total de horas
    const totalLitros = consumo * horas;
    // Total CO2 = Total Litros * Fator de Emissão
    const totalCO2 = totalLitros * fatorEmissao;
    // Estimativa: 1 árvore absorve cerca de 15kg de CO2 por ano
    const arvoresNecessarias = Math.ceil(totalCO2 / 15);

    // 4. Mostrar os resultados no HTML
    document.getElementById('emissaoTexto').innerHTML = `Sua operação emitiu aproximadamente <strong>${totalCO2.toFixed(2)} kg de CO₂</strong> na atmosfera.`;
    document.getElementById('arvoresTexto').innerHTML = `Para compensar essa emissão, você precisaria plantar cerca de <strong>${arvoresNecessarias} árvore(s)</strong> e mantê-la(s) viva(s) por um ano.`;

    // 5. Gerar as dicas personalizadas de prevenção
    gerarDicas(combustivel);

    // 6. Revelar a área de resultado tirando a classe 'hidden'
    document.getElementById('resultado').classList.remove('hidden');
}

function gerarDicas(tipoCombustivel) {
    const listaDicas = document.getElementById('listaDicas');
    listaDicas.innerHTML = ""; // Limpa as dicas anteriores

    // Dicas gerais que servem para qualquer situação
    const dicasGerais = [
        "<strong>Manutenção Preventiva:</strong> Mantenha os filtros de ar e de combustível do trator limpos. Motores desregulados gastam até 15% mais combustível.",
        "<strong>Pressão dos Pneus:</strong> Calibre os pneus das máquinas regularmente. Pneus murchos aumentam o esforço do motor e o consumo de combustível.",
        "<strong>Planejamento de Rotas:</strong> Planeje o caminhamento na lavoura para evitar manobras desnecessárias e reduzir o tempo do motor ligado em marcha lenta.",
        "<strong>Agricultura de Precisão:</strong> Se possível, utilize guias de GPS para evitar a sobreposição de passadas do trator na mesma área."
    ];

    // Dica específica baseada na escolha do combustível
    if (tipoCombustivel === 'diesel') {
        dicasGerais.unshift("<strong>Transição Energética:</strong> Considere misturar uma porcentagem maior de biodiesel ou migrar totalmente para ele para reduzir drasticamente sua pegada de carbono.");
    } else {
        dicasGerais.unshift("<strong>Parabéns!</strong> Você já utiliza Biodiesel, o que reduz o impacto ambiental. Continue incentivando a produção local de biocombustíveis.");
    }

    // Inserir as dicas como itens de lista (<li>) no HTML
    dicasGerais.forEach(dica => {
        const li = document.createElement('li');
        li.innerHTML = dica;
        listaDicas.appendChild(li);
    });
}