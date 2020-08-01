# Repositório do projeto Star Wars DataTable Filters!

Este projeto foi feito para avaliação de meus conhecimentos sobre _react/redux_ no curso de _Software Development_ ofertado pela Trybe.

## O que foi desenvolvido:

Criei um projeto em React utilizando Redux para controle de estado. A aplicação consiste numa tabela com informações acerca de todos os planetas existentes no universo fictício da série _Star Wars_. A tabela foi alimentada com dados retornados de uma API real. Haverá, também, vários filtros que permitirão a quem usa selecionar e encontrar com facilidade a informação desejada.

## Instruções para execução

1 - Clone este repositório

`git clone `

## Requisitos Obedecidos

### 1 - Fazer uma requisição para o endpoint `/planets` da API de Star Wars e preencher uma tabela com os dados retornados, com exceção dos da coluna `residents`

A tabela deve ser renderizada por um componente chamado `<Table />`. Os dados recebidos da API devem ser salvos num campo chamado `data` do `store` e é daí que a tabela os lê. A requisição foi feita via utilização da biblioteca _redux-thunk_.

### 2 - Sua página deve ter um campo de texto que filtra a tabela para somente exibir planetas cujos nomes incluam o texto digitado

Ele deve atualizar a tabela com os planetas que se encaixam no filtro à medida que o nome é digitado, sem ter que apertar um botão para efetuar a filtragem. Por exemplo, se digitar "Tatoo", o planeta "Tatooine" deve ser exibido. Você deve usar **Redux** para fazer o gerenciamento do estado da aplicação e o texto digitado deve ser salvo num campo `filters: [{ name }]`. Por exemplo:

```javascript
{
  filters: [
    {
      name: 'Tatoo',
    }
  ]
}
```

### 3 - Sua página deve ter um filtro para valores numéricos

Ele funcionará com três seletores:

  - O primeiro deve abrir um dropdown que permita a quem usa selecionar uma das seguintes colunas: `population`, `orbital_period`, `diameter`, `rotation_period` e `surface_water`.
  - O segundo deve determinar se a faixa de valor será `Maior que`, `Menor que` ou `Igual a` o numero que virá a seguir.
  - O terceiro deve ser uma caixa de texto que só aceita números.

A combinação desses três seletores deve filtrar os dados da tabela de acordo com a coluna correspondente e com os valores escolhidos. Por exemplo:
  - A seleção `population | maior que | 100000` - Seleciona somente planetas com mais de 100000 habitantes.
  - A seleção `diameter | menor que | 8000` - Seleciona somente planetas com diâmetro menor que 8000.

Você deve usar **Redux** para fazer o gerenciamento do estado da aplicação. No `store`, esses valores devem ser salvos nos campos `filters [{ numericValues: { column, comparison, value } }]`. Por exemplo:

```javascript
{
  filters: [
    {
      numericValues: {
        column: 'population',
        comparison: 'maior que',
        value: '100000',
      }
    }
  ]
}
```

### 4 - Sua página deverá ser carregada com somente um filtro de valores numéricos

Caso um filtro seja totalmente preenchido, um novo filtro de valores numéricos deve ser carregado. Este novo filtro não deve incluir quaisquer colunas que já tenham sido selecionadas em filtros de valores numéricos anteriores. Caso todas as colunas já tenham sido inclusas em filtros anteriores, não deve ser carregado um novo filtro. Você deve usar **Redux** para fazer o gerenciamento do estado da aplicação.

Por exemplo: O primeiro filtro tem as seguintes seleções: `population | maior que | 100000`. Um segundo filtro deve aparecer após essas seleções serem todas feitas e, no primeiro dropdown deste segundo filtro, a opção `population` deve estar ausente. Se no segundo filtro fosse selecionado `diameter | menor que | 8000`, o estado ficaria assim:

```javascript
{
  filters: [
    {
      numericValues: {
        column: 'population',
        comparison: 'maior que',
        value: '100000',
      }
    },
    {
      numericValues: {
        column: 'diameter',
        comparison: 'menor que',
        value: '8000',
      }
    }
  ]
}
```


### 5 - Cada filtro de valores numéricos deve ter um ícone de `X` que, ao ser clicado, o apaga e desfaz suas filtragens dos dados da tabela

A coluna que este filtro selecionava deve passar a ficar disponível nos dropdowns dos demais filtros já presentes na tela. Você deve usar **Redux** para fazer o gerenciamento do estado da aplicação.

## BÔNUS

### 6 - As colunas da tabela devem ser ordenáveis de forma ascendente ou descendente

A informação acerca da ordenação das colunas deve ser armazenada nos campos `filters: [{ column: 'Name', order: 'ASC'}]`, o campo column representa o nome da coluna a ordenar e a ordem representa a ordenação, sendo 'ASC' ascendente e 'DESC' descendente. Por padrão, a tabela começa ordenada pela coluna 'Name' em ordem ascendente. Por exemplo:

```javascript
{
  filters: [
    {
      column: 'Name',
      order: 'ASC',
    }
  ]
}
```

Cada requisito mostra em seu exemplo somente os campos do estado relacionados àquele requisito. O resultado final acumulará campos dos vários exemplos.

---

## Instruções para entregar seu projeto:

### ANTES DE COMEÇAR A DESENVOLVER:

