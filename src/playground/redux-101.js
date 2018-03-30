import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

//ADD_EXPENSE
const addExpense = (
  {
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
   } = {}
  ) => ({
  type: 'ADD_EXPENSE',
  expense: {
    description,
    amount,
    note,
    createdAt,
    id: uuid()
  }
});

//Expenses Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch(action.type) {
    case 'ADD_EXPENSE':
    return [ ...state, action.expense];
    default:
      return state;
  }
};

//Filters Reducer

//Store creation

const store = createStore(combineReducers({
  expenses: expensesReducer
  // filters: filtersReducer
}));


store.subscribe(() => {
  console.log(store.getState());
});

const expenseOne = store.dispatch(addExpense({
  description: 'Rent',
  amount: 300
}));

const expenseTwo = store.dispatch(addExpense({ description: 'Water Bill', amount: 130 }));

const expenseThree = store.dispatch(addExpense({ description: 'Coffee', amount: 300 }));