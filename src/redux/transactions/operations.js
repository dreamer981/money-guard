
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Tüm işlemleri çek
export const fetchTransactions = createAsyncThunk(
  'transactions/fetchAll',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token; 
      setAuthHeader(token);
      const response = await axios.get('/transactions');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Yeni işlem ekle
export const addTransaction = createAsyncThunk(
  'transactions/add',
  async (transactionData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      setAuthHeader(token);
      const response = await axios.post('/transactions', transactionData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// İşlem sil
export const deleteTransaction = createAsyncThunk(
  'transactions/delete',
  async (transactionId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      setAuthHeader(token);
      await axios.delete(`/transactions/${transactionId}`);
      return transactionId; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateTransaction = createAsyncThunk(
  "transactions/updateTransaction",
  async ({ transactionId, transaction }, thunkAPI) => {
    try {
      const res = await axios.patch(
        `/transactions/${transactionId}`,
        transaction
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const transactionCategories = createAsyncThunk(
  "transactions/transactionCategories",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/transaction-categories");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const transactionSummary = createAsyncThunk(
  "transactions/transactionSummary",
  async ({ month, year }, thunkAPI) => {
    try {
      const res = await axios.get(
        `/transactions-summary?month=${month}&year=${year}`
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
