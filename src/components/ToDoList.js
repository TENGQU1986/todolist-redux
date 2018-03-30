import React from 'react';
import { connect } from 'react-redux';


class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  };
  

  inputOnChange = (event) => {
    this.setState({value: event.target.value});
  }

  onSubmit = (e) => {
    e.preventDefault();
    store.dispatch.addNewItem({value: 234});
    console.log(value);
  }

  render() {
    return (
      <div>
        <div>Here is my todolist</div>
        <input type="text" placeholder="input here" value={this.state.value} onChange={this.inputOnChange}></input>
        <button onClick={this.onSubmit}>Add New</button>
      </div>
    );
  }
}



export default ToDoList;