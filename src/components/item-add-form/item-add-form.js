import React, { Component } from 'react';
import './item-add-form.css';
import { render } from 'react-dom';

export default class ItemAddForm extends Component {

  state = {
    label: ''
  };

  onLabelChanged = (e) => {
    this.setState({
      label: e.target.value
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAddItem(this.state.label);
    this.setState({
      label: ''
    });
  };

  render() {
    return (
      <form className="item-add-form d-flex"
            onSubmit={ this.onSubmit }>
        <input type="text"
               className="form-conrtol"
               value={this.state.label}
               onChange={ this.onLabelChanged }
               placeholder="What needs to be done"/>
        <button  
          className="btn btn-outline-primary"
          >Add Item</button>
      </form>
    );
  }
}
