import { Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Gift } from '../../Models/Gift';
import { Person } from '../../Models/Person';
import './GiftListItem.scss';

interface GiftListItemProps {
  person: Person;
  gift: Gift;
}

const GiftListItem: React.FC<GiftListItemProps> = (props) => {
  const navigate = useNavigate();

  const openWindow = (url: string) => {
    if (!url.match(/^https?:\/\//i)) {
        url = 'http://' + url;
    }
    return window.open(url, '_blank');
}

  return (
    <Card sx={{ m: 1 }} onClick={() => navigate(`/person/${props.person.id}/gift/${props.gift.id}`)}>
      <CardContent>
        <Typography variant='h5' component='div'>
          {props.gift.name}
        </Typography>
        {props.gift.price && (
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            £{props.gift.price}
          </Typography>
        )}
        <Typography
          sx={{ mb: 1.5 }}
          color={props.gift.bought ? 'green' : 'red'}
        >
          {props.gift.bought ? 'Bought' : 'Need to buy'}
        </Typography>
        {props.gift.source && (
          <Typography sx={{ mb: 1.5 }}>{props.gift.source}</Typography>
        )}
        {props.gift.url && (
          <Typography
            sx={{ mb: 1.5 }}
            onClick={() => openWindow(props.gift.url!)}
          >
            {props.gift.url}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default GiftListItem;
