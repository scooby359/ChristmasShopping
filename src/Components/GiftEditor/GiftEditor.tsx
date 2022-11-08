import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDefaultGift, Gift } from '../../Models/Gift';
import { Person } from '../../Models/Person';
import { db } from '../../Services/db';
import './GiftEditor.scss';

interface GiftEditorProps {}

export const GiftEditor = (props: GiftEditorProps) => {
  const params = useParams<{ personId: string; giftId: string }>();
  const person = useLiveQuery(() => db.persons.get(params.personId ?? ''));
  const [gift, setGift] = useState<Gift>(getDefaultGift());
  const navigate = useNavigate();

  useEffect(() => {
    if (params.giftId) {
      const g = person?.gifts?.find((g) => g.id === params.giftId);
      if (g) {
        setGift(g);
      }
    }
  }, [params.giftId, person]);

  const onSave = () => {
    const updatedGifts = gift.id
      ? [...person!.gifts.filter((g) => g.id !== gift.id), gift]
      : [...person!.gifts, gift];
    const updatedPerson: Person = { ...person!, gifts: updatedGifts };
    db.persons.update(person!.id, updatedPerson);
    navigate(`/person/${params.personId}`);
  };

  const onCancel = () => {
    navigate(`/person/${params.personId}`);
  };

  const onDelete = () => {
    const updatedGifts = [...person!.gifts.filter((g) => g.id !== gift.id)];
    const updatedPerson: Person = { ...person!, gifts: updatedGifts };
    db.persons.update(person!.id, updatedPerson);
    navigate(`/person/${params.personId}`);
  };

  return (
    <div className='gift-editor'>
      <TextField
        sx={{ backgroundColor: 'white', m: 1 }}
        id='name'
        label='Name'
        variant='outlined'
        value={gift?.name}
        onChange={(e) => setGift({ ...gift, name: e.target.value })}
      />
      <TextField
        sx={{ backgroundColor: 'white', m: 1 }}
        id='source'
        label='Source'
        variant='outlined'
        value={gift?.source}
        onChange={(e) => setGift({ ...gift, source: e.target.value })}
      />
      <TextField
        sx={{ backgroundColor: 'white', m: 1 }}
        id='url'
        label='URL'
        variant='outlined'
        value={gift?.url}
        onChange={(e) => setGift({ ...gift, url: e.target.value })}
      />
      <TextField
        sx={{ backgroundColor: 'white', m: 1 }}
        id='price'
        label='Price'
        variant='outlined'
        value={gift?.price}
        onChange={(e) => setGift({ ...gift, price: e.target.value })}
      />
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              sx={{ m: 1 }}
              checked={gift.bought}
              onChange={(e) => setGift({ ...gift, bought: e.target.checked })}
            />
          }
          label='Bought'
        />
      </FormGroup>
      <div className='buttons'>
        <Button variant='outlined' onClick={onDelete}>
          Delete
        </Button>
        <Button variant='outlined' onClick={onCancel}>
          Cancel
        </Button>
        <Button variant='contained' onClick={onSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default GiftEditor;
