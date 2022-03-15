import React from 'react';

import TodoListItem from '../todo-list-item';
import './todo-list.css';

const TodoList = ({ todos, onDeleted, onTogleImportant, onTogleDone }) => {

	const liElements = todos.map(item => {

		const { id , ...itemProps } = item;

		return (
			<li key={id} className="list-group-item">
				<TodoListItem 
					{ ...itemProps }
					onDeleted={() => onDeleted(id)}
					onTogleDone={() => onTogleDone(id)}
					onTogleImportant={() => onTogleImportant(id)} />
			</li>
		);
	});

	return (
		<ul className="list-group todo-list">
			{liElements}
		</ul>
	);
};

export default TodoList;