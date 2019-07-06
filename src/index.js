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

	function updateState(requestIndex, headerIndex, header) {}

	const rs = requests.map((headers, requestIndex) => (
		<Request
			headers={headers}
			onChange={(header, headerIndex) =>
				updateState(requestIndex, headerIndex, headers)
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
