import uuidV4 from 'uuid/v4';
import loremIpsum from 'lorem-ipsum';
import PouchDB from 'pouchdb';

export const initDatabase = () => {
  window.db = new PouchDB('titi');
  importContacts();
};


const importContacts = () => {
  const contacts = [];
  const nb = 10000;
  for (let a = 1; a <= nb; a++) {
    contacts.push({ _id: `contact_${a}`, type: 'contact', name: loremIpsum({ count: 2, units: 'words' }) });
  }

  const start = Date.now();
  window.db.bulkDocs(contacts).then((result) => {
    const d = Date.now() - start;
    console.log(`import contacts in ${d} ms`);
    console.log(result.length);
    console.log(result);
    importMessages();
  }).catch((err) => {
    console.log(err);
  });
};

let loop = 1;
let a = 1;
const importMessages = () => {
  const messages = [];
  const nb = 20000 * loop;
  for (a; a <= nb; a++) {
    messages.push({ _id: `message_${a}`, type: 'message', subject: uuidV4(), content: loremIpsum({ count: 100, units: 'words' }) });
  }

  const start = Date.now();
  window.db.bulkDocs(messages).then((result) => {
    const d = Date.now() - start;
    console.log(`import messages in ${d} ms`);
    console.log(result.length);
    console.log(result);
    if (loop < 6) {
      importMessages();
    }
    loop += 1;
  }).catch((err) => {
    console.log(err);
  });
};
