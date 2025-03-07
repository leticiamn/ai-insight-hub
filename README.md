# Gerador de E-mail de Vendas com IA - Extensão Chrome

Esta extensão para o Google Chrome permite gerar e-mails de vendas personalizados analisando o conteúdo de um site. Utilizando a API do Google Gemini, a extensão identifica o tipo de negócio e gera um e-mail de vendas com oportunidades de implementação de IA específicas para o negócio.

## Demonstração

https://github.com/user-attachments/assets/1ddad2b9-6520-4abd-89a4-a23ea89f3e69

Assista completo no YouTube: https://youtu.be/Gj_4SDOxSRU

## Funcionalidades

- Extração automática do conteúdo da página atual
- Análise do conteúdo usando IA para identificar o tipo de negócio
- Geração de um e-mail de vendas personalizado com assunto e corpo
- Substituição de placeholders com o nome do usuário e da empresa
- Botões para copiar facilmente o assunto e o corpo do e-mail

## Tecnologias Utilizadas

- React 18
- TypeScript
- Vite
- Chrome Extension API
- Google Gemini API

## Requisitos

- Node.js 18+ e npm
- Chrome/Edge ou outro navegador baseado em Chromium
- Chave de API do Google Gemini (https://makersuite.google.com/app/apikey)

## Configuração do Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/leticiamn/ai-insight-hub
cd ai-insight-hub
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure a variável de ambiente

Crie um arquivo `.env` na raiz do projeto e adicione sua chave de API do Google Gemini:

```
VITE_GOOGLE_API_KEY=sua_chave_api_aqui
```

### 4. Compile a extensão

```bash
npm run build
```

## Instalação no Chrome

1. Abra o Chrome e navegue para `chrome://extensions/`
2. Ative o "Modo do desenvolvedor" no canto superior direito
3. Clique em "Carregar sem compactação"
4. Selecione a pasta `dist` que foi gerada após a compilação

## Uso

1. Navegue até o site que você deseja analisar
2. Clique no ícone da extensão na barra de ferramentas do Chrome
3. Preencha seu nome e o nome da sua empresa
4. Clique no botão "Analisar Página e Gerar E-mail"
5. Aguarde enquanto a IA analisa o conteúdo e gera o e-mail
6. Copie o assunto e o corpo do e-mail usando os botões "Copiar"

## Estrutura do Projeto

```
/src
  /components         # Componentes React reutilizáveis
  /services           # Serviços para extração de texto e geração de email
  /styles             # Arquivos CSS globais e animações
  App.tsx             # Componente principal
  main.tsx            # Ponto de entrada
/public
  /icons              # Ícones da extensão
  manifest.json       # Manifesto da extensão
```

## Personalização

Você pode personalizar o prompt de geração do e-mail modificando o arquivo `services/emailGenerator.ts`:

```typescript
const prompt = `Analise o seguinte conteúdo de um site...`;
```

## Nota sobre Limites de API

A Google Gemini API possui limites de uso. Verifique a documentação oficial para mais informações sobre cotas e limites.
