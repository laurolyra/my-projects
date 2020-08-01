import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { thunkPlanets, filterText } from '../actions/APIactions';
import { eraseFilter } from '../actions/dropdownActions';
import { sortColumn, changeOrder } from '../actions/sortActions';
import Dropdowns from './Dropdowns';
import './Table.css';

class Table extends Component {
  static numericFilters(array, { numericValues }) {
    const { column, comparison, value } = numericValues;
    const columnValue = (column !== '' && value !== '');
    if (comparison === 'more than' && columnValue) {
      return array.filter((planet) => planet[column] > value);
    }
    if (comparison === 'less than' && columnValue) {
      return array.filter((planet) => planet[column] < value);
    }
    if (comparison === 'equal to' && columnValue) {
      return array.filter((planet) => planet[column] === value);
    }
    return array;
  }

  static generateBody(data, text, filters) {
    console.log(data);
    let firstFilter = data;
    filters.forEach((x) => { firstFilter = Table.numericFilters(firstFilter, x); });
    return (
      firstFilter
        .filter(({ name }) => name.toLowerCase().includes(text.toLowerCase()))
        .map((values) => (
          <tbody key={values.name}>
            <tr>
              {Object.values(values).map((box, index) => (index !== 9
                ? <td className="tableData" key={box}>{box}</td>
                : null))}
            </tr>
          </tbody>
        )));
  }

  static generateTable(loadInfo, data, failLoad, filtered, text, filters) {
    if (!loadInfo && data) {
      return (
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((item) => (item !== 'residents'
                ? <th className="tableHeader" key={item}>{item}</th>
                : null))}
            </tr>
          </thead>
          {!filtered
            ? Table.generateBody(data, text, filters)
            : Table.generateBody(filtered, text, filters)}
        </table>
      );
    }
    if (failLoad) { return <div>{failLoad}</div>; }
    return <div>Loading...</div>;
  }

  static sortStrings(data, column, order) {
    if (order === 'ASC') {
      data.sort((a, b) => (a[column] < b[column] ? 1 : -1));
    }
    if ((order === 'DESC')) {
      data.sort((a, b) => (a[column] > b[column] ? 1 : -1));
    }
  }

  static sortNumbers(data, column, order) {
    if (order === 'ASC') {
      data.sort((a, b) => (parseInt(a[column], 10) < parseInt(b[column], 10) ? 1 : -1));
    }
    if ((order === 'DESC')) {
      data.sort((a, b) => (parseInt(a[column], 10) > parseInt(b[column], 10) ? 1 : -1));
    }
  }

  constructor(props) {
    super(props);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.showFilters = this.showFilters.bind(this);
  }

  componentDidMount() {
    const { importedThunk } = this.props;
    importedThunk();
  }

  onChangeHandler(event) {
    const { filterByText } = this.props;
    let { data } = this.props;
    const text = event.target.value.toLowerCase();
    filterByText(text, data);
    data = filterByText(text, data).results;
  }

  showFilters(filters) {
    const { eraseColumn } = this.props;
    return filters[0].numericValues.column && filters
      .map(({ numericValues }) => (
        <div className="filters">
          <p key={numericValues.column}>{numericValues.column}</p>
          <p key={numericValues.comparison}>{numericValues.comparison}</p>
          <p key={numericValues.value}>{numericValues.value}</p>
          <button
            type="button"
            value={numericValues.column}
            onClick={() => eraseColumn(filters, numericValues.column)}
          >
            X
          </button>
        </div>
      ));
  }

  changeOrderandState(e) {
    const { importchangeOrder, sFilters, data } = this.props;
    const { column, order } = sFilters[0];
    const arrayStrings = ['name', 'climate', 'gravity', 'terrain', 'films', 'url'];
    if (arrayStrings.some((param) => param === column)) {
      Table.sortStrings(data, column, order);
    } else {
      Table.sortNumbers(data, column, order);
    }
    importchangeOrder(e);
    return data;
  }

  changeOrder(data) {
    const { importSortColumn, sFilters } = this.props;
    return (
      <div>
        <select onClick={(e) => importSortColumn(e.target.value)}>
          {Object.keys(data[0])
            .map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
        </select>
        <button type="button" value={sFilters[0].order === 'ASC' ? 'DESC' : 'ASC'} onClick={(e) => this.changeOrderandState(e.target.value)}>{sFilters[0].order === 'ASC' ? 'Descending' : 'Ascending'}</button>
      </div>
    );
  }

  render() {
    const {
      loading,
      data,
      error,
      filtered,
      textFilter,
      filters,
      sFilters,
    } = this.props;
    return (
      <div>
        <h1>Star Wars - A New Saga begins!</h1>
        <input onChange={this.onChangeHandler} />
        <Dropdowns />
        {data === null ? null : this.changeOrder(data)}
        <h2>Filters:</h2>
        <div className="filterContainer">
          {this.showFilters(filters)}
        </div>
        {Table.generateTable(loading, data, error, filtered, textFilter[0].name, filters, sFilters)}
      </div>
    );
  }
}

const mapStateToProps = ({
  APIreducer: {
    loading,
    data,
    error,
  },
  textReducer: {
    filtered,
    filters: textFilter,
  },
  dropdownReducer: {
    filters,
  },
  sortReducer: {
    filters: sFilters,
  },
}) => ({
  loading, data, error, filtered, textFilter, filters, sFilters,
});

const mapDispatchToProps = (dispatch) => ({
  importedThunk: () => dispatch(thunkPlanets()),
  filterByText: (typing, data) => dispatch(filterText(typing, data)),
  eraseColumn: (array, column) => dispatch(eraseFilter(array, column)),
  importSortColumn: (column) => dispatch(sortColumn(column)),
  importchangeOrder: (order) => dispatch(changeOrder(order)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  importedThunk: propTypes.func.isRequired,
  filterByText: propTypes.func.isRequired,
  loading: propTypes.bool.isRequired,
  data: propTypes.arrayOf(propTypes.object),
  error: propTypes.string,
  filtered: propTypes.arrayOf(propTypes.object),
  textFilter: propTypes.arrayOf(propTypes.object),
  filters: propTypes.arrayOf(propTypes.object),
  eraseColumn: propTypes.func.isRequired,
  importSortColumn: propTypes.func.isRequired,
  importchangeOrder: propTypes.func.isRequired,
  sFilters: propTypes.arrayOf(propTypes.object),
};

Table.defaultProps = {
  data: null,
  error: null,
  filtered: null,
  textFilter: '',
  filters: '',
  sFilters: '',
};
