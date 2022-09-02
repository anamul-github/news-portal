const loadnewsCategory = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(news => displayData(news.data.news_category))
}

const displayData = categories => {
    const categoriesContainer = document.getElementById('categories');
    categories.forEach(category => {
        console.log(category);
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('col');
        categoryDiv.innerHTML = `
        <button type="button" class="btn btn-light">${category.category_name}</button>
        `;
        categoriesContainer.appendChild(categoryDiv);
    })

}


loadnewsCategory();

displayData();