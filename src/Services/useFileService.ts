import { useLiveQuery } from 'dexie-react-hooks';
import { db } from './db';

export const useFileService = () => {
  const persons = useLiveQuery(() => db.persons.toArray());

  const downloadFile = (data: any, fileName: string, fileType: string) => {
    // Create a blob with the data we want to download as a file
    const blob = new Blob([data], { type: fileType });

    // Create an anchor element and dispatch a click event on it
    // to trigger a download
    const a = document.createElement('a');
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  const exportToJson = () => {
    downloadFile(
      JSON.stringify(persons),
      `ChristmasShoppingData-${getTimeDateFileString()}.json`,
      'text/json'
    );
  };

  const getTimeDateFileString = () => {
    const date = new Date();
    const value =
      '' +
      date.getFullYear() +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      date.getDate().toString().padStart(2, '0') +
      date.getHours().toString().padStart(2, '0') +
      date.getMinutes().toString().padStart(2, '0');

    return value;
  };

  return { exportToJson };
};
