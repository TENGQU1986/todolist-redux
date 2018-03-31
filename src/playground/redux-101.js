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

//REMOVE_EXPENSE

const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

//EDIT_EXPENSE

const editExpense = ( id, updates ) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

//SET_TEXT_FILTER

const setTextFilter = (text = ' ') => ({
  type: 'SET_TEXT_FILTER',
  text
});

//SORT_BY_DATE

const sortByDate = () => ({
  type: 'SORT_BY_DATE'
});

//SORT_BY_AMOUNT

const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
});

//SET_START_DATE

const setStartData = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
});

//SET_END_DATE

const setEndData = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
});

//Expenses Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch(action.type) {
    case 'ADD_EXPENSE':
      return [ ...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id );
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          };
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
};

//Filters Reducer

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch(action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      };
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      };
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      };
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      };
    default:
      return state;
  }
};

//get visible expenses

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase()) ? true : false;
    

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt > b.createdAt ? 1 : -1;
    } else {
      return a.amount > b.amount ? -1 : 1;
    }
  });
};

// const getVisibleExpenses = (expenses, filters) => {
//   return expenses;
// };

//Store creation

const store = createStore(combineReducers({
  expenses: expensesReducer,
  filters: filtersReducer
}));


store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

// const expenseOne = store.dispatch(addExpense({
//   description: 'Rent',
//   amount: 300
// }));

const expenseTwo = store.dispatch(addExpense({ description: 'Rent', amount: 13000, createdAt: 1000 }));

const expenseThree = store.dispatch(addExpense({ description: 'Red Horse', amount: 30000, createdAt: -1000 }));

store.dispatch(addExpense({ description: 'AudiR8', amount: 1780000}));

// store.dispatch(removeExpense({ id : expenseOne.expense.id}));

// store.dispatch(editExpense( expenseThree.expense.id, { amount: 500 }));

// store.dispatch(setTextFilter('d'));
// store.dispatch(setTextFilter());

// store.dispatch(sortByAmount(125));
store.dispatch(sortByAmount());
// store.dispatch(sortByDate(1250));
// store.dispatch(sortByDate());

// store.dispatch(setStartData(125));
// store.dispatch(setStartData());
// store.dispatch(setEndData(250));