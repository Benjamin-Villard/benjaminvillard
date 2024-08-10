const posts = [
    'posts/test.txt'
];

function loadPosts() {
    const blogContent = document.getElementById('blog-content');
    blogContent.innerHTML = ''; // Clear the content

    posts.forEach(post => {
        fetch(post)
            .then(response => response.text())
            .then(data => {
                const postElement = document.createElement('article');
                postElement.innerHTML = `<pre>${data}</pre>`;
                blogContent.appendChild(postElement);
            })
            .catch(error => {
                console.error('Error loading post:', error);
            });
    });
}

// Load the posts when the page loads
window.addEventListener('load', loadPosts);