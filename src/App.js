import React, { useState, useEffect } from 'react';
import uuidv4 from 'uuid';

// Styles
import './App.css';

// Components
import Form from './components/Form';
import Alert from './components/Alert';
import List from './components/List';

const parsedExpenses = JSON.parse(localStorage.getItem('expenses'));

const initialExpenses = localStorage.getItem('expenses') ? parsedExpenses : [];

function App() {
	/* State values */
	// All expenses, add expense
	const [expenses, setExpenses] = useState(initialExpenses);

	// Single charge
	const [singleCharge, setSingleCharge] = useState('');

	// Single amount
	const [singleAmount, setSingleAmount] = useState('');

	// Show alert
	const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

	// Edit mode
	const [editMode, setEditMode] = useState(false);

	const [editedExpenseId, setEditedExpenseId] = useState(null);

	useEffect(() => {
		const stringifiedExpenses = JSON.stringify(expenses);
		localStorage.setItem('expenses', stringifiedExpenses);
	}, [expenses]);

	/* Functionality */
	// Update singleCharge
	const updateSingleCharge = event => {
		const { value } = event.target;
		setSingleCharge(value);
	};

	// Update singleAmount
	const updateSingleAmount = event => {
		const { value } = event.target;
		setSingleAmount(value);
	};

	// Submit form
	const handleSubmit = event => {
		event.preventDefault();
		if (singleCharge !== '' && singleAmount > 0) {
			if (editMode) {
				// Replace expense with edited expense if id is equal
				const editedExpenses = expenses.map(expense => {
					return expense.id === editedExpenseId
						? { ...expense, charge: singleCharge, amount: singleAmount }
						: expense;
				});
				setExpenses(editedExpenses);
				setEditMode(false);
				alertUser({ type: 'success', msg: 'Expense is successfully edited!' });
			} else {
				const newExpense = { id: uuidv4(), charge: singleCharge, amount: singleAmount };
				setExpenses([...expenses, newExpense]);
				alertUser({ type: 'success', msg: 'Yeahh it is added' });
			}
			setSingleCharge('');
			setSingleAmount('');
		} else {
			// Error handling: Alert
			alertUser({ type: 'danger', msg: 'You fucked up, son' });
		}
	};

	const alertUser = ({ type, msg }) => {
		setAlert({ show: true, type, msg });
		setTimeout(() => {
			setAlert({ show: false });
		}, 8000);
	};

	const deleteExpense = id => {
		const filteredExpenses = expenses.filter(expense => expense.id !== id);
		setExpenses(filteredExpenses);
		alertUser({ type: 'success', msg: 'Deleted expense' });
	};

	const editExpense = id => {
		const foundExpense = expenses.find(expense => expense.id === id);
		setSingleCharge(foundExpense.charge);
		setSingleAmount(foundExpense.amount);
		setEditedExpenseId(foundExpense.id);
		setEditMode(true);
	};

	const clearExpenses = () => {
		setExpenses([]);
		alertUser({ type: 'success', msg: 'You are free again! Now dont fuck it up' });
	};

	return (
		<div>
			{alert.show ? <Alert msg={alert.msg} type={alert.type} /> : null}
			<h1>Budget Calculator</h1>
			<main className="App">
				<Form
					singleCharge={singleCharge}
					singleAmount={singleAmount}
					updateSingleCharge={updateSingleCharge}
					updateSingleAmount={updateSingleAmount}
					handleSubmit={handleSubmit}
					editMode={editMode}
				/>
				<List
					expenses={expenses}
					deleteExpense={deleteExpense}
					editExpense={editExpense}
					clearExpenses={clearExpenses}
				/>
			</main>
			<h1>
				Total spending:{' '}
				<span className="total">
					${' '}
					{expenses.reduce((accumulator, currentValue) => {
						return (accumulator += parseInt(currentValue.amount));
					}, 0)}
				</span>
			</h1>
		</div>
	);
}

export default App;
