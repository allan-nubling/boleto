<p>
  <h1 align="center">Boleto Api</h1>
</p>

## Descrição

Api para extrair de uma linha digitavel de um boleto o cõdigo de barras, valor e data de vencimento.

## Tech and Tools
[![node](https://img.shields.io/badge/node-14.x-84ba64)](https://nodejs.org/docs/latest-v16.x/api/)
[![yarn](https://img.shields.io/badge/yarn-1476a2)](https://classic.yarnpkg.com/en/docs)
[![typescript](https://img.shields.io/badge/typescript-3178c6)]()
[![babel](https://img.shields.io/badge/babel-f9dc3e)](https://babeljs.io/)
[![express](https://img.shields.io/badge/express-yellow)](https://expressjs.com/pt-br/4x/api.html)
[![eslint](https://img.shields.io/badge/eslint-4b32c3)](https://eslint.org/)
[![prettier](https://img.shields.io/badge/prettier-c596c7)](https://prettier.io/)
[![jest](https://img.shields.io/badge/jest-c21325)](https://jestjs.io/)
[![husky](https://img.shields.io/badge/husky-blue)](https://typicode.github.io/husky/#/)

## Conteúdo

- [Descrição](#descrição)
- [Tech and Tools](#tech-and-tools)
- [Conteúdo](#conteúdo)
- [Instalação](#instalação)
- [Executando a aplicação no terminal](#executando-a-aplicação-no-terminal)
- [Testes](#testes)
- [Outros Scripts](#outros-scripts)
- [Versionamento do projeto](#versionamento-do-projeto)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Stay in touch](#stay-in-touch)

## Instalação

```bash
$ yarn install
```
```bash
## Depois da Instalação
Crie seu arquivo .env pelo exemplo do .env.example para que ao instanciar o Docker ele possa ler as credenciais do banco de teste.
```
## Executando a aplicação no terminal

```bash
# watch mode de desenvolvimento
$ yarn dev
```

## Testes

```bash
# teste unitário
$ yarn test:unit

# teste e2e
$ yarn test:int
```

## Outros Scripts

```bash
# inicia modo de desenvolvimento com debug
$ yarn debug
```

```bash
# inicia modo watch dos testes
$ yarn test:watch
```

## Versionamento do projeto
Sempre utilize o fluxo de trabalho de git flow criando updates, features, chores, docs e etc.<br />
Para facilitar criamos um processo que já padroniza esses commits com o comitizen, eslint, prettier e husky que nos auxilia nesse padrão.

## Estrutura de pastas
Seguimos uma estrutura de clean architecture e DDD para organizar a aplicação.

    .
    ├── src
    │   ├── presentation            # conexões por onde a aplicação expõe suas regras de negócio
    │   │   ├── http                # http
    │   │   │   └── controller      # controladores das portas http
    │   │   │   │   └── ...
    │   │   │   └──  ...
    │   ├── core                    # core da aplicação 
    │   │   ├── entities            # entidades, as regras de negócio mais internas estão aqui
    │   │   │   └──  ...
    |   |   └── useCases            # casos de uso da aplicação, contento regras de negócio do serviço
    │   │       └──  ...
    │   ├── external                # conexões externas da aplicação
    │   │   ├── repositories        # repositórios para persistência dos dados da aplicação
    │   │   │   └──  ...
    |   |   └── services            # serviços externos utilizados, ex: vault, apis, etc
    │   │       └──  ...
    │   ├── main                    # entrada da aplicação
    │   │   ├── adapters            # adaptadores entre os frameworks e a interface de adapters da aplicação
    │   │   │   └──  ...
    |   |   ├── config              # configurações dos frameworks utilizados na camada externa da aplicação
    │   │   |   └──  ...
    |   |   ├── factories           # classes responsáveis por fazer a injeção de dependencias no core da aplicação
    │   │   |   └──  ...
    |   |   ├── routes              # injeção das factories nas rotas REST do framework
    │   │   |   └──  ...
    |   |   └── server.ts           # entrypoint da aplicação
    │   ├── shared                  # classes utilitárias e conexões com libs para serem usadas na aplicação
    │   │   ├── Errors.ts           # erros gerais da aplicação
    │   │   ├── Logger.ts           # classe responsável por deixar os logs da aplicação mais limpos em prod
    │   │   └── ...
    ├── .env.example                # arquivo de exemplo do .env de desenvolvimento
    ├── docs.yml                    # arquivo OpenApi para endpoints
    ├──...
    └── yarn.lock

## Stay in touch

- Developer - [Allan Nubling](mailto:nubling@gmail.com)
  
