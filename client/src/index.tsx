import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';

// Pages import
import HomePage from './components/pages/HomePage';
import NotFound from './components/pages/NotFound';

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/tata",
		element: <HomePage />,
	},
	{
		path: "/tutu",
		element: <HomePage />,
	},
	{
		path: "*",
		element: <NotFound />
	}
]);


const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
