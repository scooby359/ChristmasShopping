import Dexie, { Table } from 'dexie';
import { Person } from '../Models/Person';

export class ChristmasDexie extends Dexie {
  persons!: Table<Person>;

  constructor() {
    super('christmasShopping');
    this.version(1).stores({
      persons: 'id'
    });
  }
}

export const db = new ChristmasDexie();