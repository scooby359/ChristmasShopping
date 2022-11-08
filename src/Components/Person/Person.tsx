import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  FormControlLabel,
  FormGroup,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../Services/db';
import GiftList from '../GiftList/GiftList';
import './Person.scss';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

interface PersonProps {}

const Person: React.FC<PersonProps> = (props) => {
  const params = useParams<{ personId: string }>();
  const [isDone, setIsDone] = useState(false);
  const person = useLiveQuery(() => db.persons.get(params.personId ?? ''));
  const navigate = useNavigate();

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const handleDeleteOpen = () => {
    setDeleteConfirmOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteConfirmOpen(false);
  };

  const totalSpent =
    person?.gifts
      .filter((g) => g.bought)
      .reduce((acc, gift) => acc + Number(gift.price), 0) ?? 0;

  const toggleDone = () => {
    db.persons.update(params.personId ?? '', { done: !isDone });
    setIsDone(!isDone);
  };

  useEffect(() => {
    setIsDone(person?.done ?? false);
  }, [person]);

  const onDeletePerson = () => {
    handleDeleteClose();
    db.persons.delete(params.personId ?? '');
    navigate('/all');
  };

  return (
    <>
      <Paper>
        <Typography
          variant='h5'
          component='div'
          sx={{ paddingX: 1.5, paddingY: 0.5 }}
        >
          {person?.name}
        </Typography>

        <Typography variant='subtitle2' component='div' sx={{ paddingX: 1.5 }}>
          Total Spent: £{totalSpent}
        </Typography>

        <div className='person-flex'>
          <FormGroup sx={{ paddingX: 1.5 }} className='person-flex-checkbox'>
            <FormControlLabel
              control={<Checkbox checked={isDone} onChange={toggleDone} />}
              label='Done'
            />
          </FormGroup>

          <IconButton
            aria-label='delete'
            sx={{ paddingX: 1.5 }}
            onClick={handleDeleteOpen}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </Paper>

      <GiftList gifts={person?.gifts ?? []} person={person!} />
      <Fab
        className='personlist-fab'
        color='primary'
        aria-label='add'
        onClick={() => navigate(`/person/${person?.id}/gift/`)}
      >
        <AddIcon />
      </Fab>

      <Dialog
        open={deleteConfirmOpen}
        onClose={handleDeleteClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Delete Person</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete this person?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button variant='contained' onClick={onDeletePerson} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Person;
