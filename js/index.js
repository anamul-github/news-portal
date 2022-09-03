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
                    <p class="card-text">${blog.details.slice(0, 300) + '...'}</p>
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
                            <button onclick="loadNewsDetail('${blog._id}')" href="#" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#displayModal">More Info</button>
                        </div>
                        
                    </div>
            </div>
        </div>
        `;
        blogsContainer.appendChild(blogDiv);
    })
}



const loadNewsDetail = details => {
    fetch(`https://openapi.programming-hero.com/api/news/${details}`)
        .then(res => res.json())
        .then(data => displayNewsDetail(data.data))
}

const displayNewsDetail = modals => {
    console.log(modals);

    modals.forEach(modal => {
        console.log(modal);

        const modalTitle = document.getElementById('displayModalLabel');
        modalTitle.innerHTML = `
        <h3>Title: ${modal.title ? modal.title : 'No Title Found'}</h3>
        `;
        const newsDetail = document.getElementById('news-details');
        newsDetail.innerHTML = `
            <h5>Author Name: ${modal.author.name ? modal.author.name : 'No Author Found'}</h5>
            <h6>Published Date: ${modal.author.published_date ? modal.author.published_date : 'No Published Date Found'}</h6>
            <h6>Views: ${modal.total_view ? modal.total_view : 'No Views Found'}</h6>
            <p>Details: ${modal.details ? modal.details : 'No Details Found'}</p>
            `;
    })
}



loadNewsDetail();


// displayNewsDetail();

// displayAllNews();

loadNewsCategoryId();

loadNewsCategory();

// displayData();

