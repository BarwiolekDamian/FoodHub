import Login from './views/Login';
import Welcome from './views/Welcome';
import Register from './views/Register';
import Dashboard from './views/Dashboard';
import EditProfile from './views/EditProfile';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App()
{
	return (
		<Router>
			<Routes>
				<Route path = "/" element = { <Welcome/> } />
				<Route path = "*" element = { <Welcome/> } />
				<Route path = "/login" element = { <Login/> } />
				<Route path = "/register" element = { <Register/> } />
				<Route path = "/dashboard" element = { <Dashboard/> } />
				<Route path = "/edit-profile" element = { <EditProfile/> } />
			</Routes>
		</Router>
	);
}

export default App;