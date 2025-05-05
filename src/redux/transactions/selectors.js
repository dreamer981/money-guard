export const selectTransactions = (state) => state.transactions.items;

export const selectIsLoading = (state) => state.transactions.isLoading;

export const selectError = (state) => state.transactions.error;

export const selectCategories = (state) => state.transactions.categories;

export const selectSummary = (state) => state.transactions.summary;
