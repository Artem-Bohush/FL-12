const dbURL = 'https://jsonplaceholder.typicode.com';
const avatarsURL = 'https://cataas.com/cat?type=sq';

function createPostCard(user, post, comments) {
  let commentsHtml = '';
  comments.forEach(comment => {
    commentsHtml += `
    <div class="post__comment">
      <h5 class="post__comment__name">${comment.name}</h5>
      <div class="post__comment__email">${comment.email}</div>
      <p class="post__comment__text">${comment.body}</p>
    </div>
    `
  })
  return `
    <div class="post">
      <div class="post__author">
        <div class="post__author__avatar">
          <img src="https://cataas.com/cat?type=sq&userId=${user.id}" alt="avatar">
        </div>
        <h3 class="post__author__name">${user.name}</h3>
      </div>
      <div class="post__content">
        <h4 class="post__title">${post.title}</h4>
        <p class="post__text">${post.body}</p>
        <span>Comments:</span>
      </div>
      <div class="post__comments">${commentsHtml}</div>
    </div>
  `;
}

async function retrievePostsAndComments(userId) {
  let urls = [
    `${dbURL}/users/${userId}`,
    `${dbURL}/posts?userId=${userId}`,
    `${dbURL}/comments`
  ];
  let requests = urls.map(url => fetch(url));
  try {
    const responses = await Promise.all(requests);
    return await Promise.all(responses.map(r => r.json()));
  }
  catch (error) {
    return console.log('Error: ' + error);
  }
}

retrievePostsAndComments(location.hash.split('').slice(1).join(''))
  .then(arrs => {
    const currentUser = arrs[0];
    const posts = arrs[1];
    const comments = arrs[2];
    const filteredComments = new Map();
    posts.forEach(post => {
      const appropriateComments = comments.filter(comment => comment.postId === post.id);
      filteredComments.set(post, appropriateComments);
    })
    let htmlStr = '';
    for (let entries of filteredComments) {
      htmlStr += createPostCard(currentUser, entries[0], entries[1]);
    }
    document.querySelector('.posts-block-content').innerHTML = htmlStr;
    document.querySelector('.spinner').style.display = 'none';
  })

  document.querySelector('.back-btn').addEventListener('click', () => {
    location.href = 'index.html';
  })