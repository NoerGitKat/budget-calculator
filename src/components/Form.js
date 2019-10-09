import React from 'react';
import { MdSend } from 'react-icons/md';

const Form = ({ singleCharge, updateSingleCharge, updateSingleAmount, singleAmount, handleSubmit, editMode }) => {
	return (
		<form onSubmit={handleSubmit}>
			<div className="form-center">
				<div className="form-group">
					<label htmlFor="charge">Charge</label>
					<input
						type="text"
						className="form-control"
						id="charge"
						name="charge"
						placeholder="e.g. rent, phone, car insurance"
						value={singleCharge}
						onChange={updateSingleCharge}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="amount">Amount</label>
					<input
						type="number"
						className="form-control"
						id="amount"
						name="amount"
						placeholder="e.g. 100"
						value={singleAmount}
						onChange={updateSingleAmount}
					/>
				</div>
			</div>
			<button type="submit" className="btn">
				{editMode ? 'Edit' : 'Submit'}
				<MdSend className="btn-icon" />
			</button>
		</form>
	);
};

export default Form;
