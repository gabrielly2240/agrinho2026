function calcular() {
    // Pegar os valores dos campos
    const tipoCombustivel = document.getElementById('combustivel').value;
    const consumoPorHora = parseFloat(document.getElementById('consumo').value);
    const horasTrabalhadas = parseFloat(document.getElementById('horas').value);

    if (isNaN(horasTrabalhadas) || horasTrabalhadas <= 0) {
        alert("Por favor, insira uma quantidade de horas válida.");
        return;
    }

    // Definir fator de emissão (kg de CO2 por litro)
    const fatorEmissao = (tipoCombustivel === 'diesel') ? 2.68 : 0.50;

    // Lógica: Litros totais * fator de emissão
    const totalLitros = consumoPorHora * horasTrabalhadas;
    const emissaoTotal = totalLitros * fatorEmissao;

    // Lógica de árvores: Total de CO2 / 150 (média de absorção de uma árvore jovem)
    const arvoresNecessarias = Math.ceil(emissaoTotal / 150);

    // Exibir resultados
    const divResultado = document.getElementById('resultado');
    divResultado.classList.remove('hidden');

    document.getElementById('emissaoTexto').innerHTML = 
        `💨 <strong>Emissão Total:</strong> ${emissaoTotal.toFixed(2)} kg de CO₂`;
    
    document.getElementById('arvoresTexto').innerHTML = 
        `🌳 <strong>Compensação:</strong> Você precisaria plantar <strong>${arvoresNecessarias}</strong> árvore(s) para neutralizar esse impacto.`;
}