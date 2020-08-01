import React from 'react';
import {
  render,
  cleanup,
  wait,
  fireEvent,
} from '@testing-library/react';
import App from '../App';
import dataResults from './dataResults';

afterEach(cleanup);

describe('first things first', () => {
  test('renders a "Loading..." message', () => {
    const { getByText } = render(<App />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });
  test('mocking API - error case', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        status: 400,
        ok: false,
        json: () => Promise.resolve(new Error('Failed to fetch')),
      }));
    const { queryByText } = render(<App />);

    expect(queryByText(/Failed to fetch/i)).not.toBeInTheDocument();

    await wait();

    expect(queryByText(/Loading.../i)).not.toBeInTheDocument();
    expect(queryByText(/Failed to fetch/i)).toBeInTheDocument();
  });
  test('mocking API - success case', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve({
          results: [...dataResults],
        }),
      }));
    const { queryByText } = render(<App />);

    await wait();

    expect(queryByText('Alderaan')).toBeInTheDocument();
  });
});

describe('functionality test', () => {
  test('type planets and filter', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve({
          results: [...dataResults],
        }),
      }));
    const { getByTestId, queryByText } = render(<App />);

    await wait();
    const inputPlanet = getByTestId('inputPlanets');
    fireEvent.change(inputPlanet, { target: { value: 'yavin' } });
    expect(queryByText('Yavin IV')).toBeInTheDocument();
    await wait();
    expect(queryByText('Alderaan')).not.toBeInTheDocument();
    expect(queryByText('Tatooine')).not.toBeInTheDocument();
    expect(queryByText('Hoth')).not.toBeInTheDocument();
    expect(queryByText('Dagobah')).not.toBeInTheDocument();
    expect(queryByText('Bespin')).not.toBeInTheDocument();
    expect(queryByText('Naboo')).not.toBeInTheDocument();
    expect(queryByText('Coruscant')).not.toBeInTheDocument();
    expect(queryByText('Endor')).not.toBeInTheDocument();
    expect(queryByText('Kamino')).not.toBeInTheDocument();
  });
  test('use dropdowns and filter', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve({
          results: [...dataResults],
        }),
      }));
    const { queryByTestId, getByText, queryByText } = render(<App />);

    await wait();
    const createFilter = getByText('Filter!');
    const columnSelector = queryByTestId('columnSelector');
    const comparisonSelector = queryByTestId('comparisonSelector');
    const numberSelector = queryByTestId('numberSelector');
    expect(createFilter).toBeInTheDocument();
    fireEvent.change(columnSelector, { target: { value: 'rotation_period' } });
    expect(columnSelector.value).toBe('rotation_period');
    fireEvent.change(comparisonSelector, { target: { value: 'equal to' } });
    expect(comparisonSelector.value).toBe('equal to');
    fireEvent.change(numberSelector, { target: { value: '12' } });
    expect(numberSelector.value).toBe('12');
    fireEvent.click(createFilter);
    await wait();
    expect(getByText('Bespin')).toBeInTheDocument();
    expect(queryByText('Yavin IV')).not.toBeInTheDocument();
    expect(queryByText('Alderaan')).not.toBeInTheDocument();
    expect(queryByText('Tatooine')).not.toBeInTheDocument();
    expect(queryByText('Hoth')).not.toBeInTheDocument();
    expect(queryByText('Dagobah')).not.toBeInTheDocument();
    expect(queryByText('Naboo')).not.toBeInTheDocument();
    expect(queryByText('Coruscant')).not.toBeInTheDocument();
    expect(queryByText('Endor')).not.toBeInTheDocument();
    expect(queryByText('Kamino')).not.toBeInTheDocument();
  });
  test('ascending/descending', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve({
          results: [...dataResults],
        }),
      }));
    const { getByText } = render(<App />);

    await wait();
    expect(getByText('Descending')).toBeInTheDocument();
    fireEvent.click(getByText('Descending'));
    expect(getByText('Ascending')).toBeInTheDocument();
  });
  test('no more filters', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve({
          results: [...dataResults],
        }),
      }));
    const { getByText, queryByTestId } = render(<App />);
    await wait();
    const createFilter = getByText('Filter!');
    const columnSelector = queryByTestId('columnSelector');
    const comparisonSelector = queryByTestId('comparisonSelector');
    const numberSelector = queryByTestId('numberSelector');
    fireEvent.change(columnSelector, { target: { value: 'population' } });
    fireEvent.change(comparisonSelector, { target: { value: 'equal to' } });
    fireEvent.change(numberSelector, { target: { value: '12' } });
    fireEvent.click(createFilter);
    await wait();
    fireEvent.change(columnSelector, { target: { value: 'population' } });
    fireEvent.change(comparisonSelector, { target: { value: 'equal to' } });
    fireEvent.change(numberSelector, { target: { value: '12' } });
    fireEvent.click(createFilter);
    fireEvent.change(columnSelector, { target: { value: 'orbital_period' } });
    fireEvent.change(comparisonSelector, { target: { value: 'equal to' } });
    fireEvent.change(numberSelector, { target: { value: '12' } });
    fireEvent.click(createFilter);
    fireEvent.change(columnSelector, { target: { value: 'diameter' } });
    fireEvent.change(comparisonSelector, { target: { value: 'equal to' } });
    fireEvent.change(numberSelector, { target: { value: '12' } });
    fireEvent.click(createFilter);
    fireEvent.change(columnSelector, { target: { value: 'rotation_period' } });
    fireEvent.change(comparisonSelector, { target: { value: 'equal to' } });
    fireEvent.change(numberSelector, { target: { value: '12' } });
    fireEvent.click(createFilter);
    fireEvent.change(columnSelector, { target: { value: 'surface_water' } });
    fireEvent.change(comparisonSelector, { target: { value: 'equal to' } });
    fireEvent.change(numberSelector, { target: { value: '12' } });
    fireEvent.click(createFilter);
    expect(getByText('No more filters available!')).toBeInTheDocument();
  });
  test('deleting one filter', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve({
          results: [...dataResults],
        }),
      }));
    const { getByText, queryByText, queryByTestId } = render(<App />);
    await wait();
    const createFilter = getByText('Filter!');
    const columnSelector = queryByTestId('columnSelector');
    const comparisonSelector = queryByTestId('comparisonSelector');
    const numberSelector = queryByTestId('numberSelector');
    expect(createFilter).toBeInTheDocument();
    fireEvent.change(columnSelector, { target: { value: 'rotation_period' } });
    fireEvent.change(comparisonSelector, { target: { value: 'equal to' } });
    fireEvent.change(numberSelector, { target: { value: '12' } });
    fireEvent.click(createFilter);
    await wait();
    const deleteFilter = queryByTestId('deleteFilter');
    expect(getByText('Bespin')).toBeInTheDocument();
    expect(queryByText('Yavin IV')).not.toBeInTheDocument();
    expect(deleteFilter).toBeInTheDocument();
    fireEvent.click(deleteFilter);
    await wait();
    expect(queryByText('Yavin IV')).toBeInTheDocument();
  });
});
