const dbURL = 'https://jsonplaceholder.typicode.com';
const avatarsURL = 'https://cataas.com/cat?type=sq';

function createUserCard(user) {
  return `
    <div class="user" id=${user.id}>
      <div class="user__avatar"></div>
      <div class="user__info">
        <h3 class="user__info__name"><a id="name" href="./posts.html#${user.id}">${user.name}</a></h3>
        <table class="user__info__details">
          <tr>
            <td>Username:</td>
            <td id="username">${user.username}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td id="email">${user.email}</td>
          </tr>
          <tr>
            <td class="address">Address:</td>
            <td id="address">${user.address.street}, ${user.address.suite}, 
              ${user.address.city}, ${user.address.zipcode}</td>
          </tr>
          <tr>
            <td>Phone:</td>
            <td id="phone">${user.phone}</td>
          </tr>
          <tr>
            <td>Website:</td>
            <td id="website">${user.website}</td>
          </tr>
          <tr>
            <td>Company:</td>
            <td id="company">${user.company.name}</td>
          </tr>
        </table>
      </div>
      <div class="user__actions">
        <button class="user__edit">Edit</button>
        <button class="user__delete">Delete</button>
      </div>
    </div>
  `
}

async function retrieveUsers() {
  try {
    const response = await fetch(`${dbURL}/users`);
    return await response.json();
  }
  catch (error) {
    return console.log('Error: ' + error);
  }
}

retrieveUsers()
  .then(users => {
    const htmlStr = users.map(user => createUserCard(user)).join('');
    document.querySelector('.users-block-content').innerHTML = htmlStr;

    const avatarDivs = Array.from(document.getElementsByClassName('user__avatar'));
    avatarDivs.forEach(avatarDiv => {
      if (!avatarDiv.firstElementChild) {
        fetch(`${avatarsURL}&userId=${avatarDiv.parentElement.id}`)
          .then(resp => resp.blob())
          .then(blobObj => {
            let img = document.createElement('img');
            img.alt = 'avatar';
            img.src = URL.createObjectURL(blobObj);
            avatarDiv.appendChild(img);
            document.querySelector('.spinner').style.display = 'none';
          })
          .catch(error => console.log('Error: ' + error));
      }
    })

    const actionBlocks = Array.from(document.getElementsByClassName('user__actions'));
    actionBlocks.forEach(block => block.addEventListener('click', userActionBtns));
  })

function userActionBtns(e) {
  document.querySelector('.spinner').style.display = 'flex';
  const userId = Number(e.currentTarget.parentElement.id);
  if (e.target.classList.contains('user__edit')) {
    retrieveUsers()
      .then(users => users.find(user => user.id === userId))
      .then(currentUser => {
        const inputs = Array.from(document.getElementsByTagName('input'));
        inputs.forEach(input => {
          if (input.name === 'address') {
            input.value = currentUser[input.name].street + ', ' + currentUser[input.name].suite +
              ', ' + currentUser[input.name].city + ', ' + currentUser.address.zipcode;
          } else if (input.name === 'company') {
            input.value = currentUser[input.name].name;
          } else {
            input.value = currentUser[input.name];
          }
        })
        document.querySelector('.modal').style.display = 'flex';
        document.querySelector('.spinner').style.display = 'none';
      })
  } else {
    deleteUser(userId);
  }
}

function deleteUser(userId) {
  document.querySelector('.spinner').style.display = 'flex';
  fetch(`${dbURL}/users/${userId}`, {
    method: 'DELETE'
  })
    .then(() => {
      document.getElementById(userId).remove();
      document.querySelector('.spinner').style.display = 'none';
    })
    .catch(error => console.log('Error: ' + error));
}

document.querySelector('.form-close').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('.modal').style.display = 'none';
})

document.querySelector('.form-submit').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('.spinner').style.display = 'flex';
  const form = document.getElementById('new-data');
  const newData = new FormData(form);
  let obj = {};
  newData.forEach(function (value, key) {
    obj[key] = value;
  });
  fetch(`${dbURL}/users/${obj.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(obj)
  })
    .then(response => response.json())
    .then(updatedUserData => {
      refreshUpdatedUser(updatedUserData);
      document.querySelector('.modal').style.display = 'none';
      document.querySelector('.spinner').style.display = 'none';
    })
    .catch(error => console.log('Error: ' + error));
})

function refreshUpdatedUser(user) {
  const userDiv = document.getElementById(user.id);
  userDiv.querySelector('#name').innerText = user.name;
  userDiv.querySelector('#username').innerText = user.username;
  userDiv.querySelector('#email').innerText = user.email;
  userDiv.querySelector('#address').innerText = user.address;
  userDiv.querySelector('#phone').innerText = user.phone;
  userDiv.querySelector('#website').innerText = user.website;
  userDiv.querySelector('#company').innerText = user.company;
}