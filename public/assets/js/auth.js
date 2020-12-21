document.getElementById('register').addEventListener('click', event => {
  event.preventDefault()

  axios.post('/api/users/register', {
    name: document.getElementById('name').value,
    username: document.getElementById('username').value,
    password: document.getElementById('password').value
  })
    .then(() => {

      Toastify({
        text: 'Registered! Please Sign In!',
        duration: 3000
      }).showToast()

      document.getElementById('name').value = ''
      document.getElementById('username').value = ''
      document.getElementById('password').value = ''
    })
    .catch(err => {
      console.error(err)

      Toastify({
        text: 'Woops! Something went wrong. Try again.',
        backgroundColor: 'red',
        duration: 3000
      }).showToast()

      document.getElementById('name').value = ''
      document.getElementById('username').value = ''
      document.getElementById('password').value = ''
    })
})

document.getElementById('logIn').addEventListener('click', event => {
  event.preventDefault()

  axios.post('/api/users/login', {
    username: document.getElementById('lUsername').value,
    password: document.getElementById('lPassword').value,
  })
    .then(({ data: token }) => {
      if (token) {
        localStorage.setItem('user', token)
        location = './index.html'
      } else {
        Toastify({
          text: 'Invalid username or password.',
          backgroundColor: 'red',
          duration: 3000
        }).showToast()

        document.getElementById('lUsername').value = ''
        document.getElementById('lPassword').value = ''
      }
    })
    .catch(err => {
      console.error(err)

      Toastify({
        text: 'Woops! Something went wrong. Try again.',
        backgroundColor: 'red',
        duration: 3000
      }).showToast()

      document.getElementById('lUsername').value = ''
      document.getElementById('lPassword').value = ''
    })
})