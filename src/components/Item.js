import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';

const Item = ({ expense, deleteExpense, editExpense }) => {
	const { id, charge, amount } = expense;
	return (
		<li className="item">
			<div className="info">
				<span className="expense">Charge: {charge}</span>
				<span className="amount"> Amount: ${amount}</span>
			</div>
			<div>
				<button className="edit-btn" aria-label="Edit Button" onClick={() => editExpense(id)}>
					<MdEdit />
				</button>
				<button className="clear-btn" aria-label="Delete Button" onClick={() => deleteExpense(id)}>
					<MdDelete />
				</button>
			</div>
		</li>
	);
};

export default Item;
