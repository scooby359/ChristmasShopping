import { Gift } from './Gift';
import { v4 as uuidv4 } from 'uuid';


export interface Person {
  id: string;
  name: string;
  amountSpent: number;
  amountBudgeted: number;
  gifts: Gift[];
  done: boolean;
}

export const getOutstandingPersons = (persons: Person[]): Person[] => {
  return persons.filter(person => !person.done);
}

export const getDefaultPerson = (): Person => {
  return {
    id: uuidv4(),
    name: '',
    amountSpent: 0,
    amountBudgeted: 0,
    gifts: [],
    done: false,
  }
}