import { Fab } from '@mui/material';
import PersonListItem from '../PersonListItem/PersonListItem';
import AddIcon from '@mui/icons-material/Add';
import './PersonList.scss';
import { useState } from 'react';
import AddPerson from '../AddPerson/AddPerson';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../Services/db';

export enum PersonListState {
  All,
  Todo,
}

interface PersonListProps {
  state: PersonListState;
}

const PersonList: React.FC<PersonListProps> = (props) => {
  const [showNewModal, setShowNewModal] = useState(false);
  const persons = useLiveQuery(() => db.persons.toArray())?.filter(p => props.state === PersonListState.All || !p.done) ?? [];

  return (
    <div className='personlist'>
      {persons?.map((p) => (
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
