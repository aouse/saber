import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from '@/store/slices/dashboardSlice';
import { usePatternsLogic } from './usePatternsLogic';

describe('usePatternsLogic', () => {
  function setup() {
    const store = configureStore({
      reducer: { dashboard: dashboardReducer },
    });
    const wrapper = ({ children }: { children?: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );
    return { store, wrapper };
  }

  it('should initialize with default state', () => {
    const { wrapper } = setup();
    const { result } = renderHook(() => usePatternsLogic(), { wrapper });
    expect(result.current.showEdit).toBe(false);
  });

  it('handleEditPattern updates selectedPattern and confirmationText', () => {
    const { store, wrapper } = setup();
    // Add a pattern to the store first
    act(() => {
      store.dispatch({
        type: 'dashboard/addPattern',
        payload: { pattern: '\\d+', terms: ['123'], name: 'Numbers', id: 'test-id' },
      });
    });

    const { result } = renderHook(() => usePatternsLogic(), { wrapper });

    act(() => {
      result.current.handleEditPattern('\\w+', 'Words', 'test-id');
    });

    expect(result.current.selectedPattern).toEqual({
      id: 'test-id',
      regex: '\\w+',
      name: 'Words',
    });
    expect(result.current.confirmationText).toBe('Pattern edited');
  });
});