import { useNavigate } from "react-router-dom";
import './Home.scss';

interface HomeProps {
}

const Home: React.FC<HomeProps> = (props) => {

  const navigate = useNavigate();

  const onTodo = () => {
    console.log('onTodo');
    navigate('/todo');
  }

  const onAll = () => {
    console.log('onAll');
    navigate('/all');
  }

  return(
  <div>
    <div onClick={onTodo} className='home-button'>To Do</div>
    <div onClick={onAll} className='home-button'>All</div>
    <div className='home-button'>Days to Christmas: 1</div>
    <div className='home-button'>Total Spend: £1.50</div>
  </div>
  );
}

export default Home;