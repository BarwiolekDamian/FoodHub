import Login from './views/Login';
import Welcome from './views/Welcome';
import Register from './views/Register';
import Dashboard from './views/Dashboard';
import AddRecipe from './views/AddRecipe';
import ShowRecipe from './views/ShowRecipe';
import EditProfile from './views/EditProfile';
import BrowseRecipes from './views/BrowseRecipes';

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
				<Route path = "/recipe/:recipeId" element={ <ShowRecipe/> } />
				<Route path = "/add-public-recipe" element = { <AddRecipe accessType = 'PUBLIC' /> } />
				<Route path = "/add-private-recipe" element = { <AddRecipe accessType = 'PRIVATE' /> } />
				<Route path = "/my-public-recipes" element = { <BrowseRecipes accessType = 'PUBLIC' /> } />
				<Route path = "/my-private-recipes" element = { <BrowseRecipes accessType = 'PRIVATE' /> } />
			</Routes>
		</Router>
	);
}

export default App;