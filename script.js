function calcularDesafio() {
    const combustivel = document.getElementById('combustivel').value;
    const consumo = parseFloat(document.getElementById('consumo').value);
    const horas = parseFloat(document.getElementById('horas').value);

    if (isNaN(consumo) || isNaN(horas) || consumo <= 0 || horas <= 0) {
        alert("Por favor, preencha os campos corretamente para iniciar o desafio.");
        return;
    }

    // Cálculos básicos
    const fatorEmissao = combustivel === 'biodiesel' ? 0.50 : 2.68;
    const totalCO2 = consumo * horas * fatorEmissao;
    const arvoresNecessarias = Math.ceil(totalCO2 / 15);

    // Exibe os dados brutos
    document.getElementById('emissaoTexto').innerHTML = `💨 <strong>Pegada de Carbono:</strong> ${totalCO2.toFixed(1)} kg de CO₂ jogados na atmosfera.`;
    document.getElementById('arvoresTexto').innerHTML = `🌳 <strong>Desafio do Plantio:</strong> Você precisa de pelo menos <strong>${arvoresNecessarias} árvore(s)</strong> crescendo por um ano para anular esse impacto.`;

    // Sistema de Rank / Gamificação
    definirRankEcolgico(totalCO2, combustivel);

    document.getElementById('resultado').classList.remove('hidden');
}

function definirRankEcolgico(co2, combustivel) {
    const badge = document.getElementById('badgeNota');
    const statusMsg = document.getElementById('statusMensagem');
    const listaDicas = document.getElementById('listaDicas');
    
    listaDicas.innerHTML = ""; // Limpa missões anteriores
    let missoes = [];

    // Lógica de classificação baseada na quantidade de CO2 emitido
    if (co2 < 200) {
        badge.innerText = "A";
        badge.className = "badge nota-a";
        statusMsg.innerHTML = "🏆 <strong>Guardião da Terra!</strong> Seu impacto é super baixo. Você está protegendo o solo e o futuro!";
        missoes = [
            "<strong>Missão Compartilhar:</strong> Ensine seus vizinhos sobre as vantagens de monitorar o gasto de combustível.",
            "<strong>Próximo Nível:</strong> Que tal zerar totalmente instalando painéis solares para carregar pequenas ferramentas elétricas na fazenda?"
        ];
    } else if (co2 >= 200 && co2 <= 1000) {
        badge.innerText = "C";
        badge.className = "badge nota-c";
        statusMsg.innerHTML = "🌱 <strong>Produtor Consciente.</strong> Você está no caminho certo, mas sua máquina ainda pode ser mais eficiente.";
        missoes = [
            "<strong>Missão Pressão Certa:</strong> Calibrar os pneus do trator toda semana reduz o consumo em até 4%. Complete essa missão!",
            "<strong>Missão Upgrade:</strong> Na próxima compra, planeje a transição para misturas maiores de Biodiesel."
        ];
    } else {
        badge.innerText = "E";
        badge.className = "badge nota-e";
        statusMsg.innerHTML = "⚠️ <strong>Alerta Ecológico!</strong> Suas emissões estão altas. A natureza precisa de ajuda para compensar esse gasto.";
        missoes = [
            "<strong>Missão Urgente - Manutenção:</strong> Filtros de ar sujos sufocam o motor e disparam o consumo. Troque-os imediatamente!",
            "<strong>Missão Rotas Inteligentes:</strong> Use aplicativos ou GPS agrícolas para planejar trajetos mais curtos na lavoura e evitar o motor ligado à toa.",
            "<strong>Missão Reflorestamento:</strong> Comece a plantar árvores nas Áreas de Preservação Permanente (APP) da sua propriedade para ontem."
        ];
    }

    // Se ele usa diesel comum, adiciona uma missão extra pesada
    if (combustivel === 'diesel') {
        missoes.push("<strong>Missão Combustível Verde:</strong> Substitua o Diesel comum pelo Biodiesel para cortar suas emissões em mais de 70% de uma vez só.");
    }

    // Adiciona as missões na tela
    missoes.forEach(missao => {
        const li = document.createElement('li');
        li.innerHTML = `🔹 ${missao}`;
        listaDicas.appendChild(li);
    });
}