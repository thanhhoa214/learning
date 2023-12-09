let CATEGORIES_LENGTH = 0;
function submitCategory(index) {
    location.assign("./html/learning.html?category=" + index);
}
function onClickRandomCategory() {
    const number = Math.round(Math.random() * CATEGORIES_LENGTH);
    submitCategory(number);
}
(async function main() {
    const categoriesUrl = "./data/categories.json"
    const gg_translate_api_key = "AIzaSyDGOrd72uuMXDHOzWLQD7g9O_E1YmcRQQU";
    const pixabay_api_key = "13358490-8b932b757322b94d547bc6284";

    function getCategories(url) {
        return fetch(url).then(response => response.json()).catch(err => console.log("ERROR: function getCategories: ", err));
    }
    function getVnese(engWord) {
        return fetch(`https://translation.googleapis.com/language/translate/v2?source=en&target=vi&key=${gg_translate_api_key}&q=${engWord}`)
            .then(response => response.json())
            .then(json => json.data.translations[0].translatedText)
            .catch(err => console.error("ERROR: function getVnese: ", err));
    }
    function getImageURL(engWord) {
        return fetch(`https://pixabay.com/api/?key=${pixabay_api_key}&q=${engWord}&lang=en&image_type=photo&per_page=3`)
            .then(response => response.json())
            .then(json => {
                if (json.hits.length === 0) return getImageURL(engWord.substring(0, engWord.indexOf(" ")));
                return json.hits[0].largeImageURL;
            })
            .catch(err => console.error("ERROR: function getImageURL: ", err));
    }
    function loadCategories() {
        let cardsHTML = "";
        categoriesTitles.forEach((cate, index) => {
            cardsHTML += `<div class="card text-center m-2 text-dark bg-warning" style="width: 18rem; cursor:pointer" onclick="submitCategory(${index})">
          <a href="#" class="btn btn-primary btn-lg font-weight-bold">${cate.title}</a>
          <img class="card-img-top" style="height: 10rem" src="${cate.image_url}" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-text">${cate.vnese}</h5>
              </div>
            </div>`
        });
        document.getElementById("content").innerHTML = cardsHTML;
    }

    const categories = await getCategories(categoriesUrl);
    const categoriesTitles = categories.map(category => ({ title: category.title }))
    CATEGORIES_LENGTH = categoriesTitles.length;
    const promiseArray = [];
    categoriesTitles.forEach(categoryTitle => {
        promiseArray.push(getVnese(categoryTitle.title));
        promiseArray.push(getImageURL(categoryTitle.title));
    });
    const promiseResults = await Promise.all(promiseArray);
    const promiseResultsLength = promiseResults.length;
    for (let i = 0; i < promiseResultsLength; i = i + 2) {
        categoriesTitles[i/2].vnese = promiseResults[i];
        categoriesTitles[i/2].image_url = promiseResults[i+1];
    }
    loadCategories();
})();
