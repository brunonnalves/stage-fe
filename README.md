# stage-fe

Stage FE é uma plataforma web que possibilita o gerenciamento de pacientes internados em um hospital

## Para executar a aplicação em modo de Desenvolvimento

    - Para garantir que tudo irá funcionar devidamente, tenha certeza de usar a versão Node v18.16.0 (Se você tem NVM, execute no terminal "nvm use" primeiro) ou a versão Yarn v4.0.2
    - No terminal, execute "npm install" ou "yarn"
    - Então execute "npm run dev" ou "yarn dev" para rodar a aplicação em localhost:5173 (porta padrão do Vite)

OBS:

- Para mudar a URL base do backend, crie um arquivo `.env` e declare a variável de ambiente `VITE_BE_BASE_URL`

## To build for production

    - Crie um arquivo `.env` e declare as variáveis de ambiente:
        - VITE_BE_BASE_URL: URL para enviar requisições ao Backend (i.e "https://user.stage-test.com")
    - No terminal, execute "npm install" ou "yarn"
    - Então execute "npm run build" ou "yarn build". A pasta de output deve ser /dist
