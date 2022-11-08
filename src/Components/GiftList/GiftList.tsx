import { Gift } from '../../Models/Gift';
import { Person } from '../../Models/Person';
import GiftListItem from '../GiftListItem/GiftListItem';
import './GiftList.scss';

interface GiftListProps {
  gifts: Gift[];
  person: Person;
}

const GiftList: React.FC<GiftListProps> = (props) => {
  return (
    <>
      {props.gifts.map((g) => (<GiftListItem key={g.id} gift={g} person={props.person}/>))}
    </>
  );
};

export default GiftList;