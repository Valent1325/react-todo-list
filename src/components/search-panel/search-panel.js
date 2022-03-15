import React, { Component } from 'react';
import './search-panel.css';

export default class SearchPane extends Component {

  state = {
    search: ''
  }

  search = (e) => {
    e.preventDefault();
    const search = e.target.value
    this.setState({
      search
    });
    this.props.onChangeSearchString(search);
  }

  render () {
    return (
      <input 
        className='form-control search-input' 
        placeholder="search"
        value={this.state.search}
        onChange={ this.search } />
    );
  }
}