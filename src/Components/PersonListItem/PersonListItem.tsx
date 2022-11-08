import { Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Person } from '../../Models/Person';
import './PersonListItem.scss';

interface PersonListItemProps {
  person: Person;
}

const PersonListItem: React.FC<PersonListItemProps> = (props) => {

  const navigate = useNavigate();

  const totalSpent = props.person.gifts.reduce(
    (total, gift) => total + Number(gift.price),
    0
  );

  return (
    <Card sx={{m: 1}} onClick={() => navigate(`/person/${props.person.id}`)}>
      <CardContent>
        <Typography variant='h5' component='div'>
          {props.person.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          £{totalSpent.toFixed(2)}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color={props.person.done ? 'green' : 'red'}>
          {props.person.done ? 'Done' : 'Still to do'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PersonListItem;
