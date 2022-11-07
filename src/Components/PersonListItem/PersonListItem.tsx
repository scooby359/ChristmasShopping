import { Person } from '../../Models/Person';

interface PersonListItemProps {
  person: Person;
}

const PersonListItem: React.FC<PersonListItemProps> = (props) => {

  const totalSpent = props.person.gifts.reduce((total, gift) => total + gift.price, 0);

  return(
  <div className='person'>
    <div className='person__name'>{props.person.name}</div>
    <div className='person__totalSpent'>Total Spent: {totalSpent}</div>
    <div className='person__isDone'>Is done: {props.person.done ? 'Done' : 'Not Done'}</div>
  </div>
);
}

export default PersonListItem;