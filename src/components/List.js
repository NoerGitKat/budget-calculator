import React, { Fragment } from 'react';
import { MdDelete } from 'react-icons/md';
import Item from './Item';

const List = ({ expenses, deleteExpense, clearExpenses, editExpense }) => {
	return (
		<Fragment>
			<ul>
				{expenses.map((expense, index) => (
					<Item key={index} expense={expense} deleteExpense={deleteExpense} editExpense={editExpense} />
				))}
			</ul>
			{expenses.length > 0 ? (
				<button className="btn" onClick={() => clearExpenses()}>
					Clear List
					<MdDelete className="btn-icon" />
				</button>
			) : null}
		</Fragment>
	);
};

export default List;
