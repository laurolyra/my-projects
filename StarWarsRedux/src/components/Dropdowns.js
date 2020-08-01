import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { generateFilter } from '../actions/dropdownActions';

class Dropdowns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newNumericValues: {
        numericValues: {
          column: '',
          comparison: '',
          value: '',
        },
      },
    };
    this.storeFilters = this.storeFilters.bind(this);
    this.setColumnsState = this.setColumnsState.bind(this);
    this.setValueState = this.setValueState.bind(this);
  }

  setColumnsState(e) {
    const { newNumericValues } = this.state;
    this.setState({
      newNumericValues: {
        ...newNumericValues,
        numericValues: {
          ...newNumericValues.numericValues,
          column: e.target.value,
        },
      },
    });
  }

  setComparisonState(e) {
    const { newNumericValues } = this.state;
    this.setState({
      newNumericValues: {
        ...newNumericValues,
        numericValues: {
          ...newNumericValues.numericValues,
          comparison: e.target.value,
        },
      },
    });
  }

  setValueState(e) {
    const { newNumericValues } = this.state;
    this.setState({
      newNumericValues: {
        ...newNumericValues,
        numericValues: {
          ...newNumericValues.numericValues,
          value: e.target.value,
        },
      },
    });
  }

  generateColumns(arr) {
    const { columns } = this.props;
    if (columns.length !== 0) {
      return (
        <select onClick={(e) => this.setColumnsState(e)}>
          <option>Select Column</option>
          {arr.map((option) => <option key={option} name="column" value={option}>{option}</option>)}
        </select>
      );
    }
    return null;
  }

  generateComparison() {
    const comparison = ['more than', 'equal to', 'less than'];
    const { columns } = this.props;
    if (columns.length !== 0) {
      return (
        <select onChange={(e) => this.setComparisonState(e)}>
          <option value="">Select Comparison</option>
          {comparison.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      );
    }
    return null;
  }

  storeFilters() {
    const { actionStoreFilters, columns } = this.props;
    const { newNumericValues } = this.state;
    return columns.length > 0 && actionStoreFilters(newNumericValues);
  }

  render() {
    const {
      columns,
    } = this.props;
    return (
      <div>
        {this.generateColumns(columns)}
        {this.generateComparison()}
        {columns.length !== 0
          ? (
            <input
              type="number"
              placeholder="type a number here!"
              onChange={(e) => this.setValueState(e)}
            />
          )
          : <div>No more filters available!</div>}
        <button type="button" onClick={() => this.storeFilters()}>Filter!</button>
      </div>
    );
  }
}

const mapStateToProps = ({
  dropdownReducer: {
    columns,
    column,
    comparison,
    value,
  },
}) => ({
  columns,
  column,
  comparison,
  value,
});

const mapDispatchToProps = (dispatch) => ({
  actionStoreFilters: (newNumericValues) => dispatch(generateFilter(newNumericValues)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dropdowns);

Dropdowns.propTypes = {
  columns: propTypes.arrayOf(propTypes.string).isRequired,
  actionStoreFilters: propTypes.func.isRequired,
};
