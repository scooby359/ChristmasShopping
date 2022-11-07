import { IDBPDatabase, openDB } from 'idb';

export const ChristmasShoppingTableName = 'christmasShopping';

class IndexedDb {
  private db: IDBPDatabase<unknown> | undefined;
  private databaseName = 'ChristmasShoppingApp';
  private dbVersion = 1;
  private tableNames = [ChristmasShoppingTableName];
  private dbInitialized = false;

  constructor() {
    this.createTables();
  }

  public createTables = async () => {

    if (this.dbInitialized) return;

    const tableNames = this.tableNames;
    try {
      this.db = await openDB(this.databaseName, this.dbVersion, {
        upgrade(db) {
          for (const tableName of tableNames) {
            if (db.objectStoreNames.contains(tableName)) {
              continue;
            }
            db.createObjectStore(tableName, { keyPath: 'id' });
          }
        },
      });
      this.dbInitialized = true;
    } catch (error) {
      return false;
    }
  };

  public async getValue<T>(tableName: string, id: string) {
    if (!this.db) throw new Error('DB not initialized');
    const tx = this.db.transaction(tableName, 'readonly');
    const store = tx.objectStore(tableName);
    const result: T = await store.get(id);
    return result;
  }

  public async getAllValues<T>(tableName: string) {
    if (!this.db) throw new Error('DB not initialized');
    const tx = this.db.transaction(tableName, 'readonly');
    const store = tx.objectStore(tableName);
    const result: T[] = await store.getAll();
    return result;
  }

  public async putValue<T>(tableName: string, value: T) {
    if (!this.db) throw new Error('DB not initialized');
    const tx = this.db.transaction(tableName, 'readwrite');
    const store = tx.objectStore(tableName);
    const result = await store.put(value);
    return result;
  }

  public async putBulkValue<T>(tableName: string, values: T[]) {
    if (!this.db) throw new Error('DB not initialized');
    const tx = this.db.transaction(tableName, 'readwrite');
    const store = tx.objectStore(tableName);
    for (const value of values) {
      const result = await store.put(value);
    }
    return this.getAllValues<T>(tableName);
  }

  public async deleteValue(tableName: string, id: string) {
    if (!this.db) throw new Error('DB not initialized');
    const tx = this.db.transaction(tableName, 'readwrite');
    const store = tx.objectStore(tableName);
    const result = await store.get(id);
    if (!result) {
      console.log('Id not found', id);
      return result;
    }
    await store.delete(id);
    return id;
  }

  public async deleteAllValues(tableName: string) {
    if (!this.db) throw new Error('DB not initialized');
    const allItems: any[] = await this.getAllValues(tableName);    
    for (const item of allItems) {
      await this.deleteValue(tableName, item.id);
    }
  }

}

export default IndexedDb;
