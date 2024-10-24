document.getElementById('searchButton').addEventListener('click', async () => {
    const cepInput = document.getElementById('cepInput').value;
    const resultArea = document.getElementById('result');
    
    // Validação do CEP
    if (!/^\d{5}-?\d{3}$/.test(cepInput)) {
        resultArea.textContent = 'Por favor, digite um CEP válido (8 dígitos).';
        return;
    }
    
    const formattedCep = cepInput.replace('-', ''); //Isso ignora os simbolos de separação 

    try {
        const response = await fetch(`https://viacep.com.br/ws/${formattedCep}/json/`);
        
        if (!response.ok) {
            throw new Error('Erro ao consultar o CEP.');
        }
        
        const data = await response.json();

        //Isso daqui é para dizer se o cep foi encontrado ou não
        if (data.erro) { //Aqui o cep não foiu encontrado
            resultArea.textContent = 'CEP não encontrado.';
        } else { //Se for encontrado, ele exibe as informações
            resultArea.innerHTML = `
                <p><strong>Endereço:</strong> ${data.logradouro}</p>
                <p><strong>Bairro:</strong> ${data.bairro}</p>
                <p><strong>Cidade:</strong> ${data.localidade}</p>
                <p><strong>UF:</strong> ${data.uf}</p>
            `;
        }
    } catch (error) {
        resultArea.textContent = error.message;
    }
});
