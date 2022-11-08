import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { differenceInCalendarDays } from 'date-fns';
import { useLiveQuery } from 'dexie-react-hooks';
import { useNavigate } from 'react-router-dom';
import { db } from '../../Services/db';
import './Home.scss';

interface HomeProps {}

const Home: React.FC<HomeProps> = (props) => {
  const navigate = useNavigate();
  const persons = useLiveQuery(() => db.persons.toArray());
  const totalSpent = persons?.reduce((acc, person) => acc + person.gifts.filter(g => g.bought).reduce((acc, gift) => acc + Number(gift.price), 0), 0);
  const peopleLeftToBuyFor = (persons?.filter(p => !p.done) ?? []).length;
  const xmasDay = new Date('2022-12-25');
  const daysTillChristmas = differenceInCalendarDays(xmasDay, new Date());
  
  const onTodo = () => {
    navigate('/todo');
  };

  const onAll = () => {
    navigate('/all');
  };

  return (
    <div>
      <Card onClick={onTodo} sx={{ m: 1 }}>
        <CardActionArea>
          <CardContent>
            <Typography variant='h6' component='div'>
              To Do
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card onClick={onAll} sx={{ m: 1 }}>
        <CardActionArea>
          <CardContent>
            <Typography variant='h6' component='div'>
              All
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card sx={{ m: 1 }}>
        <CardContent>
          <Typography variant='h6' component='div'>
            People left to buy for: {peopleLeftToBuyFor}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ m: 1 }}>
        <CardContent>
          <Typography variant='h6' component='div'>
            Days to Christmas: {daysTillChristmas}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ m: 1 }}>
        <CardContent>
          <Typography variant='h6' component='div'>
            Total Spent: £{totalSpent?.toFixed(2)} 
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
