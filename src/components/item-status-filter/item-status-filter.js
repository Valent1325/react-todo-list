import React, { Component } from 'react';

export default class ItemStatusFilter extends Component {
  buttonsArr = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' }
  ];
  render() {

    const { filter, onFiltetChange } = this.props;

    const buttons = this.buttonsArr.map(({ label, name }) => {
      const isActive = filter === name;
      const btnClass = isActive ? 'btn-info' : 'btn-outline-info';
      return (
        <button
            key={name}
            type="button"
            className={`btn ${btnClass}`}
            onClick={() => onFiltetChange(name)}>
          {label}
        </button>
      );
    });

    return (
      <div className="btn-group">
        {buttons}
      </div>
    );
  }
}
