'use strict';
(async () => {
    const gg_translate_api_key = "AIzaSyDGOrd72uuMXDHOzWLQD7g9O_E1YmcRQQU";
    const pixabay_api_key = "13358490-8b932b757322b94d547bc6284";
    const goo_app_id = "b8de25c9a0c5f9b09ac4bfa8f2d2ad3ebae3127ad14bbc58823b222b5ea0b09a";
    const dataUrl = './data.json';

    const btnRandom = $('#btnRandom');
    const btnAdd = $('#btnAdd');
    const btnImport = $('#btnImport');
    const inputImport = $('#inputImport');
    const btnExport = $('#btnExport');
    const btnTest = $('#btnTest');
    const btnChange = $('#btnChange');
    const spanCounter = $('#counter');
    const modalAlert = $('#modalAlert');
    const modalAddMore = $('#modalAddMore');
    const modalExport = $('#modalExport');
    const modalAlertContent = $('#modalAlert .modal-body');
    const kanjiSpan = $('#kanji');
    const hiraSpan = $('#hira');
    const hanvietSpan = $('#hanviet');
    const vneseSpan = $('#vnese');

    const updateUI = word => {
        kanjiSpan.text(word.kanji);
        kanjiSpan.css('background-image', `url(${word.imgUrl})`);
        hiraSpan.text(word.hira);
        hanvietSpan.text(word.hanviet);
        vneseSpan.text(word.vnese);
        // set css
        if (word.kanji.length < 3) kanjiSpan.css('font-size', '14rem');
        else if (word.kanji.length < 6) kanjiSpan.css('font-size', '10rem');
        else kanjiSpan.css('font-size', '8rem');

        if (word.hira.length < 20) hiraSpan.css('font-size', '3rem');
        else hiraSpan.css('font-size', '2rem');
        
        if (word.hanviet.length < 20) hanvietSpan.css('font-size', '3rem');
        else hanvietSpan.css('font-size', '2rem');
    }
    const getMeaning = async (strWord, srcLang, targetLang) => {
        try {
            const response = await fetch(`https://translation.googleapis.com/language/translate/v2?source=${srcLang}&target=${targetLang}&key=${gg_translate_api_key}&q=${strWord}`)
            const json = await response.json();
            return json.data.translations[0].translatedText;
        } catch (err) {
            console.error("ERROR: function getVnese: ", err);
        }
    }
    const getImageURL = async word => {
        try {
            const response = await fetch(`https://pixabay.com/api/?key=${pixabay_api_key}&q=${word}&lang=en&image_type=photo&per_page=3`);
            const pixaObject = await response.json();
            if (pixaObject.hits.length === 0) {
                const resendWord = { eng: word.substring(0, word.indexOf(" ")) };
                return getImageURL(resendWord);
            }
            return pixaObject.hits[0].largeImageURL;
        } catch (err) {
            console.error("ERROR: function getImageURL: ", err);
        }
    }
    const addEngVneseImageWord = async word => {
        const results = await Promise.all([getMeaning(word.kanji, 'ja', 'en'), getMeaning(word.kanji, 'ja', 'vi')]);
        word.eng = results[0];
        word.vnese = results[1];
        word.imgUrl = await getImageURL(word.eng);
    }
    const getFileContent = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const contents = e.target.result;
                resolve(contents);
            };
            reader.readAsText(file);
        })
    }

    const main = async () => {
        let words;
        const addEngVneseImageWordPromises = [];
        const reloadBasicComponent = async () => {
            localStorage.setItem("words", JSON.stringify(words));
            spanCounter.text(words.length);
            for (let index = 0; index < words.length; index++) {
                const word = words[index];
                if (!word.imgUrl)
                    addEngVneseImageWordPromises.push(addEngVneseImageWord(word));
            }
            await Promise.all(addEngVneseImageWordPromises);
            updateUI(words[0]);
        }
        // events
        const onClickBtnRandom = (event) => {
            const randomNumber = Math.round(Math.random() * (words.length - 1));
            const randomWord = words[randomNumber];
            updateUI(randomWord);
        }
        const onChangeInputImport = async (event) => {
            const file = event.target.files[0];
            if (!file) {
                return;
            }
            const content = await getFileContent(file);
            words = JSON.parse(content);
            reloadBasicComponent();
            modalAddMore.modal('hide');
        }
        const onClickBtnAdd = async (event) => {
            const inputElements = $('input[type=text].form-control').toArray();
            const propsName = ['kanji', 'hira', 'hanviet']
            const newWord = {};
            let message;
            let time;
            inputElements.forEach((input, i) => {
                newWord[propsName[i]] = input.value;
                input.value = '';
            });
            await addEngVneseImageWord(newWord);

            const indexOfFilterWord = words.indexOf(words.filter(word => word.kanji === newWord.kanji)[0]);
            if (!indexOfFilterWord) {
                message = `<i class="fa fa-window-close"></i> 
                <span class="keyWord"> ${newWord.kanji} </span> already had in data.json.
                `;
                modalAlertContent.removeClass('bg-success');
                modalAlertContent.addClass('bg-danger');
                btnChange.removeClass('d-none');
                btnChange.click(event => {
                    words[indexOfFilterWord] = newWord;
                });
                time = 2000;
            } else {
                message = `<i class="fa fa-check" aria-hidden="true"></i> Stored <br/>
                <span style="font-size:15px">Added word to the current process. <br/>You should save it by using <b>Export Data</b></span>`;
                modalAlertContent.removeClass('bg-danger');
                modalAlertContent.addClass('bg-success');
                btnChange.addClass('d-none');
                words.push(newWord);
                time = 1000;
            }
            reloadBasicComponent();
            modalAlertContent.html(message);
            modalAddMore.modal('hide');
            modalAlert.modal('show');
            setTimeout(() => {
                modalAlert.modal('hide');
                modalAddMore.modal('show');
            }, time);

        }
        const onClickBtnExport = (event) => {
            navigator.clipboard.writeText(JSON.stringify(words));
            modalExport.modal('show');
        }
        const onClickBtnTest = (event) => {
            if (location.href.endsWith('index.html'))
                location.href = location.href.replace('index', 'test');
            else location.href = location.href + 'test.html';
        }
        const onClickKanjiSpan = (event) => {
            onClickBtnRandom(event);
        }

        btnRandom.click(onClickBtnRandom);
        btnAdd.click(onClickBtnAdd);
        btnImport.click(event => inputImport.trigger('click'));
        inputImport.change(onChangeInputImport);
        btnExport.click(onClickBtnExport);
        btnTest.click(onClickBtnTest);
        kanjiSpan.click(onClickKanjiSpan);

        if (localStorage.getItem("words") === null) {
            const json = await fetch(dataUrl);
            words = await json.json();
        } else {
            words = JSON.parse(localStorage.getItem("words"));
        }
        reloadBasicComponent();
    }

    main();
}
)();