import React, { useEffect, useState } from 'react';
// import Link from 'react-router-dom';
import { Route, Link } from 'react-router-dom';
import AddTodo from './AddTodo';
import axios from 'axios';
import {
	MdDeleteForever,
	MdOutlineDone,
	MdEdit,
	MdUndo
} from 'react-icons/md';

const TodoList = ({setCount, count}) => {
	const [todos, setTodos] = useState([]);
	// const [count, setCount] = useState([]);

	const url = 'https://safe-springs-78643.herokuapp.com/api/todos';

	const handleAddTodo = (todo) => {
		setCount([...count, '']);

	};
	// const updateTodo = async (event) => {
	// 	console.log(event.target.id);


	// 	axios
	// 		.get(`https://safe-springs-78643.herokuapp.com/api/todos`)
	// 		.then((response) => {
	// 			setTodos(response.data);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// };

	// const id = todos._id;
	// console.log(id);

	const deleteTodo = async (event) => {
		console.log(event.target.id);

		await axios.delete(
			`https://safe-springs-78643.herokuapp.com/api/todos/${event.target.id}`
		);

		axios
			.get(`https://safe-springs-78643.herokuapp.com/api/todos`)
			.then((response) => {
				setTodos(response.data);
				setCount([...count, '']);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const completeTodo = (todo) => {
		console.log(todo)
		let id = todo.target.id;

		axios.put(`https://safe-springs-78643.herokuapp.com/api/todos/${id}`, {
				completed: completed === false ? true : false,
			})
		
			axios
			.get(`https://safe-springs-78643.herokuapp.com/api/todos`)
			.then((response) => {
				setTodos(response.data);
				setCount([...count, '']);
			})
			.catch((err) => {
				console.log(err);
			})
		
	}
		
	

	useEffect(() => {
		function getData() {
			fetch(url)
				.then((res) => res.json())
				.then((json) => {
					console.log(json);
					setTodos(json);
				})
				.catch((err) => console.log(err));
		}
		getData();
	}, [count]);

	let veryHighP = todos.filter(
		(todo) => todo.priority === 'Very High' && todo.completed === false
	);
	let highP = todos.filter(
		(todo) => todo.priority === 'High' && todo.completed === false
	);
	let mediumP = todos.filter(
		(todo) => todo.priority === 'Medium' && todo.completed === false
	);
	let lowP = todos.filter(
		(todo) => todo.priority === 'Low' && todo.completed === false
	);
	let completed = todos.filter((todo) => todo.completed === true);

	return (
		<div className='todoContainer'>
			<div className='veryHigh'>
				<h3>Very High Priority</h3>
				<ul className='priorities'>
					{veryHighP.map((todo, index) => (
						// console.log(todo)
						<li key={`${todo} - ${index}`}>
							{todo.content}
							<Link to={`/TodoList/${todo._id}`}>
								<MdEdit className='update' />
							</Link>
							<span>
								<MdDeleteForever
									className='delete-icon'
									id={todo._id}
									onClick={deleteTodo}
								/>
							</span>
							<span>
								<MdOutlineDone
									className='delete-icon'
									id={todo._id}
									onClick={completeTodo}
								/>
							</span>
						</li>
					))}
				</ul>
			</div>
			<div className='high'>
				<h3>High Priority</h3>
				<ul className='priorities'>
					{highP.map((todo, index) => (
						<li key={`${todo} - ${index}`}>
							{todo.content}
							<Link to={`/TodoList/${todo._id}`}>
								<MdEdit className='update' />
							</Link>

							<MdDeleteForever
								className='delete-icon'
								id={todo._id}
								onClick={deleteTodo}
							/>

							<MdOutlineDone
								className='delete-icon'
								id={todo._id}
								onClick={completeTodo}
							/>
						</li>
					))}
				</ul>
			</div>
			<div className='medium'>
				<h3>Medium Priority</h3>
				<ul className='priorities'>
					{mediumP.map((todo, index) => (
						<li key={`${todo} - ${index}`}>
							{todo.content}
							<Link to={`/TodoList/${todo._id}`}>
								<MdEdit className='update' />
							</Link>

							<MdDeleteForever
								className='delete-icon'
								id={todo._id}
								onClick={deleteTodo}
							/>

							<MdOutlineDone
								className='delete-icon'
								id={todo._id}
								onClick={completeTodo}
							/>
						</li>
					))}
				</ul>
			</div>
			<div className='low'>
				<h3>Low Priority</h3>
				<ul className='priorities'>
					{lowP.map((todo, index) => (
						<li key={`${todo} - ${index}`}>
							{todo.content}
							<Link to={`/TodoList/${todo._id}`}>
								<MdEdit className='update' />
							</Link>

							<MdDeleteForever
								className='delete-icon'
								id={todo._id}
								onClick={deleteTodo}
							/>

							<MdOutlineDone
								className='delete-icon'
								id={todo._id}
								onClick={completeTodo}
							/>
						</li>
					))}
				</ul>
			</div>
			<div className='completed'>
				<h3>Completed</h3>
				<ul className='priorities'>
					{completed.map((todo, index) => (
						<li key={`${todo} - ${index}`}>
							{todo.content}
							<MdUndo
								className='delete-icon'
								id={todo._id}
								onClick={completeTodo}
							/>
							<MdDeleteForever
								className='delete-icon'
								id={todo._id}
								onClick={deleteTodo}
							/>

						</li>
					))}
				</ul>
			</div>
			<AddTodo setTodos={setTodos} handleAddTodo={handleAddTodo} />
		</div>
	);
					};

export default TodoList;
