import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import { buildTables } from "./header";

function useInput(initial = "") {
	const [value, setValue] = useState(initial);

	return [value, event => setValue(event.target.value)];
}

function Request({ headers, previous, onChange }) {
	return headers.map(v => (
		<div>
			name: {v.name}, value: {v.value}
		</div>
	));
}

function reducer(state, action) {}

function App() {
	const [requests, setRequests] = useState([
		[
			{
				name: "",
				value: ""
			}
		]
	]);

	const tables = buildTables(requests);

	console.log(tables, requests);

	function updateState(requestIndex, headerIndex, header) {
		setRequests(requests => {
			const headers = requests[requestIndex];

			return [
				...requests.slice(0, requestIndex),
				[
					...headers.slice(0, headerIndex),
					header,
					...headers.slice(headerIndex + 1),
				],
				...requests.slice(requestIndex + 1)
			];
		});
	}

	const rs = requests.map((headers, requestIndex) => (
		<Request
			key={requestIndex}
			headers={headers}
			onChange={(header, headerIndex) =>
				updateState(requestIndex, headerIndex, header)
			}
		/>
	));

	return (
		<div>
			<h3>app</h3>

			{rs}
		</div>
	);
}

ReactDOM.render(<App />, document.getElementById("app"));
