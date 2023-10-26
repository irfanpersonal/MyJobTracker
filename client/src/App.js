import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {AddJob, AllJobs, Auth, Error, HomeLayout, Landing, Profile, ProtectedRoute, Stats} from './pages';

const router = createBrowserRouter([
	{
		path: '/',
		element: <ProtectedRoute><HomeLayout/></ProtectedRoute>,
		errorElement: <Error/>,
		children: [
			{
				index: true,
				element: <Stats/>
			},
			{
				path: 'all-jobs',
				element: <AllJobs/>
			},
			{
				path: 'add-job',
				element: <AddJob/>
			},
			{
				path: 'profile',
				element: <Profile/>
			}
		]
	},
	{
		path: '/landing',
		element: <Landing/>,
		errorElement: <Error/>
	},
	{
		path: '/auth',
		element: <Auth/>,
		errorElement: <Error/>
	}
]);

const App = () => {
	return (
		<RouterProvider router={router}/>
	);
}

export default App;