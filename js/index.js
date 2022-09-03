const loadNewsCategory = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayData(data.data.news_category))
}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
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
    toggleSpinner(true);
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then(res => res.json())
        .then(data => displayAllNews(data.data))
}

const displayAllNews = blogs => {
    const blogsContainer = document.getElementById('blog-container');
    blogsContainer.textContent = '';

    // display no news found
    const noNews = document.getElementById('no-found-message');
    if (blogs.length === 0) {
        noNews.classList.remove('d-none');
    }
    else {
        noNews.classList.add('d-none');
    }

    // Display News Count
    const newsCount = document.getElementById('news-count');
    newsCount.innerHTML = `
        <h5 class="ps-4">  ${blogs.length} items found in this category</h5>
    `

    blogs.forEach(blog => {
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
                            <img class="img-fluid author-img" src="${blog.author.img ? blog.author.img : 'No Image Found'}" alt="">
                            <h6>${blog.author.name ? blog.author.name : 'No Name Found'}</h6>
                        </div>
                        <div>
                            <h6>${blog.total_view ? blog.total_view : 'No Views'}</h6>
                        </div>
                        <div>
                            <button onclick="loadNewsDetail('${blog._id}')" href="#" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#displayModal">More Info</button>
                        </div>
                        
                    </div>
            </div>
        </div>
        `;
        blogsContainer.appendChild(blogDiv);
    });
    toggleSpinner(false);
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
            <h6>Views: ${modal.total_view ? modal.total_view : 'No Views'}</h6>
            <img class="img-fluid" src="${modal.author.img ? modal.author.img : 'No Image Found'}" alt="">
            `;
    })
}



loadNewsDetail();


// displayNewsDetail();

// displayAllNews();

loadNewsCategoryId();

loadNewsCategory();

// displayData();

