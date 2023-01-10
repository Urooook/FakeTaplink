import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'

import store from './store'
import App from './App/App'

import Loader from './components/Loader/Loader'

import './index.css'

const PageLoader = () => (
	<div className="pre-loader-container">
		<Loader />
	</div>
)

ReactDOM.createRoot(document.getElementById('fakeTaplinkRoot')!).render(
	<BrowserRouter>
		<Provider store={store}>
			<Suspense fallback={<PageLoader />}>
				<App />
			</Suspense>
		</Provider>
	</BrowserRouter>,
)
