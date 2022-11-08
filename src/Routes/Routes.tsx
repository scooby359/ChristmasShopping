import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../Components/ErrorPage/ErrorPage';
import GiftEditor from '../Components/GiftEditor/GiftEditor';
import Home from '../Components/Home/Home';
import Layout from '../Components/Layout/Layout';
import Person from '../Components/Person/Person';
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
      { path: 'person/:personId/gift/:giftId', element: <GiftEditor />},
      { path: 'person/:personId/gift/', element: <GiftEditor />},
      { path: 'person/:personId', element: <Person />},
      
    ],
  },
]);
