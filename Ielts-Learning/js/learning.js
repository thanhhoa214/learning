function redirectToTesting() {
    location.assign(location.href.replace("learning", "testing"));
}

(async function main() {
    const categoriesUrl = "../data/categories.json"
    const pixabay_api_key = "13358490-8b932b757322b94d547bc6284";

    let targetCategory = [];

    async function getCategories(url) {
        try {
            const response = await fetch(url);
            const categories = await response.json();
            return categories;
        } catch (err) {
            console.log("ERROR: function getCategories: ", err);
        }
    }
    async function getTargetCategory() {
        const categories = await getCategories(categoriesUrl);
        const urlQuery = location.search;
        const categoryIndex = urlQuery.substr(urlQuery.indexOf("=") + 1);
        return categories[categoryIndex];
    }
    async function getImageURL(word) {
        try {
            const response = await fetch(`https://pixabay.com/api/?key=${pixabay_api_key}&q=${word.eng}&lang=en&image_type=photo&per_page=3`);
            const pixaObject = await response.json();
            if (pixaObject.hits.length === 0) {
                const resendWord = { eng: word.eng.substring(0, word.eng.indexOf(" ")) };
                return getImageURL(resendWord);
            }
            return Promise.resolve(pixaObject.hits[0].largeImageURL);
        } catch (err) {
            console.error("ERROR: function getImageURL: ", err);
        }
    }
    async function setDataForAll() {
        try {
            const words = targetCategory.words;
            const promiseConcatination = words.map(getImageURL);
            const results = await Promise.all(promiseConcatination)
            for (let index = 0; index < promiseConcatination.length; index++) {
                words[index].image_url = results[index];
            }
        } catch (err) {
            console.error("ERROR: function setDataForAll: ", err);
        }
    }
    function loadWords() {
        let cardsHTML = "";
        targetCategory.words.forEach(word => {
            cardsHTML += `<div class="card text-center m-2 text-dark bg-warning" style="width: 31.2%">
    <a href="#" class="btn btn-primary btn-lg font-weight-bold">${word.eng}</a>
    <img class="card-img-top" style="height: 14rem" src="${word.image_url}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-text">${word.vnese}</h5>
        </div>
      </div>`
        });
        document.getElementById("cateTitle").innerText = targetCategory.title;
        document.getElementById("content").innerHTML = cardsHTML;
    }
    try {
        targetCategory = await getTargetCategory();
        await setDataForAll();
        loadWords();
    } catch (err) {
        console.error("ERROR main: ",err);
    }
})();