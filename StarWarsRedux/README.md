# Projeto Star Wars DataTable Filters (com Redux)!

Este projeto foi feito para avaliação de meus conhecimentos sobre _react/redux_ no curso de _Software Development_ ofertado pela Trybe.

## O que foi desenvolvido:

Criei um projeto em React utilizando Redux para controle de estado. A aplicação consiste numa tabela com informações acerca de todos os planetas existentes no universo fictício da série _Star Wars_. A tabela foi alimentada com dados retornados de uma API real. Há, também, vários filtros que permitirão a quem usa selecionar e encontrar com facilidade a informação desejada.

## Instruções para execução

1 - Clone este repositório

`git clone git@github.com:laurolyra/my-projects.git`

2 - Vá para a pasta do projeto

`cd StarWarsRedux`

3 - Instale as dependências

`npm install`

4 - Inicie a aplicação

`npm start`

# Requisitos Obedecidos

Todos os requisitos abaixo constituem regras de negócio definidas pela escola, as quais não pude alterá-las para uma outra arquitetura ou uso de outra tecnologia.

## 1 - Fazer uma requisição para o endpoint `/planets` da API de Star Wars e preencher uma tabela com os dados retornados, com exceção dos da coluna `residents`.

A tabela foi renderizada por um componente chamado `<Table />`. Os dados recebidos da API foram salvos num campo `data` do `store` e é daí que a tabela os lê. A requisição foi feita via utilização da biblioteca _redux-thunk_.

## 2 - Apresentação de um campo de texto que filtra a tabela para somente exibir planetas cujos nomes incluam o texto digitado.

A tabela é atualizada com os planetas que se encaixam no filtro à medida que o nome é digitado, sem ter que apertar um botão para efetuar a filtragem. Por exemplo, se digitar "ald", o planeta "Alderaan" é exibido (este campo não é _case sensitive_, portanto). Foi utilizado o **Redux** para fazer o gerenciamento do estado da aplicação e o texto digitado foi salvo num campo `filters: [{ name }]`, a seguir demonstrado:

```javascript
{
  filters: [
    {
      name: 'ald',
    }
  ]
}
```

## 3 - A página contém um filtro para valores numéricos.

Ela funciona com três seletores:

  - O primeiro abre um dropdown que permite ao usuário selecionar uma das seguintes colunas: `population`, `orbital_period`, `diameter`, `rotation_period` e `surface_water`.
  - O segundo determina se a faixa de valor será maior (`more than`), menor (`less than`) ou igual (`equal to`) ao numero que virá a seguir.
  - O terceiro é uma caixa de texto que só aceita números.

A combinação desses três seletores, após o clique do botão `Filter!`, filtra os dados da tabela de acordo com a coluna correspondente e com os valores escolhidos. Por exemplo:
  - A seleção `population | more than | 100000` - Seleciona somente planetas com mais de 100000 habitantes.
  - A seleção `diameter | less than | 8000` - Seleciona somente planetas com diâmetro menor que 8000.

Foi utilizado **Redux** para fazer o gerenciamento do estado da aplicação. No `store`, esses valores foram salvos nos campos `filters [{ numericValues: { column, comparison, value } }]`. Por exemplo:

```javascript
{
  filters: [
    {
      numericValues: {
        column: 'population',
        comparison: 'more than',
        value: '100000',
      }
    }
  ]
}
```

## 4 - A página sempre será carregada com, somente, um filtro de valores numéricos.

Caso um filtro seja totalmente preenchido (e o botão `Filter!` clicado), um novo filtro de valores numéricos é carregado. Este novo filtro não inclui quaisquer colunas que já tenham sido selecionadas em filtros de valores numéricos anteriores. Caso todas as colunas já tenham sido inclusas em filtros anteriores, surge a mensagem `No more filters available!`. Foi utilizado **Redux** para fazer o gerenciamento do estado da aplicação.

Por exemplo: O primeiro filtro tem as seguintes seleções: `population | more than| 100000`. Um segundo filtro aparece após essas seleções serem todas feitas e, no primeiro dropdown deste segundo filtro, a opção `population` está ausente. Se no segundo filtro fosse selecionado `diameter | less than | 8000`, o estado ficaria assim:

```javascript
{
  filters: [
    {
      numericValues: {
        column: 'population',
        comparison: 'more than',
        value: '100000',
      }
    },
    {
      numericValues: {
        column: 'diameter',
        comparison: 'less than',
        value: '8000',
      }
    }
  ]
}
```


## 5 - Cada filtro de valores numéricos tem um ícone de `X` que, ao ser clicado, o apaga e desfaz suas filtragens dos dados da tabela.

A coluna que este filtro selecionava passa a ficar disponível nos _dropdowns_ dos demais filtros já presentes na tela. Também foi utilizado **Redux** para fazer o gerenciamento do estado da aplicação.

## 6 - As colunas da tabela são ordenáveis de forma ascendente ou descendente.

A informação acerca da ordenação das colunas foi armazenada nos campos `filters: [{ column: 'Name', order: 'ASC'}]`, o campo `column` representa o nome da coluna a ordenar e a ordem representa a ordenação, sendo `ASC` para ascendente e `DESC` para uma ordem descendente. Por padrão, a tabela começa ordenada pela coluna 'Name' em ordem ascendente. Por exemplo:

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
