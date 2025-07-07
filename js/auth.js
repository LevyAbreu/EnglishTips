/* JavaScript para autenticação Firebase */

// Elementos do DOM
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const errorText = document.getElementById('errorText');
const successText = document.getElementById('successText');

// Função para mostrar/ocultar senha
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.nextElementSibling;
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Função para mostrar loading
function showLoading() {
    if (loadingSpinner) {
        loadingSpinner.style.display = 'block';
    }
    hideMessages();
}

// Função para esconder loading
function hideLoading() {
    if (loadingSpinner) {
        loadingSpinner.style.display = 'none';
    }
}

// Função para mostrar erro
function showError(message) {
    hideLoading();
    if (errorMessage && errorText) {
        errorText.textContent = message;
        errorMessage.style.display = 'flex';
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Adicionar animação de shake
        errorMessage.classList.add('shake');
        setTimeout(() => {
            errorMessage.classList.remove('shake');
        }, 500);
    }
}

// Função para mostrar sucesso
function showSuccess(message) {
    hideLoading();
    if (successMessage && successText) {
        successText.textContent = message;
        successMessage.style.display = 'flex';
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Função para esconder mensagens
function hideMessages() {
    if (errorMessage) errorMessage.style.display = 'none';
    if (successMessage) successMessage.style.display = 'none';
}

// Função para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Função para validar força da senha
function checkPasswordStrength(password) {
    const strengthIndicator = document.getElementById('passwordStrength');
    if (!strengthIndicator) return;
    
    let strength = 0;
    let message = '';
    let className = '';
    
    if (password.length >= 6) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    
    switch (strength) {
        case 0:
        case 1:
            message = 'Senha muito fraca';
            className = 'strength-weak';
            break;
        case 2:
        case 3:
            message = 'Senha média';
            className = 'strength-medium';
            break;
        case 4:
        case 5:
            message = 'Senha forte';
            className = 'strength-strong';
            break;
    }
    
    strengthIndicator.textContent = message;
    strengthIndicator.className = `password-strength ${className}`;
}

// Função para traduzir erros do Firebase
function translateFirebaseError(errorCode) {
    const errorMessages = {
        'auth/user-not-found': 'Usuário não encontrado. Verifique seu email.',
        'auth/wrong-password': 'Senha incorreta. Tente novamente.',
        'auth/email-already-in-use': 'Este email já está sendo usado por outra conta.',
        'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres.',
        'auth/invalid-email': 'Email inválido. Verifique o formato.',
        'auth/user-disabled': 'Esta conta foi desabilitada.',
        'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.',
        'auth/network-request-failed': 'Erro de conexão. Verifique sua internet.',
        'auth/invalid-credential': 'Credenciais inválidas. Verifique email e senha.',
        'auth/missing-password': 'Por favor, digite sua senha.',
        'auth/missing-email': 'Por favor, digite seu email.'
    };
    
    return errorMessages[errorCode] || 'Erro desconhecido. Tente novamente.';
}

// Função para validar formulário de login
function validateLoginForm(email, password) {
    if (!email || !password) {
        showError('Por favor, preencha todos os campos.');
        return false;
    }
    
    if (!isValidEmail(email)) {
        showError('Por favor, digite um email válido.');
        return false;
    }
    
    return true;
}

// Função para validar formulário de registro
function validateRegisterForm(fullName, email, password, confirmPassword, englishLevel, agreeTerms) {
    if (!fullName || !email || !password || !confirmPassword || !englishLevel) {
        showError('Por favor, preencha todos os campos obrigatórios.');
        return false;
    }
    
    if (fullName.length < 2) {
        showError('Nome deve ter pelo menos 2 caracteres.');
        return false;
    }
    
    if (!isValidEmail(email)) {
        showError('Por favor, digite um email válido.');
        return false;
    }
    
    if (password.length < 6) {
        showError('A senha deve ter pelo menos 6 caracteres.');
        return false;
    }
    
    if (password !== confirmPassword) {
        showError('As senhas não coincidem.');
        return false;
    }
    
    if (!agreeTerms) {
        showError('Você deve concordar com os Termos de Uso.');
        return false;
    }
    
    return true;
}

// Função de login
async function handleLogin(email, password) {
    try {
        showLoading();
        
        const userCredential = await window.signInWithEmailAndPassword(window.auth, email, password);
        const user = userCredential.user;
        
        showSuccess('Login realizado com sucesso! Redirecionando...');
        
        // Salvar preferência de "lembrar de mim"
        const rememberMe = document.getElementById('rememberMe')?.checked;
        if (rememberMe) {
            localStorage.setItem('englishTipsRememberMe', 'true');
        }
        
        // Redirecionar após 2 segundos
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
        
    } catch (error) {
        console.error('Erro no login:', error);
        showError(translateFirebaseError(error.code));
    }
}

// Função de registro
async function handleRegister(fullName, email, password, englishLevel, newsletter) {
    try {
        showLoading();
        
        const userCredential = await window.createUserWithEmailAndPassword(window.auth, email, password);
        const user = userCredential.user;
        
        // Atualizar perfil do usuário
        await window.updateProfile(user, {
            displayName: fullName
        });
        
        // Aqui você poderia salvar dados adicionais no Firestore
        // Por exemplo: nível de inglês, preferência de newsletter, etc.
        
        showSuccess('Conta criada com sucesso! Redirecionando...');
        
        // Redirecionar após 2 segundos
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
        
    } catch (error) {
        console.error('Erro no registro:', error);
        showError(translateFirebaseError(error.code));
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se usuário já está logado
    if (window.auth && window.onAuthStateChanged) {
        window.onAuthStateChanged(window.auth, (user) => {
            if (user && (window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html'))) {
                // Usuário já está logado, redirecionar
                window.location.href = 'dashboard.html';
            }
        });
    }
    
    // Form de login
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            hideMessages();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            
            if (validateLoginForm(email, password)) {
                await handleLogin(email, password);
            }
        });
    }
    
    // Form de registro
    if (registerForm) {
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            hideMessages();
            
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const englishLevel = document.getElementById('englishLevel').value;
            const agreeTerms = document.getElementById('agreeTerms').checked;
            const newsletter = document.getElementById('newsletter').checked;
            
            if (validateRegisterForm(fullName, email, password, confirmPassword, englishLevel, agreeTerms)) {
                await handleRegister(fullName, email, password, englishLevel, newsletter);
            }
        });
        
        // Verificar força da senha em tempo real
        const passwordInput = document.getElementById('password');
        if (passwordInput) {
            passwordInput.addEventListener('input', function() {
                checkPasswordStrength(this.value);
            });
        }
        
        // Verificar se senhas coincidem
        const confirmPasswordInput = document.getElementById('confirmPassword');
        if (confirmPasswordInput) {
            confirmPasswordInput.addEventListener('input', function() {
                const password = document.getElementById('password').value;
                const confirmPassword = this.value;
                
                if (confirmPassword && password !== confirmPassword) {
                    this.style.borderColor = '#f44336';
                    this.style.background = '#ffebee';
                } else if (confirmPassword && password === confirmPassword) {
                    this.style.borderColor = '#4CAF50';
                    this.style.background = '#e8f5e8';
                } else {
                    this.style.borderColor = '#e0e0e0';
                    this.style.background = '#fafafa';
                }
            });
        }
    }
    
    // Limpar mensagens quando usuário começar a digitar
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', hideMessages);
    });
    
    // Fechar mensagens ao clicar nelas
    if (errorMessage) {
        errorMessage.addEventListener('click', hideMessages);
    }
    if (successMessage) {
        successMessage.addEventListener('click', hideMessages);
    }
});

// Função para logout (será usada no dashboard)
async function handleLogout() {
    try {
        await window.auth.signOut();
        localStorage.removeItem('englishTipsRememberMe');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Erro no logout:', error);
        showError('Erro ao fazer logout. Tente novamente.');
    }
}

// Tornar função disponível globalmente
window.handleLogout = handleLogout;
window.togglePassword = togglePassword;