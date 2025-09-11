import "./main.scss"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast';

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<App />
		<Toaster
			position="top-right"
			
			containerStyle={{
				top: 80,   // ⬇️ push the whole stack down
			}}
		/>
	</StrictMode>,
)
