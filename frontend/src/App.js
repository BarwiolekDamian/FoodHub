import Login from './views/Login'
import Welcome from './views/Welcome'
import Register from './views/Register'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App()
{
	return (
		<Router>
			<Routes>
				<Route path = "/" element = { <Welcome/> } />
				<Route path = "*" element = { <Welcome/> } />
				<Route path = "/login" element = { <Login/> } />
				<Route path = "/register" element = { <Register/> } />
			</Routes>
		</Router>
	);
}

export default App;