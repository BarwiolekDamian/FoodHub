import Error from './views/Error'
import Login from './views/Login'
import Register from './views/Register'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App()
{
	return (
		<Router>
			<Routes>
				<Route path = "/" element = { <Login/> } />
				<Route path = "/error" element = { <Error/> } />
				<Route path = "/login" element = { <Login/> } />
				<Route path = "/register" element = { <Register/> } />
			</Routes>
		</Router>
	);
}

export default App;