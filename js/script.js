/* JavaScript para o EnglishTips */

// Função para scroll suave até uma seção
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Função para mostrar modal "Em breve"
function showComingSoon(tipo) {
    const modal = document.getElementById('modal');
    const title = document.getElementById('modal-title');
    const text = document.getElementById('modal-text');
    
    title.innerHTML = `<i class="fas fa-clock"></i> ${tipo.charAt(0).toUpperCase() + tipo.slice(1)} em Breve!`;
    
    let content = '';
    switch(tipo) {
        case 'vídeos':
            content = 'Estamos trabalhando para trazer vídeos educativos incríveis, produzidos por alunos para alunos. Em breve você poderá assistir a conteúdos dinâmicos e divertidos que vão revolucionar seu aprendizado de inglês!';
            break;
        case 'exercícios':
            content = 'Exercícios práticos e desafiadores estão sendo desenvolvidos para você fixar todo o conteúdo aprendido. Exercícios interativos que vão testar e aprimorar suas habilidades no inglês!';
            break;
        case 'artigos':
            content = 'Artigos informativos e envolventes estão sendo desenvolvidos para aprofundar seus conhecimentos. Conteúdo de qualidade com linguagem simples e atual!';
            break;
    }
    
    text.textContent = content;
    modal.style.display = 'block';
    
    // Adiciona animação de entrada
    setTimeout(() => {
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
    }, 10);
}

// Função para mostrar informações
function showInfo() {
    const modal = document.getElementById('modal');
    const title = document.getElementById('modal-title');
    const text = document.getElementById('modal-text');
    
    title.innerHTML = '<i class="fas fa-info-circle"></i> Mais Informações';
    text.textContent = 'O EnglishTips foi um projeto acadêmico inovador que buscou democratizar o ensino de inglês através da tecnologia. Desenvolvido com foco na colaboração entre estudantes e professores, o projeto serviu como modelo para futuras iniciativas educacionais.';
    
    modal.style.display = 'block';
}

// Função para mostrar contato
function showContact() {
    const modal = document.getElementById('modal');
    const title = document.getElementById('modal-title');
    const text = document.getElementById('modal-text');
    
    title.innerHTML = '<i class="fas fa-envelope"></i> Contato';
    text.textContent = 'Para mais informações sobre o projeto EnglishTips entre em contato através dos canais oficiais da instituição de ensino.';
    
    modal.style.display = 'block';
}

// Função para fechar modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Fechar modal clicando fora dele
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
}

// Fechar modal com tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Animação dos números das estatísticas
function animateStats() {
    const statItems = document.querySelectorAll('.stat-item h3');
    
    statItems.forEach(item => {
        const finalValue = parseInt(item.textContent);
        const increment = finalValue / 50; // Divide em 50 passos
        let currentValue = 0;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                item.textContent = finalValue + '+';
                clearInterval(timer);
            } else {
                item.textContent = Math.floor(currentValue) + '+';
            }
        }, 30);
    });
}

