let db
const request = indexedDB.open('blog', 1)

request.onupgradeneeded = event => {
  db = event.target.result
  db.createObjectStore('pending', { autoIncrement: true })
}

request.onsuccess = event => {
  db = event.target.result

  if (navigator.onLine) {
    checkDatabase()
  }
}

request.onerror = event => {
  console.log(event.target.errorCode)
}


const savePost = post => {
  const transaction = db.transaction(['pending'], 'readwrite')
  const store = transaction.objectStore('pending')
  store.add(post)
}

const checkDatabase = () => {
  const transaction = db.transaction(['pending'], 'readwrite')
  const store = transaction.objectStore('pending')
  const getAll = store.getAll()

  getAll.onsuccess = () => {
    if (getAll.result.length > 0) {
      fetch('/api/posts/bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('user')}`
        },
        body: JSON.stringify(getAll.result)
      })
        .then(() => {
          const transaction = db.transaction(['pending'], 'readwrite')
          const store = transaction.objectStore('pending')
          store.clear()
        })
    }
  }
}

window.addEventListener('online', checkDatabase)
