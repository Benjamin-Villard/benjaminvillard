const posts = [
    'posts/test.txt',
];

function loadPosts() {
    const blogContent = document.getElementById('blog-content');
    blogContent.innerHTML = ''; // Clear the content

    posts.forEach(post => {
        fetch(post)
            .then(response => response.text())
            .then(data => {
                // Extract the filename from the path (e.g., 'test.txt')
                const postTitle = post//.split('/').pop().split('.')[0];

                // Create an article element
                const postElement = document.createElement('article');

                // Set the title as an <h2> element
                postElement.innerHTML = `<h2>${postTitle}</h2>${data}`;

                // Append the post element to the blog content
                blogContent.appendChild(postElement);
            })
            .catch(error => {
                console.error('Error loading post:', error);
            });
    });
}

// Load the posts when the page loads
window.addEventListener('load', loadPosts);