const posts = [
    'posts/ttrpgs/2024-08-10-test1.txt',
    'posts/fountain-pens/2025-08-10-test2.txt',
];

// Function to parse the post information
function parsePostInfo(postPath) {
    const pathParts = postPath.split('/');
    const fileName = pathParts[pathParts.length - 1]; // Extract the file name with extension
    const directory = pathParts.slice(0, pathParts.length - 1).join('/'); // Join all parts except the last one to get the directory path
    const dateMatch = fileName.match(/^(\d{4}-\d{2}-\d{2})/); // Regex to match the date at the start of the filename
    const date = dateMatch ? dateMatch[0] : 'unknown'; // Extract the date or set as 'unknown'
    const title = `${directory}/${fileName}`; // Combine directory path and file name for the title

    return {
        path: postPath,
        category: pathParts[pathParts.length - 2], // Extract just the category (second-to-last part)
        date: date, // Store the date for sorting
        title: title // Store the full path including '/posts' as title
    };
}

// Function to load posts
function loadPosts(filterCategory = 'all', sortOrder = 'desc') {
    const blogContent = document.getElementById('blog-content');
    blogContent.innerHTML = ''; // Clear the content

    // Parse post information dynamically
    let parsedPosts = posts.map(parsePostInfo);

    // Filter posts by category
    if (filterCategory !== 'all') {
        parsedPosts = parsedPosts.filter(post => post.category === filterCategory);
    }

    // Sort posts by date
    parsedPosts.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    // Display posts
    parsedPosts.forEach(postInfo => {
        fetch(postInfo.path)
            .then(response => response.text())
            .then(data => {
                const postElement = document.createElement('article');
                postElement.innerHTML = `<h2>${postInfo.title}</h2>${data}`;
                blogContent.appendChild(postElement);
            })
            .catch(error => {
                console.error('Error loading post:', error);
            });
    });
}

// Load posts on page load
window.addEventListener('load', () => loadPosts());

// Handle filter/sort navigation
document.getElementById('filter-nav').addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        e.preventDefault();

        const filterType = e.target.textContent.toLowerCase();

        if (filterType.includes('date')) {
            const sortOrder = filterType.includes('up') ? 'asc' : 'desc';
            loadPosts('all', sortOrder);
        } else {
            loadPosts(filterType, 'desc');
        }
    }
});
