let counter = 0;
let targetCategory;
let targetCategoryWordsLength;

function loadSlide(slideId) {
    let index = counter++ % targetCategoryWordsLength;
    let cardsHTML = "";
    const word = targetCategory.words[index];
    localStorage.setItem("currentWord", JSON.stringify(word));
    cardsHTML += `
    <div class="card text-center text-dark col-10 offset-1 mt-2">
<span class="btn btn-lg font-weight-bold" id="wordEng">${word.eng}</span>
<img class="card-img-top rounded" id="wordImg" src="${word.image_url}" alt="No image !">
<div class="card-body">
<button type="button" name="btnEnglish" id="btnEnglish" class="btn btn-primary btn-lg border-secondary" data-toggle="modal" data-target="#meaningModal" data-meaning="en">English</button> 
<button type="button" name="btnVietnamese" id="btnVietnamese" class="btn btn-warning btn-lg border-secondary" data-toggle="modal" data-target="#meaningModal" data-meaning="vn">Vietnamese</button> 
<button class="btn btn-dark" id="btnPopular" onclick="onClickBtnPopular()">Popular Meaning</button>
</div></div>`
    $("label.row").toArray().forEach(item => item.innerHTML = "");
    $('#'+slideId).html(cardsHTML);
    setOnclickExcept(slideId);
}
function setOnclickExcept(slideId) {
    const currentSlide = $('#'+slideId);
    currentSlide[0].onclick = null;
    $('.row').toArray()
        .filter(slide => slide.id != slideId)
        .forEach(slide => slide.onclick = () => loadSlide(slide.id));
}
function onClickBtnPopular() {
    const word  = JSON.parse(localStorage.getItem('currentWord'));
    $('#wordEng')[0].innerHTML = `${word.eng} <span class="meaning">${word.vnese}</span> `;
    $('#wordImg').css('width','90%');
    $('#wordImg').css('max-height','17.5vw');
    $('#wordImg').css('margin','auto');
}
(async function main() {
    const categoriesUrl = "../data/categories.json"
    const pixabay_api_key = "13358490-8b932b757322b94d547bc6284";
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
            return Promise.resolve();
        } catch (err) {
            console.error("ERROR: function setDataForAll: ", err);
        }
    }


    try {
        targetCategory = await getTargetCategory();
        targetCategoryWordsLength = targetCategory.words.length;
        await setDataForAll();
        onload = (event) => {
            document.querySelector('#cateTitle').innerText = targetCategory.title;
            loadSlide('slide3');
        }
        onload();
    } catch (err) {
        console.error("ERROR main: ", err);
    }
})();
