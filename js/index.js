const loadNewsCategory = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayData(data.data.news_category))
}

const displayData = categories => {
    const categoriesContainer = document.getElementById('categories');
    categories.forEach(category => {
        // console.log(category);
        const categoryDiv = document.createElement('div');
        // categoryDiv.classList.add('col');
        categoryDiv.innerHTML = `
        <button onclick="loadNewsCategoryId('${category.category_id}')" class="btn btn-light fs-5 fw-semibold">${category.category_name}</button>
        `;
        categoriesContainer.appendChild(categoryDiv);
    });

}

const loadNewsCategoryId = (id) => {
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then(res => res.json())
        .then(data => displayAllNews(data.data))
}

const displayAllNews = blogs => {
    // console.log(blogs);

    const blogsContainer = document.getElementById('blog-container');
    blogs.forEach(blog => {
        console.log(blog);
        const blogDiv = document.createElement('div');
        // blogDiv.classList.add('blog');
        blogDiv.innerHTML = `
        <div class="row p-3 m-4 shadow-lg rounded border-opacity-25 w-75 mx-auto">
            <div class="col-md-4">
                <img src="${blog.thumbnail_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${blog.title}</h5>
                    <p class="card-text">${blog.details.slice(0, 300)}</p>
                </div>
                    <div class="d-flex justify-content-center">
                        <div>
                            <img class="img-fluid author-img" src="${blog.author.img}" alt="">
                            <h6>${blog.author.name}</h6>
                        </div>
                        <div>
                            <h6>${blog.total_view}</h6>
                        </div>
                        <div>
                            <button onclick="loadNewsDetail('${blog.details.slice(0, 200) + '...'}', '${blog.imagr_url}')" href="#" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">More Info</button>
                        </div>
                        
                    </div>
            </div>
        </div>
        `;
        blogsContainer.appendChild(blogDiv);
    })
}



const loadNewsDetail = news_id => {
    fetch(`https://openapi.programming-hero.com/api/news/${news_id}`)
        .then(res => res.json())
        .then(data => console.log(data))
}

/* const displayNewsDetail = modal => {
    console.log(modal);
    const modalTitle = document.getElementById('displayModalLabel');
    console.log(modalTitle);
    // modalTitle.innerText = blog.name;
    const newsDetail = document.getElementById('news-details');
    newsDetail.innerHTML = `
    <h5>Author Name: ${modal.name} </h5>
    `;


} */



loadNewsDetail();




// displayAllNews();

loadNewsCategoryId();

loadNewsCategory();

// displayData();

