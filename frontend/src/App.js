import Login from './views/Login';
import Welcome from './views/Welcome';
import Register from './views/Register';
import Dashboard from './views/Dashboard';
import AddRecipe from './views/AddRecipe';
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
				<Route path = "/add-public-recipe" element = { <AddRecipe accessType = 'PUBLIC' /> } />
				<Route path = "/add-private-recipe" element = { <AddRecipe accessType = 'PRIVATE' /> } />
			</Routes>
		</Router>
	);
}

export default App;