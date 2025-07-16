# EnglishTips - Site Educacional

## Descrição

O EnglishTips é um site desenvolvido para representar uma plataforma educacional de aprendizado de inglês. O projeto foi criado com base na descrição de um trabalho de conclusão de curso desenvolvido em parceria com a professora Andreza.
> 💻 Acesse a versão online: [EnglishTips]([https://levyabreu.github.io/HealthHub/](https://levyabreu.github.io/EnglishTips/))

## Características do Site

### Design e Layout
- **Design Moderno**: Interface atrativa com gradientes e animações suaves
- **Responsivo**: Adaptável para desktop, tablet e dispositivos móveis
- **Cores**: Paleta baseada em verde (#4CAF50) representando educação e crescimento
- **Tipografia**: Fonte moderna e legível (Segoe UI)

### Funcionalidades Implementadas

#### 1. Navegação Suave
- Botões no cabeçalho para navegar entre seções
- Scroll suave entre as seções do site
- Botão "Voltar ao Topo" que aparece durante o scroll

#### 2. Seções Principais
- **Sobre**: Informações detalhadas sobre o projeto EnglishTips
- **Features**: Três características principais (Colaborativo, Acessível, Envolvente)
- **Conteúdo**: Três categorias (Vídeos, Exercícios, Artigos)
- **Estatísticas**: Impacto do projeto com animação de números

#### 3. Interatividade
- **Modais Informativos**: Clique nos placeholders para ver informações sobre conteúdo futuro
- **Efeitos Hover**: Animações ao passar o mouse sobre elementos
- **Animações**: Entrada suave dos elementos e contagem animada das estatísticas

#### 4. Responsividade
- Layout adaptável para diferentes tamanhos de tela
- Grid responsivo que se reorganiza em dispositivos menores
- Botões e textos otimizados para mobile

## Estrutura de Arquivos

```
englishtips/
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos CSS
├── js/
│   └── script.js       # Funcionalidades JavaScript
└── README.md           # Este arquivo
```

## Como Visualizar o Site

### Opção 1: Abrir Localmente
1. Navegue até a pasta `englishtips`
2. Abra o arquivo `index.html` em qualquer navegador web moderno
3. O site funcionará completamente offline

### Opção 2: Servidor Local (Recomendado)
Para melhor experiência, especialmente se planeja fazer modificações:

```bash
# Usando Python (se disponível)
cd englishtips
python -m http.server 8000

# Ou usando Node.js (se disponível)
npx serve .
```

Depois acesse `http://localhost:8000` no navegador.

## Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: 
  - Flexbox e Grid Layout
  - Animações e transições
  - Media queries para responsividade
  - Gradientes e sombras modernas
- **JavaScript ES6+**:
  - Manipulação do DOM
  - Event listeners
  - Intersection Observer API
  - Animações dinâmicas

## Funcionalidades Detalhadas

### Modais Interativos
- Clique em qualquer placeholder de conteúdo para ver informações
- Feche com o botão X, clicando fora ou pressionando ESC
- Conteúdo personalizado para cada tipo (vídeos, exercícios, artigos)

### Animações
- **Entrada**: Elementos aparecem suavemente ao carregar a página
- **Estatísticas**: Números contam automaticamente quando a seção entra na tela
- **Hover**: Efeitos visuais ao interagir com elementos

### Acessibilidade
- Estrutura semântica com tags apropriadas
- Contraste adequado de cores
- Navegação por teclado funcional
- Textos alternativos para ícones

## Personalização

### Cores
Para alterar a paleta de cores, modifique as variáveis no arquivo `css/style.css`:
- Verde principal: `#4CAF50`
- Verde escuro: `#45a049`
- Gradiente de fundo: `#667eea` para `#764ba2`

### Conteúdo
- Textos podem ser editados diretamente no `index.html`
- Estatísticas podem ser alteradas nos elementos com classe `.stat-item h3`
- Modais podem ser personalizados no arquivo `js/script.js`

## Compatibilidade

- **Navegadores**: Chrome, Firefox, Safari, Edge (versões modernas)
- **Dispositivos**: Desktop, tablet, smartphone
- **Resolução**: Otimizado para 320px até 1920px+

## Próximos Passos (Sugestões)

1. **Conteúdo Real**: Substituir placeholders por vídeos, exercícios e artigos reais
2. **Backend**: Implementar sistema de usuários e progresso
3. **CMS**: Adicionar painel administrativo para gerenciar conteúdo
4. **Gamificação**: Sistema de pontos e conquistas
5. **Multilíngua**: Suporte para outros idiomas

## Suporte

Este é um projeto estático demonstrativo. Para implementação de funcionalidades avançadas, seria necessário:
- Servidor backend (Node.js, Python, PHP, etc.)
- Banco de dados para armazenar conteúdo e usuários
- Sistema de autenticação
- API para gerenciamento de conteúdo

---

**Desenvolvido com ❤️ para demonstrar as possibilidades do EnglishTips**

