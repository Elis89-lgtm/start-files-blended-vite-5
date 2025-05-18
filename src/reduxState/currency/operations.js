import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfo } from '../../service/opencagedataApi';
import { exchangeCurrency, latestRates } from '../../service/exchangeAPI';

export const fetchBaseCurrency = createAsyncThunk(
  'currency/fetchBaseCurrecy',
  async (coords, thunkApi) => {
    const state = thunkApi.getState();
    const { baseCurrency } = state.currency;
    if (baseCurrency) {
      return thunkApi.rejectWithValue('we have base currency');
    }
    try {
      const data = await getUserInfo(coords);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
export const fetchExchangeInfo = createAsyncThunk(
  'currency/fetchExchangeInfo',
  async (cred, thunkApi) => {
    try {
      const data = await exchangeCurrency(cred);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
export const fetchLatestSymbols = createAsyncThunk(
  'currency/fetchLatestSymbols',
  async (baseCurrency, thunkApi) => {
    try {
      const data = await latestRates(baseCurrency);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
