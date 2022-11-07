import { Fab } from '@mui/material';
import PersonListItem from '../PersonListItem/PersonListItem';
import AddIcon from '@mui/icons-material/Add';
import './PersonList.scss';
import { useEffect, useState } from 'react';
import AddPerson from '../AddPerson/AddPerson';
import { usePersonRepo } from '../../Services/PersonRepo';
import { Person } from '../../Models/Person';

export enum PersonListState {
  All,
  Todo,
}

interface PersonListProps {
  state: PersonListState;
}

const PersonList: React.FC<PersonListProps> = (props) => {
  const { getAllPersons } = usePersonRepo();

  const [persons, setPersons] = useState<Person[]>([]);
  const [showNewModal, setShowNewModal] = useState(false);

  useEffect(() => {
    getPersons();
  }, [getAllPersons]);

  const getPersons = async () => {
    const p = await getAllPersons();
    setPersons(p);
  }

  return (
    <div className='personlist'>
      {persons.map((p) => (
        <PersonListItem key={p.id} person={p} />
      ))}
      {!showNewModal && (
        <Fab
          className='personlist-fab'
          color='primary'
          aria-label='add'
          onClick={() => setShowNewModal(true)}
        >
          <AddIcon />
        </Fab>
      )}

      {showNewModal && <AddPerson onClose={() => setShowNewModal(false)} />}
    </div>
  );
};

export default PersonList;
