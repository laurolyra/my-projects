# Projeto Storage-Manager!

Este projeto foi feito para avaliação de meus conhecimentos sobre _NodeJS_ no curso de _Software Development_ ofertado pela Trybe.

## O que foi desenvolvido:

Desenvolvi uma API utilizando a arquitetura MSC (Model-Service-Controller)

A API construída trata-se de um sistema de gerenciamento de vendas, onde será possível criar, visualizar, deletar e atualizar produtos e vendas.

## Instruções para execução

1 - Clone este repositório

`git clone git@github.com:laurolyra/my-projects.git`

2 - Vá para a pasta do projeto

`cd StoreManager`

3 - Instale as dependências

`npm install`

*É necessário, também, ter o MongoDB instalado e ativo em sua máquina*

4 - Inicie a aplicação

`npm run debug`


# Requisitos Obedecidos

Desenvolvi, neste projeto, todas as camadas da API (Models, Service e Controllers).

Através dessa aplicação, é possível realizar as operações básicas que se pode fazer em um determinado banco de dados: Criação, Leitura, Atualização e Exclusão (`CRUD`).

Foi utilizado o banco MongoDB para a gestão de dados. Além disso, a API é ser RESTful.

# Requisitos Obedecidos

Todos os requisitos abaixo constituem regras de negócio definidas pela escola, as quais não pude alterá-las para uma outra arquitetura ou uso de outra tecnologia.

## 1 - Todos os endpoints estão no padrão REST.

- Os verbos HTTP estão adequados para cada operação.

- As URL em cada recurso estão devidamente agrupadas.

- Os endpoints sempre retornam uma resposta, havendo sucesso nas operações ou não.

- A API retorna os códigos de status corretos (recurso criado, erro de validação, autorização, etc).

## 2 - Criação de um endpoint para o cadastramento de produtos.

- O endpoint é acessível através do caminho (`/products`);

- Os produtos enviados são salvos em uma **collection** do MongoDB;

- O endpoint recebe a seguinte estrutura:

```json
{
  "name": "product_name",
  "quantity": "product_quantity"
}
```

- `name` é uma _string_ com mais de 5 caracteres e é único;

- `quantity` é um número inteiro maior que 0;

- Cada produto tem um id único e gerado no momento em que o recurso for criado. Para tanto, foi utilizado o ID gerado pelo MongoDB.

- A resposta do endpoint em caso de sucesso é o produto criado.

## 3 - Criação de um endpoint para listar os produtos.

- O endpoint é acessível através do caminho (`/products`) ou (`/products/:id`);

- Através do caminho `/products`, todos os produtos são retornados;

- Através do caminho `/products/:id`, apenas o produto com o `id` presente na URL é retornado;

## 4 - Criação de um endpoint para deletar um produto

- O endpoint é acessível através do caminho (`/products/:id`);

- Apenas o produto com o `id` presente na URL é deletado;

## 5 - Criação de um endpoint para atualizar um produto

- O endpoint é acessível através do caminho (`/products/:id`);

- O corpo da requisição segue a mesma estrutura do método responsável por adicionar um produto;

- Apenas o produto com o `id` presente na URL é atualizado;

## 6 - Criação de um endpoint para cadastrar vendas

- O endpoint é acessível através do caminho (`/sales`);

- As vendas enviadas são salvas em uma `collection` do MongoDB;

- É possível cadastrar a venda de vários produtos através da uma mesma requisição;

- O endpoint recebe a seguinte estrutura:

```json
[
  {
  "productId": "product_id",
  "quantity": "product_quantity"
  }
  ...
]
```

- O `productId` é igual ao `id` de um produto anteriormente cadastrado;

- `quantity` deve ser um número inteiro maior que 0;

- Cada venda tem um id que seja único e gerado no momento em que o recurso for criado;

- A resposta do endpoint em caso de sucesso é(são) a(s) venda(s) criada(s).

## 7 - Criação de um endpoint para listar as vendas

- O endpoint é acessível através do caminho (`/sales`) ou (`/sales/:id`);

- Através do caminho `/sales`, todas as vendas são retornadas;

- Através do caminho `/sales/:id`, apenas a venda com o `id` presente na URL é retornada;

## 8 - Criação de um endpoint para deletar uma venda

- O endpoint é acessível através do caminho (`/sales/:id`);

- Apenas a venda com o `id` presente na URL é deletado;

## 9 - Criação de um endpoint para atualizar uma venda

- O endpoint é acessível através do caminho (`/sales/:id`);

- O corpo da requisição recebe a mesma estrutura utilizada para criar uma venda;

- `quantity` é um número inteiro maior que 0;

- Apenas a venda com o `id` presente na URL é atualizada;
