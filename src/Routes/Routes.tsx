import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../Components/ErrorPage/ErrorPage';
import Home from '../Components/Home/Home';
import Layout from '../Components/Layout/Layout';
import PersonList, {
  PersonListState,
} from '../Components/PersonList/PersonList';

export const Routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '', element: <Home /> },
      { path: 'all', element: <PersonList state={PersonListState.All} /> },
      { path: 'todo', element: <PersonList state={PersonListState.Todo} /> },
    ],
  },
]);
