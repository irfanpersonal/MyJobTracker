import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {AddJob, Auth, Error, Home, HomeLayout, Job, Landing, Profile, ProtectedRoute} from './pages';
import {useDispatch, useSelector} from 'react-redux';
import {useDispatchType, useSelectorType} from './store';
import {showCurrentUser} from './features/user/userThunk';
import {Loading} from './components';

const router = createBrowserRouter([
	{
		path: '/',
		element: <ProtectedRoute><HomeLayout/></ProtectedRoute>,
		errorElement: <Error/>,
		children: [
			{
				index: true,
				element: <Home/>
			},
			{
				path: 'add-job',
				element: <AddJob/>
			},
			{
				path: 'job/:id',
				element: <Job/>
			},
			{
				path: 'profile',
				element: <Profile/>
			}
		]
	},
	{
		path: '/auth',
		element: <Auth/>,
		errorElement: <Error/>
	},
	{
		path: '/landing',
		element: <Landing/>,
		errorElement: <Error/>
	}
]);

const App = () => {
	const dispatch = useDispatch<useDispatchType>();
	const {globalLoading} = useSelector((store: useSelectorType) => store.user);
	const {location} = useSelector((store: useSelectorType) => store.navigation);
	React.useEffect(() => {
		dispatch(showCurrentUser());
	}, []);
	React.useEffect(() => {
		if (window.location.pathname !== location) {
			router.navigate(location);
		}
	}, [location]);
	if (globalLoading) {
		return (
			<Loading title="Loading Application" position='center'/>
		);
	}
	return (
		<RouterProvider router={router}/>
	);
}

export default App;