1. Clone o repositório
  * `git clone git@github.com:tryber/sd-02-block16-react-redux-starwars-datatable-filters.git`.
  * Entre na pasta do repositório que você acabou de clonar:
    * `sd-02-block16-react-redux-starwars-datatable-filters`

2. Instale as dependências
  * `npm install`

3. Crie uma branch a partir da branch `master`
  * Verifique que você está na branch `master`
    * Exemplo: `git branch`
  * Se não estiver, mude para a branch `master`
    * Exemplo: `git checkout master`
  * Agora crie uma branch para qual você vai submeter os `commits` do seu projeto
    * Você deve criar uma branch no seguinte formato: `nome-de-usuario-nome-do-projeto`
    * Exemplo: `git checkout -b joaozinho-react-redux-starwars-datatable-filters`

4. Crie um diretório `components` dentro de `src` e crie seus componenets dentro deste diretório. Por exemplo, crie um componente `Table` e adicione-o ao `App`:

```sh
mkdir src/components
touch src/components/Table.js
```

```javascript
import React from 'react';

const Table = () => <div>StarWars Datatable with Filters</div>;

export default Table;
```

```javascript
import React from 'react';
import './App.css';

import Table from './components/Table';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Table />
      </header>
    </div>
  );
}

export default App;
```

5. Adicione as mudanças ao _stage_ do Git e faça um `commit`
  * Verifique que as mudanças ainda não estão no _stage_
    * Exemplo: `git status` (deve aparecer listado o arquivo _src/last.js_ em vermelho)
  * Adicione o arquivo alterado ao _stage_ do Git
      * Exemplo:
        * `git add .` (adicionando todas as mudanças - _que estavam em vermelho_ - ao stage do Git)
        * `git status` (deve aparecer listado o arquivo _src/last.js_ em verde)
  * Faça o `commit` inicial
      * Exemplo:
        * `git commit -m 'iniciando o projeto. VAMOS COM TUDO :rocket:'` (fazendo o primeiro commit)
        * `git status` (deve aparecer uma mensagem tipo _nothing to commit_ )

6. Adicione a sua branch com o novo `commit` ao repositório remoto
  * Usando o exemplo anterior: `git push -u origin joaozinho-react-testing`

7. Crie um novo `Pull Request` _(PR)_
  * Vá até a página de _Pull Requests_ do [repositório no GitHub](https://github.com/tryber/sd-02-block16-react-redux-starwars-datatable-filters/pulls)
  * Clique no botão verde _"New pull request"_
  * Clique na caixa de seleção _"Compare"_ e escolha a sua branch **com atenção**
  * Clique no botão verde _"Create pull request"_
  * Adicione uma descrição para o _Pull Request_ e clique no botão verde _"Create pull request"_
  * **Não se preocupe em preencher mais nada por enquanto!**
  * Volte até a [página de _Pull Requests_ do repositório](https://github.com/tryber/sd-02-block16-react-redux-starwars-datatable-filters/pulls) e confira que o seu _Pull Request_ está criado

---

### DURANTE O DESENVOLVIMENTO

* ⚠ **LEMBRE-SE DE CRIAR TODOS OS ARQUIVOS DENTRO DA PASTA COM O SEU NOME** ⚠

* Faça `commits` das alterações que você fizer no código regularmente

* Lembre-se de sempre após um (ou alguns) `commits` atualizar o repositório remoto

* Os comandos que você utilizará com mais frequência são:
  1. `git status` _(para verificar o que está em vermelho - fora do stage - e o que está em verde - no stage)_
  2. `git add` _(para adicionar arquivos ao stage do Git)_
  3. `git commit` _(para criar um commit com os arquivos que estão no stage do Git)_
  4. `git push -u nome-da-branch` _(para enviar o commit para o repositório remoto na primeira vez que fizer o `push` de uma nova branch)_
  5. `git push` _(para enviar o commit para o repositório remoto após o passo anterior)_

---

### DEPOIS DE TERMINAR O DESENVOLVIMENTO

Para **"entregar"** seu projeto, siga os passos a seguir:

* Vá até a página **DO SEU** _Pull Request_, adicione a label de _"code-review"_ e marque seus colegas
  * No menu à direita, clique no _link_ **"Labels"** e escolha a _label_ **code-review**
  * No menu à direita, clique no _link_ **"Assignees"** e escolha **o seu usuário**
  * No menu à direita, clique no _link_ **"Reviewers"** e digite `students`, selecione o time `tryber/students-sd-02`

Se ainda houver alguma dúvida sobre como entregar seu projeto, [aqui tem um video explicativo](https://vimeo.com/362189205).

---

### REVISANDO UM PULL REQUEST

⚠⚠⚠

À medida que você e os outros alunos forem entregando os projetos, vocês serão alertados **via Slack** para também fazer a revisão dos _Pull Requests_ dos seus colegas. Fiquem atentos às mensagens do _"Pull Reminders"_ no _Slack_!

Os monitores também farão a revisão de todos os projetos, e irão avaliar tanto o seu _Pull Request_, quanto as revisões que você fizer nos _Pull Requests_ dos seus colegas!!!

Use o material que você já viu sobre [Code Review](https://course.betrybe.com/real-life-engineer/code-review/) para te ajudar a revisar os projetos que chegaram para você.
