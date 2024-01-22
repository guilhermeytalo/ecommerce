# Projeto Ecommerce

Este é um projeto de ecommerce desenvolvido com Next.js 14, Shadcn e Json-Server.

## Tecnologias Utilizadas

- Yarn
- Next.js
- Shadcn
- Json-Server

## Configuração do Projeto

### Pré-requisitos

- Node.js
- Yarn

### Instalação

1. Clone o repositório
   ```sh
   git clone https://github.com/guilhermeytalo/ecommerce.git
   cd ecommerce
   ```
2. Instale os pacotes
   ```sh
   yarn
   ```
3. Inicie o servidor
   ```sh
    yarn dev
    ```
4. Inicie o servidor json-server
   ```sh
    yarn server
    ```
5. Acesse o projeto em:
    ```sh
    http://localhost:3000

### TODO
- [x] Possuir pelo menos 5 produtos
- [x] Carrinho de compras funcional
- [x] Exibir sempre a quantidade de itens no carrinho 
- [x] Salvar os produtos do carrinho no local storage
- [x] Utilizar o contextAPI para gerenciar o carrinho

Listagem de produtos
- [x] Exibir os produtos no estilo de loja online
- [x] Permitir a filtragem por nome, preço e data de inclusão
- [x] Permitir a ordenação por preço ou data de inclusão 
- [x] Possibilitar adição e remoção de produtos do carrinho

- Checkout
   - [x] Resumo dos itens no carrinho
   - [x] Totalizador de preço
   - [x] Botão “FINALIZAR COMPRA”
   - [x] Após finalizar a compra, exibir mensagem de sucesso e limpar o carrinho

REQUISITOS OPCIONAIS:
- [ ] Testes automatizados
- [ ] Layout responsivo
- [x] Uso de libs como Material UI, Styled Components, Emotion, Bootstrap, etc. 
- [x] Utilização de pós/pré-processadores CSS (por exemplo, Sass, Less, PostCSS) 
- [x] utilizar uma API externa, mas é permitido(a API local é baseada em uma [api externa](https://perenual.com/docs/api)

REQUISITOS EXTRAS
- [x] Utilizar o Next.js
- [x] Deploy em produção

### Deploy
Você pode ver o site em produção clicando [aqui](https://espacovidaecommerce.vercel.app/).
> Lembre-se de estar rodando o yarn server para que o site funcione corretamente.