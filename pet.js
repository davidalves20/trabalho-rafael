  // JavaScript simples para o formulário
        document.getElementById('form-adocao').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Obrigado pelo seu interesse! Entraremos em contato em breve para continuar o processo de adoção.');
            this.reset();
        });
        
        // Smooth scrolling para os links do menu
        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
            });
        });

                // Função para buscar animais pelo nome no input
        function buscarAnimal() {
            const query = document.getElementById('pes').value.toLowerCase();
            const dogCards = document.querySelectorAll('.dog-card');
            dogCards.forEach(card => {
                const nome = card.querySelector('.dog-name').textContent.toLowerCase();
                if (nome.includes(query)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
        // Evento do botão pesquisar
        document.getElementById('bt').addEventListener('click', buscarAnimal);
                // Opcional: busca ao digitar no input (sem precisar clicar no botão)
                // document.getElementById('pes').addEventListener('input', buscarAnimal);
                // Botão adicionar (funcionalidade futura)
        document.getElementById('bt2').addEventListener('click', function() {
                    alert('Função de adicionar ainda não implementada.');
                });

        
        // Referências do modal e botões
const modal = document.getElementById('modalCadastro');
const btnAbrirModal = document.getElementById('bt2');
const btnFecharModal = document.getElementById('fecharModal');
const formCadastro = document.getElementById('formCadastroAnimal');
const dogsGrid = document.querySelector('.dogs-grid');

// Abrir modal ao clicar em "Adicionar"
btnAbrirModal.addEventListener('click', () => {
    modal.style.display = 'block';
});

// Fechar modal ao clicar no X
btnFecharModal.addEventListener('click', () => {
    modal.style.display = 'none';
    formCadastro.reset();
});

// Fechar modal ao clicar fora do conteúdo
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        formCadastro.reset();
    }
});

// Função para criar um card de animal novo
function criarCardAnimal(nome, idade, porte, descricao, imagemUrl) {
    const card = document.createElement('div');
    card.classList.add('dog-card');

    card.innerHTML = `
        <img src="${imagemUrl}" alt="${nome}" class="dog-img">
        <div class="dog-info">
            <h3 class="dog-name">${nome}</h3>
            <p class="dog-details">${idade}, ${porte}</p>
            <p>${descricao}</p>
            <a href="#adotar-${nome.toLowerCase()}" class="btn" style="display: block; text-align: center; margin-top: 15px;">Quero Adotar</a>
        </div>
    `;

    return card;
}

// Evento submit do formulário de cadastro
formCadastro.addEventListener('submit', (e) => {
    e.preventDefault();

    // Pega valores do formulário
    const nome = document.getElementById('nomeAnimal').value.trim();
    const idade = document.getElementById('idadeAnimal').value.trim();
    const porte = document.getElementById('porteAnimal').value.trim();
    const descricao = document.getElementById('descricaoAnimal').value.trim();
    const imagem = document.getElementById('imagemAnimal').value.trim();

    // Cria o card e adiciona na grid
    const novoCard = criarCardAnimal(nome, idade, porte, descricao, imagem);
    dogsGrid.appendChild(novoCard);

    // Fecha modal e reseta formulário
    modal.style.display = 'none';
    formCadastro.reset();

    // Opcional: mostrar alerta de sucesso
    alert(`Animal "${nome}" cadastrado com sucesso!`);
});