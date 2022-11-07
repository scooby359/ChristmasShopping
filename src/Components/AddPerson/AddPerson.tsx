import { Button, TextField } from '@mui/material';
import './AddPerson.scss';
import { useState } from 'react';
import { getDefaultPerson } from '../../Models/Person';
import Modal from '../Modal/Modal';

interface AddPersonProps {
  onClose: () => void;
}

const AddPerson: React.FC<AddPersonProps> = (props) => {
  const [name, setName] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  const onCreate = () => {
    const person = getDefaultPerson();
    person.name = name; 
    // TODO - repo add
    onClose();
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
