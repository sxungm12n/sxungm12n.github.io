document.addEventListener('DOMContentLoaded', () => {
  console.log('Welcome to SeongMin\'s Blog!');

  const blogContainer = document.getElementById('blog-container');
  const addPostButton = document.getElementById('add-post');

  addPostButton.addEventListener('click', () => {
      const post = document.createElement('div');
      post.className = 'blog-post';
      post.innerHTML = `
          <h3>New Blog Post</h3>
          <p>This is a new blog post. Content will go here.</p>
      `;
      blogContainer.appendChild(post);
  });
});
