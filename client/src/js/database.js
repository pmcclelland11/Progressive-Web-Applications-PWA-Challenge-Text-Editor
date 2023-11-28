import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Added logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readwrite');

  try {
    const store = tx.objectStore('jate');
    const request = store.put({ id: 1, value: content });
    const result = await request;
    console.log('Data added to IndexedDB:', result);
    await tx.complete; // Ensure the transaction is completed
  } catch (error) {
    console.error('Error adding data to IndexedDB:', error);
    tx.abort(); // Abort the transaction in case of an error
  }
};

// Added logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB('jate', 1); 
  const tx = db.transaction('jate', 'readonly');

  try {
    const store = tx.objectStore('jate');
    const request = store.get(1);
    const result = await request;
    console.log('Data retrieved from IndexedDB:', result);
    return result?.value;
  } catch (error) {
    console.error('Error retrieving data from IndexedDB:', error);
    tx.abort();
  }
};

initdb();
