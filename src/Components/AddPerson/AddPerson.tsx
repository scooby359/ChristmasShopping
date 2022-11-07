import { Button, TextField } from '@mui/material';
import './AddPerson.scss';
import { useState } from 'react';
import { getDefaultPerson } from '../../Models/Person';
import Modal from '../Modal/Modal';
import { db } from '../../Services/db';

interface AddPersonProps {
  onClose: () => void;
}

const AddPerson: React.FC<AddPersonProps> = (props) => {
  const [name, setName] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  const onCreate = async() => {
    const person = getDefaultPerson();
    person.name = name; 
    // TODO - repo add
    try {
      console.log('AddPerson - onCreate - person', person);
      const id = await db.persons.add(person);
      console.log('Added person with id: ' + id);
      onClose();
    } catch (error) {
      console.log('something went wrong!', error)
    }
  };

  const onClose = () => {
    setIsOpen(false);
    props.onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <>
          <TextField
            className='addPerson-input'
            id='outlined-basic'
            label='Name'
            variant='outlined'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="addPerson-buttons">
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onCreate}>Create</Button>
          </div>
        </>
      </Modal>
    </>
  );
};

export default AddPerson;
