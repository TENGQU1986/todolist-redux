import { createStore } from 'redux';
import uuid from 'uuid';

// const incrementCount = ({ incrementBy = 1 } = {}) => ({
//   type: 'INCREMENT',
//   incrementBy
// });

// const store = createStore((state = { count : 0 }, action) => {
//   switch (action.type) {
//     case 'INCREMENT':
//       return {
//         count: state.count + action.incrementBy
//       };
//     case 'DECREMENT': 
//       return {
//         count: state.count - 1
//       };
//     default:
//       return state;
//   }
  
  
// });

// store.subscribe(() => {
//   console.log(store.getState());
// })



// store.dispatch({
//   type: 'INCREMENT',
//   incrementBy: 5
// })

// store.dispatch({
//   type: 'DECREMENT'
// })
// store.dispatch({
//   type: 'DECREMENT'
// })

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'data',
  startDate: undefined,
  endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch(action.type) {
    default: 
      return state;
  }
};

const store = createStore(expensesReducer);

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch(action.type) {
    case 'ADD_EXPENSE': 
      return [
        ...state,
        action.expense
      ]
    default: 
      return state;
  };
};



// set ADD_EXPENSE action

const addExpense = ({ 
  description = '',
  note = '',
  amount = 0, 
  createdAt = 0
} = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    amount,
    note,
    createdAt
  }
});



store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(addExpense({ description : 'Rent', amount : 300}));