import getUserAvatar from './getUserAvatar';

const user = { username: 'example' };
const avatarUrl = getUserAvatar(user);

const requestOptions = {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ user: { image: avatarUrl, ...user } })
};

fetch('/users', requestOptions)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error));
