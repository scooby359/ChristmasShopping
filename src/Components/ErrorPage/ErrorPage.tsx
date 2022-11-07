import { useRouteError } from "react-router-dom";
import './ErrorPage.scss';

interface ErrorPageProps {}

const ErrorPage: React.FC<ErrorPageProps> = (props) => {

  const error = useRouteError() as any;

  return (
    <div className='error-page'>
      <div className='error-page-text'>404</div>
      <div className='error-page-text'>Page not found:</div>
      <div className='error-page-text'>{error.statusText || error.message}</div>
    </div>
  );
};

export default ErrorPage;
