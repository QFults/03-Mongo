
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
  })
}

document.getElementById('createPost').addEventListener('click', event => {
  event.preventDefault()

  axios.post('/api/posts', {
    title: document.getElementById('title').value,
    body: document.getElementById('body').value
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('user')}`
    }
  })
    .then(({ data: post }) => {
      let postElem = document.createElement('li')
      postElem.className = 'list-group-item'
      postElem.innerHTML = `
        <h4>${post.title}</h4>
        <p>${post.body}</p>
      `
      document.getElementById('posts').append(postElem)
      document.getElementById('title').value = ''
      document.getElementById('body').value = ''
    })
    .catch(err => {
      console.error(err)
      savePost({
        title: document.getElementById('title').value,
        body: document.getElementById('body').value
      })
      document.getElementById('title').value = ''
      document.getElementById('body').value = ''
    })
})

document.getElementById('signOut').addEventListener('click', event => {
  localStorage.removeItem('user')
  location = './auth.html'
})

axios.get('/api/users/posts', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('user')}`
  }
})
  .then(({ data: user }) => {
    document.getElementById('username').textContent = `Welcome ${user.username}!`
    user.posts.forEach(post => {
      let postElem = document.createElement('li')
      postElem.className = 'list-group-item'
      postElem.innerHTML = `
        <h4>${post.title}</h4>
        <p>${post.body}</p>
      `
      document.getElementById('posts').append(postElem)
    })
  })
  .catch(err => {
    console.error(err)
    if (err.response.status === 401) {
      location = './auth.html'
    }
  })