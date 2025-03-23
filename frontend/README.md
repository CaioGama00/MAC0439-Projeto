# Frontend do Projeto

Este é o frontend do projeto, desenvolvido com React.

## Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/CaioGama00/MAC0439-Projeto.git
   ```
2. Navegue até a pasta do frontend:
   ```bash
   cd frontend
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
   ou
   ```bash
   yarn install
   ```

## Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

```plaintext
REACT_APP_API_URL=http://localhost:3000
```

## Executando o Projeto

Para iniciar o servidor de desenvolvimento, execute:

```bash
npm start
```
ou
```bash
yarn start
```

O frontend estará disponível em [http://localhost:3000](http://localhost:3000).

## Estrutura do Projeto

```
public/        # Arquivos estáticos (HTML, imagens, etc.)
src/           # Código fonte do frontend
│-- components/ # Componentes reutilizáveis
│-- pages/      # Páginas do jogo
│-- services/   # Serviços para comunicação com o backend
│-- utils/      # Utilitários e funções auxiliares
│-- App.js      # Componente principal do React
└── index.js    # Ponto de entrada do React
```

