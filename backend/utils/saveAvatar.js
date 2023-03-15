import getUserAvatar from './getUserAvatar';

const user = { username: 'example' };
const avatarUrl = getUserAvatar(user);

const authToken = localStorage.getItem('authToken');

const requestOptions = {
  method: 'PUT',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': `Bearer ${authToken}` 
  },
  body: JSON.stringify({ user: { image: avatarUrl, ...user } })
};

fetch('/api/users/image', requestOptions)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error));
