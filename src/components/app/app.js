import React, { Component } from 'react';

import AppHeader from '../../components/app-header';
import SearchPanel from '../../components/search-panel';
import TodoList from '../../components/todo-list';
import ItemStatusFilter from '../../components/item-status-filter';
import ItemAddForm from '../../components/item-add-form';

import './app.css';

export default class App extends Component {

	id = 0;

	constructor() {
		super();
		this.state = {
			todoData: [
				this.createTodoItem('Drink Coffe'),
				this.createTodoItem('Make Awesome App'),
				this.createTodoItem('Have a lunch')
			],
			searchString: '',
			filter: 'all' // active, all, done
		};
	}

	createTodoItem(label) {
		return {
			id: this.id++,
			label,
			important: false,
			done: false
		}
	}

	deleteItem = (id) => {
		this.setState(({ todoData }) => {
			return {
				todoData: todoData.filter(item => item.id !== id)
			};
		});
	};

	addItem = (text) => {
		this.setState(({ todoData }) => {
			const newTodoData = [...todoData, this.createTodoItem(text)];
			return {
				todoData: newTodoData
			};
		});
	}

	searchItem(items, searchString) {
		if (searchString === '') {
			return items;
		}

		return items.filter(item => item.label.toLowerCase().indexOf(searchString.toLowerCase()) !== -1)
	}

	filterItem(items, filter) {
		switch(filter) {
			case 'all':
				return items;
			case 'active':
				return items.filter(item => !item.done);
			case 'done':
				return items.filter(item => item.done);
			default:
				return items;
		}
	}

	changeSearchString = (searchString) => {
		this.setState({
			searchString
		});
	};

	changeFilter = (filter) => {
		this.setState({
			filter
		});
	}

	togleProperty(arr, id, propName) {
		const itemChangeIndex = arr.findIndex(item => item.id === id);
			let newTodoData = [...arr];
			newTodoData[itemChangeIndex][propName] = !newTodoData[itemChangeIndex][propName]
			return newTodoData;
	}

	toggleImportant = (id) => {
		this.setState(({ todoData }) => {
			return { 
				todoData:	this.togleProperty(todoData, id, 'important') 
			};
		});
	};

	toggleDone = (id) => {
		this.setState(({ todoData }) => {
			return { 
				todoData: this.togleProperty(todoData, id, 'done')
			};
		});
	};

	render() {

		const { todoData, searchString, filter } = this.state;

		const doneCount = todoData
												.filter(item => item.done).length;
		const toDoCount = todoData.length - doneCount;

		const visableItems = this.filterItem(this.searchItem(todoData, searchString), filter);

		return (
			<div className="todo-app">
				<AppHeader toDo={toDoCount} done={doneCount} />
				<div className="top-panel d-flex">
					<SearchPanel onChangeSearchString={ this.changeSearchString } />
					<ItemStatusFilter 
						filter={filter}
						onFiltetChange={ this.changeFilter } />
				</div>

				<TodoList 
					todos={ visableItems }
					onDeleted={ this.deleteItem }
					onTogleDone={ this.toggleDone }
					onTogleImportant={ this.toggleImportant } />
				<ItemAddForm onAddItem={ this.addItem } />
			</div>
		);
	}
}