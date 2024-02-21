import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
	const [datas, setDatas] = React.useState<any[]>([]);

	React.useEffect(() => {
		fetch("/users")
			.then((res) => res.json())
			.then((response: any) => {
				console.log(response)
				if (response.success){
					setDatas(response.data)
					console.log(datas)
				}else{
					console.log('error')
				}
			});
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				{datas.map(data =>
					<div key={data.id}>
						<p>{data.firstname}</p>
						<p>{data.lastname}</p>
						<p>{data.mail}</p>
						<p>{data.role}</p>
					</div>
				)}
			</header>
		</div>
	);
}

export default App;