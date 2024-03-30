import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import global styles
import './index.css';

// Functions import
import reportWebVitals from './reportWebVitals';
import { isAuthenticated } from './service/global/verifications';

// Pages import
import HomePage from './components/pages/HomePage';
import NotFound from './components/pages/NotFound';
import CreateAccount from './components/pages/CreateAccount';
import Dashboard from './components/pages/Dashboard';
import { theme } from './theme/theme';

import { ThemeContext } from '@emotion/react';

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
		path: "/dashboard",
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
		<ThemeContext.Provider value={theme} >
			<RouterProvider router={router} />
		</ThemeContext.Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
