// pet.js - JavaScript aprimorado para o site de adoção de pets

document.addEventListener('DOMContentLoaded', function() {
    // Dados iniciais dos animais (pode ser carregado do localStorage)
    let animais = JSON.parse(localStorage.getItem('animais')) || [
        {
            id: 1,
            nome: 'Pretia',
            idade: '4 anos',
            porte: 'Porte médio',
            descricao: 'Pretia é um pé duro muito brincalhona que adora crianças. Foi resgatado das ruas e está pronto para uma família amorosa.',
            imagem: '../img/pretia.jpg',
            comentarios: [],
            avaliacoes: []
        },
        {
            id: 2,
            nome: 'Duque',
            idade: '5 anos',
            porte: 'Porte grande',
            descricao: 'Duque é uma vira-lata carinhoso que se dá bem com outros animais. Ideal para apartamentos.',
            imagem: '../img/duque.jpg',
            comentarios: [],
            avaliacoes: []
        },
        {
            id: 3,
            nome: 'Quadrada',
            idade: '1 ano',
            porte: 'Porte grande',
            descricao: 'Quadrada é uma Gata marginal e energética que precisa de espaço para correr. Ótima gata consoladora e companheirona.',
            imagem: '../img/quadrado.jpg',
            comentarios: [],
            avaliacoes: []
        }
    ];

    // Função para salvar animais no localStorage
    function salvarAnimais() {
        localStorage.setItem('animais', JSON.stringify(animais));
    }

    // Função para renderizar todos os animais na página
    function renderizarAnimais() {
        const dogsGrid = document.querySelector('.dogs-grid');
        dogsGrid.innerHTML = ''; // Limpar grid antes de renderizar

        animais.forEach(animal => {
            const dogCard = document.createElement('div');
            dogCard.className = 'dog-card';
            dogCard.setAttribute('data-id', animal.id);

            // Calcular média de avaliações
            const mediaAvaliacoes = calcularMediaAvaliacoes(animal.avaliacoes);

            dogCard.innerHTML = `
                <img src="${animal.imagem}" alt="${animal.nome}" class="dog-img">
                <div class="dog-info">
                    <h3 class="dog-name">${animal.nome}</h3>
                    <p class="dog-details">${animal.idade}, ${animal.porte}</p>
                    <p>${animal.descricao}</p>
                    <a href="#processo" class="btn" style="display: block; text-align: center; margin-top: 15px;">Quero Adotar</a>
                    <div class="admin-buttons" style="margin-top: 10px;">
                        <button class="btn edit-btn">Editar</button>
                        <button class="btn delete-btn">Excluir</button>
                    </div>
                </div>
                <div class="comments-section">
                    <h4>Avaliações e Comentários</h4>
                    <div class="rating-display">
                        <span class="stars" id="stars-display-${animal.id}">${gerarEstrelas(mediaAvaliacoes)}</span>
                        <span class="rating-text" id="rating-text-${animal.id}">(${mediaAvaliacoes.toFixed(1)} de 5 estrelas, ${animal.avaliacoes.length} avaliações)</span>
                    </div>
                    <form class="comment-form" data-animal-id="${animal.id}">
                        <div class="form-group">
                            <label for="comment-name-${animal.id}">Seu Nome (opcional):</label>
                            <input type="text" id="comment-name-${animal.id}" placeholder="Anônimo">
                        </div>
                        <div class="form-group">
                            <label>Avaliação:</label>
                            <div class="stars-input" id="stars-input-${animal.id}">
                                <span class="star" data-value="1">★</span>
                                <span class="star" data-value="2">★</span>
                                <span class="star" data-value="3">★</span>
                                <span class="star" data-value="4">★</span>
                                <span class="star" data-value="5">★</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="comment-text-${animal.id}">Comentário:</label>
                            <textarea id="comment-text-${animal.id}" rows="3" placeholder="Deixe seu comentário..." required></textarea>
                        </div>
                        <button type="submit" class="btn">Enviar Comentário</button>
                    </form>
                    <div class="comments-list" id="comments-list-${animal.id}">
                        ${renderizarComentarios(animal.comentarios)}
                    </div>
                </div>
            `;

            dogsGrid.appendChild(dogCard);
        });

        // Adicionar event listeners após renderizar
        adicionarEventListeners();
    }

    // Função para gerar estrelas baseadas na média
    function gerarEstrelas(media) {
        let estrelas = '';
        for (let i = 1; i <= 5; i++) {
            estrelas += i <= Math.floor(media) ? '★' : '☆';
        }
        return estrelas;
    }

    // Função para calcular média das avaliações
    function calcularMediaAvaliacoes(avaliacoes) {
        if (avaliacoes.length === 0) return 0;
        const soma = avaliacoes.reduce((acc, val) => acc + val, 0);
        return soma / avaliacoes.length;
    }

    // Função para renderizar comentários
    function renderizarComentarios(comentarios) {
        return comentarios.map(comentario => `
            <div class="comment-item">
                <div>
                    <span class="comment-author">${comentario.nome || 'Anônimo'}</span>
                    <span class="comment-rating">${gerarEstrelas(comentario.avaliacao)}</span>
                </div>
                <div class="comment-text">${comentario.texto}</div>
            </div>
        `).join('');
    }

    // Função para adicionar todos os event listeners
    function adicionarEventListeners() {
        // Formulário de adoção
        const formAdocao = document.getElementById('form-adocao');
        if (formAdocao) {
            formAdocao.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Obrigado pelo seu interesse! Entraremos em contato em breve para continuar o processo de adoção.');
                this.reset();
            });
        }

        // Smooth scrolling para links do menu
        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 20,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Busca de animais
        const btnPesquisar = document.getElementById('bt');
        if (btnPesquisar) {
            btnPesquisar.addEventListener('click', function() {
                const query = document.getElementById('pes').value.toLowerCase().trim();
                const filteredAnimais = animais.filter(animal =>
                    animal.nome.toLowerCase().includes(query) ||
                    animal.descricao.toLowerCase().includes(query)
                );
                renderizarAnimaisFiltrados(filteredAnimais);
            });
        }

        // Botão adicionar animal (abrir modal)
        const btnAdicionar = document.getElementById('bt2');
        const modalCadastro = document.getElementById('modalCadastro');
        if (btnAdicionar && modalCadastro) {
            btnAdicionar.addEventListener('click', function() {
                modalCadastro.style.display = 'block';
            });
        }

        // Link "Adicionar Animal" no menu (novo)
        const addAnimalLink = document.getElementById('add-animal-link');
        if (addAnimalLink && modalCadastro) {
            addAnimalLink.addEventListener('click', function(e) {
                e.preventDefault(); // Previne o comportamento padrão do link
                modalCadastro.style.display = 'block';
            });
        }

        // Fechar modal de cadastro
        const fecharModalCadastro = document.getElementById('fecharModal');
        if (fecharModalCadastro) {
            fecharModalCadastro.addEventListener('click', function() {
                modalCadastro.style.display = 'none';
                document.getElementById('formCadastroAnimal').reset();
            });
        }

        // Fechar modal ao clicar fora
        window.addEventListener('click', function(event) {
            if (event.target === modalCadastro) {
                modalCadastro.style.display = 'none';
                document.getElementById('formCadastroAnimal').reset();
            }
        });

        // Formulário de cadastro de animal
        const formCadastro = document.getElementById('formCadastroAnimal');
        if (formCadastro) {
            formCadastro.addEventListener('submit', function(e) {
                e.preventDefault();
                const novoAnimal = {
                    id: Date.now(), // ID único baseado em timestamp
                    nome: document.getElementById('nomeAnimal').value.trim(),
                    idade: document.getElementById('idadeAnimal').value.trim(),
                    porte: document.getElementById('porteAnimal').value.trim(),
                    descricao: document.getElementById('descricaoAnimal').value.trim(),
                    imagem: document.getElementById('imagemAnimal').value.trim(),
                    comentarios: [],
                    avaliacoes: []
                };

                // Validação básica
                if (!novoAnimal.nome || !novoAnimal.imagem) {
                    alert('Nome e URL da imagem são obrigatórios.');
                    return;
                }

                animais.push(novoAnimal);
                salvarAnimais();
                renderizarAnimais();
                modalCadastro.style.display = 'none';
                formCadastro.reset();
                alert(`Animal "${novoAnimal.nome}" cadastrado com sucesso!`);
            });
        }

        // Botões de editar
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.closest('.dog-card').getAttribute('data-id'));
                const animal = animais.find(a => a.id === id);
                if (!animal) return;

                // Preencher modal de edição
                document.getElementById('editId').value = animal.id;
                document.getElementById('editNomeAnimal').value = animal.nome;
                document.getElementById('editIdadeAnimal').value = animal.idade;
                document.getElementById('editPorteAnimal').value = animal.porte;
                document.getElementById('editDescricaoAnimal').value = animal.descricao;
                document.getElementById('editImagemAnimal').value = animal.imagem;

                document.getElementById('modalEdicao').style.display = 'block';
            });
        });

        // Botões de excluir
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.closest('.dog-card').getAttribute('data-id'));
                if (confirm('Tem certeza que deseja excluir este animal?')) {
                    animais = animais.filter(a => a.id !== id);
                    salvarAnimais();
                    renderizarAnimais();
                }
            });
        });

        // Fechar modal de edição
        const fecharModalEdicao = document.getElementById('fecharModalEdicao');
        const modalEdicao = document.getElementById('modalEdicao');
        if (fecharModalEdicao) {
            fecharModalEdicao.addEventListener('click', function() {
                modalEdicao.style.display = 'none';
            });
        }

        // Fechar modal de edição ao clicar fora
        window.addEventListener('click', function(event) {
            if (event.target === modalEdicao) {
                modalEdicao.style.display = 'none';
            }
        });

        // Formulário de edição
        const formEdicao = document.getElementById('formEdicaoAnimal');
        if (formEdicao) {
            formEdicao.addEventListener('submit', function(e) {
                e.preventDefault();
                const id = parseInt(document.getElementById('editId').value);
                const animal = animais.find(a => a.id === id);
                if (!animal) return;

                animal.nome = document.getElementById('editNomeAnimal').value.trim();
                animal.idade = document.getElementById('editIdadeAnimal').value.trim();
                animal.porte = document.getElementById('editPorteAnimal').value.trim();
                animal.descricao = document.getElementById('editDescricaoAnimal').value.trim();
                animal.imagem = document.getElementById('editImagemAnimal').value.trim();

                salvarAnimais();
                renderizarAnimais();
                modalEdicao.style.display = 'none';
                alert('Animal editado com sucesso!');
            });
        }

        // Formulários de comentários
        document.querySelectorAll('.comment-form').forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const animalId = parseInt(this.getAttribute('data-animal-id'));
                const animal = animais.find(a => a.id === animalId);
                if (!animal) return;

                const nome = document.getElementById(`comment-name-${animalId}`).value.trim() || 'Anônimo';
                const texto = document.getElementById(`comment-text-${animalId}`).value.trim();
                const estrelasSelecionadas = this.querySelectorAll('.star.selected');
                const avaliacao = estrelasSelecionadas.length > 0 ? parseInt(estrelasSelecionadas[estrelasSelecionadas.length - 1].getAttribute('data-value')) : 0;

                if (!texto || avaliacao === 0) {
                    alert('Por favor, selecione uma avaliação e escreva um comentário.');
                    return;
                }

                animal.comentarios.push({ nome, texto, avaliacao });
                animal.avaliacoes.push(avaliacao);
                salvarAnimais();
                renderizarAnimais();
            });
        });

        // Seleção de estrelas nos formulários de comentário
        document.querySelectorAll('.stars-input').forEach(starsInput => {
            const stars = starsInput.querySelectorAll('.star');
            stars.forEach(star => {
                star.addEventListener('click', function() {
                    const value = parseInt(this.getAttribute('data-value'));
                    stars.forEach(s => s.classList.remove('selected'));
                    for (let i = 0; i < value; i++) {
                        stars[i].classList.add('selected');
                    }
                });
            });
        });
    }

    // Função para renderizar animais filtrados (para busca)
    function renderizarAnimaisFiltrados(filteredAnimais) {
        const dogsGrid = document.querySelector('.dogs-grid');
        dogsGrid.innerHTML = '';

        filteredAnimais.forEach(animal => {
            // Mesmo código de renderizarAnimais para consistência
            const dogCard = document.createElement('div');
            dogCard.className = 'dog-card';
            dogCard.setAttribute('data-id', animal.id);

            const mediaAvaliacoes = calcularMediaAvaliacoes(animal.avaliacoes);

            dogCard.innerHTML = `
                <img src="${animal.imagem}" alt="${animal.nome}" class="dog-img">
                <div class="dog-info">
                    <h3 class="dog-name">${animal.nome}</h3>
                    <p class="dog-details">${animal.idade}, ${animal.porte}</p>
                    <p>${animal.descricao}</p>
                    <a href="#processo" class="btn" style="display: block; text-align: center; margin-top: 15px;">Quero Adotar</a>
                    <div class="admin-buttons" style="margin-top: 10px;">
                        <button class="btn edit-btn">Editar</button>
                        <button class="btn delete-btn">Excluir</button>
                    </div>
                </div>
                <div class="comments-section">
                    <h4>Avaliações e Comentários</h4>
                    <div class="rating-display">
                        <span class="stars" id="stars-display-${animal.id}">${gerarEstrelas(mediaAvaliacoes)}</span>
                        <span class="rating-text" id="rating-text-${animal.id}">(${mediaAvaliacoes.toFixed(1)} de 5 estrelas, ${animal.avaliacoes.length} avaliações)</span>
                    </div>
                    <form class="comment-form" data-animal-id="${animal.id}">
                        <div class="form-group">
                            <label for="comment-name-${animal.id}">Seu Nome (opcional):</label>
                            <input type="text" id="comment-name-${animal.id}" placeholder="Anônimo">
                        </div>
                        <div class="form-group">
                            <label>Avaliação:</label>
                            <div class="stars-input" id="stars-input-${animal.id}">
                                <span class="star" data-value="1">★</span>
                                <span class="star" data-value="2">★</span>
                                <span class="star" data-value="3">★</span>
                                <span class="star" data-value="4">★</span>
                                <span class="star" data-value="5">★</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="comment-text-${animal.id}">Comentário:</label>
                            <textarea id="comment-text-${animal.id}" rows="3" placeholder="Deixe seu comentário..." required></textarea>
                        </div>
                        <button type="submit" class="btn">Enviar Comentário</button>
                    </form>
                    <div class="comments-list" id="comments-list-${animal.id}">
                        ${renderizarComentarios(animal.comentarios)}
                    </div>
                </div>
            `;

            dogsGrid.appendChild(dogCard);
        });

        adicionarEventListeners(); // Re-adicionar listeners após renderizar filtrados
    }

    // Inicializar a página renderizando os animais
    renderizarAnimais();
});



