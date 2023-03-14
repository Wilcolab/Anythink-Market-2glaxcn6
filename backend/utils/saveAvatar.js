const getUserAvatar = require('./getUserAvatar');

const user = { username: 'example' };
const avatarUrl = getUserAvatar(user);

const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ image: avatarUrl })
};

fetch('http://localhost:3000/api/save-avatar', requestOptions)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error));