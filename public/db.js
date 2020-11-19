// Standardize the indexedDB object
const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

let db;

const request = indexedDB.open("budget", 1);

// Object store
request.onupgradeneeded = ({ target }) => {
  let db = target.result;
  db.createObjectStore("<object store name here>", { autoIncrement: true });
};

request.onsuccess = ({ target }) => {
  db = target.result;
  // Check if app is online before reading from db
  if (navigator.onLine) {
    checkDatabase();
  }
};

request.onerror = function(event) {
  console.log("Whoops! " + event.target.errorCode);
};

// Save data to the indexedDb
function saveRecord(record) {
  const transaction = db.transaction(["<object store name here>"], "readwrite");
  const store = transaction.objectStore("<object store name here>");
  store.add(record);
}

// Internet working: POST saved data to server to sync, wipe existing indexedDB. You can keep as-is, unless you want to change the name of the fetch route.
function checkDatabase() {
  const transaction = db.transaction(["<object store name here>"], "readwrite");
  const store = transaction.objectStore("<object store name here>");
  const getAll = store.getAll();

  getAll.onsuccess = function() {
    if (getAll.result.length > 0) {
      fetch("/api/transaction/bulk", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
      .then(response => {        
        return response.json();
      })
      .then(() => {
        // delete records if successful
        const transaction = db.transaction(["<object store name here>"], "readwrite");
        const store = transaction.objectStore("<object store name here>");
        store.clear();
      });
    }
  };
}

// Listener for app coming back online
window.addEventListener("online", checkDatabase);