// Observador para animar estatísticas quando entram na tela
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('stats')) {
            animateStats();
            observer.unobserve(entry.target); // Para não repetir a animação
        }
    });
}, observerOptions);

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('EnglishTips carregado com sucesso!');
    
    // Observa a seção de estatísticas
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // Adiciona efeito de hover nos cards
    const cards = document.querySelectorAll('.video-section, .exercise-section, .article-section, .feature');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Função para adicionar efeito de parallax no header
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('header');
    
    if (header) {
        header.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Função para mostrar/ocultar botão de voltar ao topo
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #4CAF50;
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
    `;
    
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 6px 16px rgba(76, 175, 80, 0.4)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 12px rgba(76, 175, 80, 0.3)';
    });
    
    document.body.appendChild(button);
    
    // Mostrar/ocultar botão baseado no scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });
}

// Criar botão de voltar ao topo quando a página carregar
document.addEventListener('DOMContentLoaded', createBackToTopButton);



// Firebase configuration e autenticação
let auth = null;
let currentUser = null;

// Inicializar Firebase quando disponível
function initializeFirebaseAuth() {
    // Configuração do Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyBDaH8cP64hX0gq1d_RhuNfJdFHUdUtCI0",
        authDomain: "englishtips-3a51f.firebaseapp.com",
        projectId: "englishtips-3a51f",
        storageBucket: "englishtips-3a51f.firebasestorage.app",
        messagingSenderId: "104772353202",
        appId: "1:104772353202:web:7630d36ad2ed85d682ddab",
        measurementId: "G-8XJFB5LL92"
    };

    // Carregar Firebase dinamicamente
    import('https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js')
        .then(({ initializeApp }) => {
            const app = initializeApp(firebaseConfig);
            
            return import('https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js');
        })
        .then(({ getAuth, onAuthStateChanged, signOut }) => {
            auth = getAuth();
            
            // Monitorar estado de autenticação
            onAuthStateChanged(auth, (user) => {
                currentUser = user;
                updateAuthUI(user);
            });
            
            // Tornar signOut disponível globalmente
            window.handleLogout = async function() {
                try {
                    await signOut(auth);
                    localStorage.removeItem('englishTipsRememberMe');
                    updateAuthUI(null);
                } catch (error) {
                    console.error('Erro no logout:', error);
                    alert('Erro ao fazer logout. Tente novamente.');
                }
            };
        })
        .catch(error => {
            console.error('Erro ao carregar Firebase:', error);
        });
}

// Atualizar interface baseada no estado de autenticação
function updateAuthUI(user) {
    const authButtons = document.getElementById('authButtons');
    const userMenu = document.getElementById('userMenu');
    const userName = document.getElementById('userName');
    
    if (user) {
        // Usuário logado
        if (authButtons) authButtons.style.display = 'none';
        if (userMenu) {
            userMenu.style.display = 'block';
            if (userName) {
                userName.textContent = user.displayName || user.email.split('@')[0];
            }
        }
        
        // Atualizar placeholders para usuários logados
        updateContentForLoggedUser();
    } else {
        // Usuário não logado
        if (authButtons) authButtons.style.display = 'flex';
        if (userMenu) userMenu.style.display = 'none';
        
        // Restaurar placeholders originais
        updateContentForGuestUser();
    }
}

// Atualizar conteúdo para usuário logado
function updateContentForLoggedUser() {
    const videoPlaceholder = document.querySelector('.video-placeholder p');
    const exercisePlaceholder = document.querySelector('.exercise-placeholder p');
    const articlePlaceholder = document.querySelector('.article-placeholder p');
    
    if (videoPlaceholder) {
        videoPlaceholder.textContent = 'Acesse seus vídeos personalizados!';
    }
    if (exercisePlaceholder) {
        exercisePlaceholder.textContent = 'Continue seus exercícios!';
    }
    if (articlePlaceholder) {
        articlePlaceholder.textContent = 'Leia artigos recomendados para você!';
    }
}

// Atualizar conteúdo para usuário visitante
function updateContentForGuestUser() {
    const videoPlaceholder = document.querySelector('.video-placeholder p');
    const exercisePlaceholder = document.querySelector('.exercise-placeholder p');
    const articlePlaceholder = document.querySelector('.article-placeholder p');
    
    if (videoPlaceholder) {
        videoPlaceholder.textContent = 'Em breve, vídeos incríveis!';
    }
    if (exercisePlaceholder) {
        exercisePlaceholder.textContent = 'Em breve, exercícios desafiadores!';
    }
    if (articlePlaceholder) {
        articlePlaceholder.textContent = 'Em breve, artigos interessantes!';
    }
}

// Modificar função showComingSoon para usuários logados
const originalShowComingSoon = window.showComingSoon || showComingSoon;

function showComingSoon(tipo) {
    if (currentUser) {
        // Usuário logado - redirecionar para dashboard
        window.location.href = 'dashboard.html';
        return;
    }
    
    // Usuário não logado - mostrar modal original
    if (originalShowComingSoon) {
        originalShowComingSoon(tipo);
    }
}

// Sobrescrever função global
window.showComingSoon = showComingSoon;

// Inicializar autenticação quando DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Aguardar um pouco para garantir que outros scripts carregaram
    setTimeout(initializeFirebaseAuth, 100);
});

