import React from 'react';
import { connect } from 'react-redux';


const renderListItem = (props) => (
  <div>
    <h1>To Do List</h1>
    {props.expenses.length}
  </div>
);

const mapStateToProps = (state) => {
  return {
    expenses: state.expenses
  };
};

export default connect(mapStateToProps)(renderListItem);

<select value={props.filters.sortBy} onChange={() => {
  props.dispatch(props.filters.sortBy === 'date' ? sortByDate() : sortByAmount());
}}>
  <option value="date">Date</option>
  <option value="amount">Amount</option>
</select>