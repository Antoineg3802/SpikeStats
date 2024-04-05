import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider as DarkThemeProvider } from './context/ThemeContext';

// Import global styles
import './index.css';

// Functions import
import reportWebVitals from './reportWebVitals';

// Pages import
import HomePage from './components/pages/HomePage';
import NotFound from './components/pages/NotFound';
import CreateAccount from './components/pages/CreateAccount';
import Dashboard from './components/pages/Dashboard';
import LogIn from './components/pages/LogIn';
import Pricing from './components/pages/Pricing';

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
		element: <Dashboard />,
	},
	{
		path: "/login",
		element: <LogIn />
	},
	{
		path: "/pricing",
		element: <Pricing />
	},
	{
		path: "*",
		element: <NotFound />
	},
]);


const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<DarkThemeProvider>
			<RouterProvider router={router} />
		</DarkThemeProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
