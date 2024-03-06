import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import global styles
import './index.css';

import reportWebVitals from './reportWebVitals';

// Pages import
import HomePage from './components/pages/HomePage';
import NotFound from './components/pages/NotFound';
import CreateAccount from './components/pages/CreateAccount';
import Dashboard from './components/pages/Dashboard';
import { isAuthenticated } from './service/global/verifications';

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/create-account",
		element: <CreateAccount />,
	},
	{
		path: "/dashbord",
		element: isAuthenticated() ? <Dashboard /> : <NotFound />
	},
	{
		path: "*",
		element: <NotFound />
	}
]);


const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
