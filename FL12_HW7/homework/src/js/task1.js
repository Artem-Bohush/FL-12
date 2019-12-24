const loggedUsers = {
  'user@gmail.com': 'UserPass',
  'admin@gmail.com': 'AdminPass'
};
const cancelInput = ['', null];

//Step 1. Check login
let email = prompt('Please enter an email:');
if (cancelInput.includes(email)) {
  alert('Canceled');
} else {
  if (email.length < 5) {
    alert('I don\'t know any emails having name length less than 5 symbols');
  } else if (email === 'user@gmail.com' || email === 'admin@gmail.com') {
    let password = prompt('Please enter a password:');
    //Step 2. Check password:
    if (cancelInput.includes(password)) {
      alert('Canceled');
    } else {
      if (password === loggedUsers[email]) {
        //Step 3. Change the password
        if (!confirm('Do you want to change your password?')) {
          alert('You have failed the change');
        } else {
          let oldPassword = prompt('Please repeat the password:');
          if (cancelInput.includes(oldPassword)) {
            alert('Canceled');
          } else {
            if (oldPassword === loggedUsers[email]) {
              let newPassword = prompt('Please enter a new password:');
              if (cancelInput.includes(newPassword)) {
                alert('Canceled');
              } else if (newPassword.length < 6) {
                alert('It\'s too short password. Sorry');
              } else {
                let repeatedNewPassword = prompt('Please repeat new password:');
                repeatedNewPassword !== newPassword ? alert('You wrote the wrong password') :
                  alert('You have successfully changed your password');
              }
            } else {
              alert('Wrong password');
            }
          }
        }
      } else {
        alert('Wrong password');
      }
    }
  } else {
    alert('I don’t know you');
  }
}

