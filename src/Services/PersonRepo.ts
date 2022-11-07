import IndexedDb, { ChristmasShoppingTableName } from './IndexedDb';
import {v4 as uuidv4 }from 'uuid';
import { Person } from '../Models/Person';
import { useEffect, useState } from 'react';

export const usePersonRepo = () => {

  // LOOK AT DEXIE AS A REACT ALTERNATIVE
  // https://dexie.org/docs/Tutorial/React

  const [isRepoInitialized, setIsRepoInitialized] = useState(false);

  const [db] = useState(new IndexedDb());

  const initializeRepo = async () => {
    await db.createTables();
    setIsRepoInitialized(true);
  }

  useEffect(() => {
    initializeRepo();
  }, []);

  const putPerson = async (Person: Person) => {
    if (!Person.id) {
      Person.id = uuidv4();
    }
    const result = await db.putValue<Person>(ChristmasShoppingTableName, Person);
    return result;
  }

  const getPerson = async (id: string) => {
    const result = await db.getValue<Person>(ChristmasShoppingTableName, id);
    return result;
  }

  const getAllPersons = async () => {
    const result = await db.getAllValues<Person>(ChristmasShoppingTableName);
    return result;
  }

  const deletePerson = async (id: string) => {
    await db.deleteValue(ChristmasShoppingTableName, id);
  }

  const deleteAllPersons = async () => {
    await db.deleteAllValues(ChristmasShoppingTableName);
  }

  return {putPerson, getPerson, getAllPersons, deletePerson, deleteAllPersons, initializeRepo, isRepoInitialized};
}