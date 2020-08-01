# Projeto Cookmaster!

Este projeto foi feito para avaliação de meus conhecimentos sobre _NodeJS_ no curso de _Software Development_ ofertado pela Trybe.

## O que foi desenvolvido:

Desenvolvi uma aplicação utilizando a arquitetura MVC (Model-View-Controller).

A aplicação construída trata-se de um sistema de gerenciamento de receitas, onde é possível criar, visualizar, deletar e atualizar produtos e vendas.

## Instruções para execução

1 - Clone este repositório

`git clone git@github.com:laurolyra/my-projects.git`

2 - Vá para a pasta do projeto

`cd CookMaster`

3 - Instale as dependências

`npm install`

6 - Execute o script create_table.sql para criar o banco de dados.

5 - Inicie a aplicação

`npm start`

# Requisitos Obedecidos

Todos os requisitos abaixo constituem regras de negócio definidas pela escola, as quais não pude alterá-las para uma outra arquitetura ou uso de outra tecnologia.

Todas as camadas da aplicação (Models, Views e Controllers) foram desenvolvidas a partir de um código inicial, contendo, inclusive, a lógica necessária para realizar login e logout de usuários, bem como um middleware utilizado em todas as rotas que precisem de autenticação.

## Páginas

### Funcionalidades de visualização

## 1 - Criação de uma tela de listagem de receitas

A página é acessível através da rota principal (`/`).

Para cada receita, é mostrado apenas o nome da receita e o nome da pessoa que cadastrou aquela receita, bem como um link para ver seus detalhes.

Um botão "Nova receita" é exibido **apenas quando houver um usuário logado**.

## 2 - Criação de uma tela para visualizar uma receita específica

A tela está disponível no endpoint `/recipes/:id`

Caso o ID da pessoa logada na aplicação seja o mesmo ID da pessoa que criou a receita, um botão "Editar receita" e um outro "Excluir receita" são exibidos na página. Esses botões levam a pessoa para as páginas e editar e de excluir receita, respectivamente. Caso não haja nenhuma pessoa logada, nenhum desses botões é exibido.

Esta página exibe o título, os ingredientes, e a forma de preparo da receita.

## 3 - Criação de uma página de cadastro de usuários

Um usuário precisa ter os campos ID, E-mail, Senha, Nome e Sobrenome. Todos os campos são obrigatórios. O ID é gerado automaticamente, não podendo ser preenchido pelo usuário no momento do cadastro.

A validação dos campos acontece no backend, e uma mensagem é enviada ao frontend através de uma propriedade passada para o EJS, da mesma forma que acontece com a view `users/login`.

## 4 - Criação de uma página de cadastro de receitas

A página é acessível através do endpoint `/recipes/new`, e o formulário é enviado para o endpoint `POST /recipes`

A receita deve ter os campos ID, Nome, Ingredientes, Modo de preparo e Autor. Sinta-se à vontade para modelar o banco da forma que achar melhor. O ID é gerado automaticamente, não devendo ser preenchido no formulário de cadastro de receita.

O campo dos ingredientes pode ser um campo de texto aberto.

## 5 - Criação de uma página de edição de receitas

A página é acessível através do endpoint `/recipes/:id/edit`, e o formulário é enviado para o endpoint `POST /recipes/:id`.

Ao carregar, a página já contém as informações atuais daquela receita. Você pode utilizar o atributo `value` dos inputs no HTML para preencher esses campos.

Apenas a pessoa que criou a receita tem permissão para edita-la. Para verificar isso, você pode utilizar a propriedade `id` localizada em `req.user` (que é criada pelo `authMiddleware`) e compará-la ao ID de quem criou a receita. Caso os IDs não sejam idênticos, a pessoa é redirecionada à página de visualizar receita utilizando o método `res.redirect` no controller.

Caso a edição aconteça com sucesso, a pessoa é redirecionada para a página de visualização daquela receita, já com os dados atualizados.

A validação dos campos é realizada no backend.

## 6 - Criação de uma página de exclusão de uma receita

A página é acessível através do endpoint `/recipes/:id/delete`, e só pode ser acessada pela pessoa que cadastrou a receita.

Ao acessar a página, um formulário é exibido, solicitando a senha da pessoa para confirmar a operação. Esse formulário é enviado para o endpoint `POST /recipes/:id/delete`.

A receita só é excluída caso a senha esteja correta. Caso ela esteja incorreta, a pessoa é redirecionada à página de exclusão da receita com a mensagem "Senha incorreta. Por favor, tente novamente".

Caso a receita seja excluída com sucesso, a pessoa é redirecionada à página de listagem de receitas.

## 7 - Cria uma página de pesquisa de receitas

A página está acessível através do endpoint `/recipes/search`.

Um input do tipo texto é exibido juntamente com um botão "Pesquisar". O conteúdo do input é enviado para o endpoint `GET /recipes/search` através do parâmetro `q` na query string.

No backend, o valor do input de texto estará acessível através da propriedade `q` do objeto `req.query`. Caso nada seja informado para pesquisa, a view é renderizada apenas com o campo de pesquisa. Caso um valor seja informado, uma lista semelhante à tela de listar receitas é exibida, contendo o título, nome da pessoa que cadastrou, e um link para cada receita.

Para realizar a pesquisa, o controller de receitas solicita ao model que pesquise por receitas **contendo, em seu nome,** o valor digitado no input de pesquisa.

## 8 - Criação de uma página de "Minhas receitas"

O link para acessar essa página só está visível para pessoas logadas.

A página está acessível através do endpoint `/me/recipes`, e renderiza uma lista igual à que é exibida na página de listar receitas, populada com as receitas cadastradas pelo usuário logado.

Caso uma pessoa que não está logada acesse essa página, ela é redirecionada para a tela de login.


## 9 - Criação de uma página de editar usuário

O link para acessar essa página só está visível para pessoas logadas.

Cada pessoa só pode editar o próprio perfil. Para isso, o backend extrai o ID do usuário a ser atualizado da propriedade `req.user`, e não do corpo da request. Esse é o ID enviado ao model para realizar a atualização do usuário.

Esta página está acessível através do endpoint `/me/edit`, e o formulário é enviado para o endpoint `POST /me`.

Caso uma pessoa não logada tente acessar a página, ela é redirecionada para o login. (O middleware `authMiddleware` já implementa essa funcionalidade, então não se esqueça de utilizá-lo aqui.)

O ID da pessoa não pode ser editado. Nem através da tela, nem através de uma request realizada pelo Postman.

## 10 - Utilização de `includes` do EJS para renderizar a navbar das páginas

Parte do HTML ficará repetido em todas as páginas como, por exemplo, a barra de navegação.

Para esses conteúdos repetitivos, foi utilizado `includes` do EJS.
