// import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useQuery } from "react-query";
import HTTPResponse from "./data/HTTPResponse";

const App = () => {
	const { data, isLoading, error } = useQuery<HTTPResponse>('/api/users', () =>
		fetch('/api/users')
			.then(res => res.json())
			.then(data => data)
	);

	if (isLoading) return <div>Loading...</div>;

	if (error) return <div>An error has occurred: " + {error.toString()}</div>;

	else {
		return (
			<div className="App">
				<img src={logo} className="App-logo" alt="logo" />
				{data && data.data.map((data) => (
					<div key={data.id}>
						<p>{data.firstname}</p>
						<p>{data.lastname}</p>
						<p>{data.mail}</p>
						<p>{data.role}</p>
					</div>
				))}
			</div>
		);
	}
}

export default App;