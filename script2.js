const apiUrl = 'http://jsonplaceholder.typicode.com/posts';
const submitbtn=document.getElementById("submit")

const fetchData = async () => {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayPosts(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const displayPosts = (posts) => {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = posts.map(post => `
        <div class="col-md-4 mb-3">
            <div class="card">
                <div class="card-body">
                <h5 class="card-id">${post.id}</h5>
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${post.body}</p>
                    <button class="btn btn-primary" onclick="editPost(${post.id})">Edit</button>
                </div>
            </div>
        </div>
    `).join('');
};


const createPost = async () => {
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify({ title, body }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json();
        
        console.log(data)
    } catch (error) {
        console.error('Error creating post:', error);
    }
};
submitbtn.addEventListener("click",createPost)
const editPost = async (postId) => {
    const updatedTitle = prompt('Enter updated title:');
    const updatedBody = prompt('Enter updated body:');
    try {
        const response = await fetch(`${apiUrl}/${postId}`, {
            method: 'PUT',
            body: JSON.stringify({ id: postId, title: updatedTitle, body: updatedBody }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json();
        fetchData();
    } catch (error) {
        console.error('Error updating post:', error);
    }
};

window.onload = fetchData;
