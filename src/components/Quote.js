import React from 'react';
import { useState } from 'react';

export default function Quote(props) {
	let {
		basis,
		includedSeats,
		includedComputations,
		perAuthor,
		perOperator,
		perComputation,
		displayMultitenant,
		maxSeats
	} = props.props;
	const [seats, changeSeats] = useState(includedSeats);
	const [seatsOperator, changeSeatsOperator] = useState(0);
	const [computations, changeComputations] = useState(includedComputations);
	const [multitenant, changeMultitenant] = useState('multi');

	const handleChangeSeats = (e) => {
		if (maxSeats && e.target.value > maxSeats) {
			e.target.value = maxSeats;
		}
		changeSeats(e.target.value);
	};
	const handleChangeSeatsOp = (e) => {
		if (maxSeats && e.target.value > maxSeats) {
			e.target.value = maxSeats;
		}
		changeSeatsOperator(e.target.value);
	};
	const handleChangeComp = (e) => changeComputations(e.target.value);
	const handleChangeMulti = (e) => changeMultitenant(e.target.value);
	function quote() {
		return Math.floor(
			basis +
				Math.min(maxSeats ?? 999999, Math.max(0, seats - includedSeats)) * perAuthor +
				Math.max(0, seatsOperator) * perOperator +
				Math.max(0, computations - includedComputations) * perComputation +
				(multitenant === 'multi' ? 0 : multitenant === 'dedicated' ? 400 : 4000)
		);
	}
	return (
		<div className="mt-6 flex flex-col gap-2 font-semibold">
			<h3 className="text-2xl mb-4 font-bold text-center">Estimate Cost</h3>
			<div className="flex justify-between gap-2 items-center ">
				<div># of authors:</div>
				<input
					className="w-20"
					min={includedSeats}
					max={maxSeats}
					type="number"
					value={seats}
					onChange={handleChangeSeats}
				></input>
			</div>
			<div className="flex justify-between gap-2 items-center ">
				<span># of operators:</span>
				<input
					className="w-20"
					min={0}
					max={maxSeats}
					type="number"
					value={seatsOperator}
					onChange={handleChangeSeatsOp}
				></input>
			</div>
			<div className="flex justify-between gap-2 items-center ">
				<span># of computations:</span>
				<input
					className="w-36"
					min={includedComputations}
					type="number"
					value={computations}
					onChange={handleChangeComp}
				></input>
			</div>
			{displayMultitenant ? (
				<select value={multitenant} onChange={handleChangeMulti} className="w-full mt-2">
					<option value={'multi'}>Multi-tenant</option>
					<option value={'dedicated'}>Dedicated isolated workers and database</option>
					<option value={'cluster'}>Dedicated cluster</option>
				</select>
			) : (
				<div className="mt-12" />
			)}
			<div className="mt-4 text-xl text-center">${quote()}/mo</div>
		</div>
	);
}
