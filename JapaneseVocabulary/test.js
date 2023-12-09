(async () => {
    const gg_translate_api_key = "AIzaSyDGOrd72uuMXDHOzWLQD7g9O_E1YmcRQQU";
    const pixabay_api_key = "13358490-8b932b757322b94d547bc6284";
    const dataUrl = './data.json';

    const btnPrevious = $('#btnPrevious');
    const btnRandom = $('#btnRandom');
    const btnNext = $('#btnNext');
    const btnCheck = $('#btnCheck');
    const btnShowResult = $('#btnShowResult');
    const modalAlert = $('#modalAlert');
    const modalAlertContent = $('#modalAlertContent');
    const txtHira = $('#txtHira');
    const txtHanviet = $('#txtHanviet');
    const resultBlock = $('#resultBlock');
    const kanjiSpan = $('#kanji');
    const hiraSpan = $('#hira');
    const hanvietSpan = $('#hanviet');
    const vneseSpan = $('#vnese');

    const updateUI = word => {
        // set text
        kanjiSpan.text(word.kanji);
        kanjiSpan.css('background-image', `url(${word.imgUrl})`);
        hiraSpan.text(word.hira);
        hanvietSpan.text(word.hanviet);
        vneseSpan.text(word.vnese);

        // set css
        if (word.kanji.length < 3) kanjiSpan.css('font-size', '14rem');
        else if (word.kanji.length < 6) kanjiSpan.css('font-size', '10rem');
        else kanjiSpan.css('font-size', '8rem');

        if (word.hira.length < 9) hiraSpan.css('font-size', '1.2rem');
        else hiraSpan.css('font-size', '0.8rem');
        
        if (word.hanviet.length < 9) hanvietSpan.css('font-size', '1.2rem');
        else hanvietSpan.css('font-size', '0.8rem');
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
    const main = async () => {
        let words;
        const addEngVneseImageWordPromises = [];
        let currentWord;
        const retrieveBasicUI = () => {
            txtHira.removeClass('bg-danger bg-success text-light');
            txtHanviet.removeClass('bg-danger bg-success text-light');
            txtHira.val('');
            txtHanviet.val('');
            btnShowResult.removeClass('d-none');
            resultBlock.addClass('d-none');
        }
        // set events
        const onClickBtnPrevious = (event) => {
            const indexOfCurrentWord = words.indexOf(currentWord);
            const previousIndex = (indexOfCurrentWord === 0) ? words.length - 1 : (indexOfCurrentWord - 1) % words.length;
            currentWord = words[previousIndex];
            retrieveBasicUI();
            updateUI(currentWord);
        }
        const onClickBtnNext = (event) => {
            const indexOfCurrentWord = words.indexOf(currentWord);
            const nextIndex = (indexOfCurrentWord + 1) % words.length;
            currentWord = words[nextIndex];
            retrieveBasicUI();
            updateUI(currentWord);
        }
        const onClickBtnRandom = (event) => {
            const indexOfCurrentWord = words.indexOf(currentWord);
            let randomNumber;
            do {
                randomNumber = Math.round(Math.random() * (words.length - 1));
            } while (randomNumber === indexOfCurrentWord);
            currentWord = words[randomNumber];
            retrieveBasicUI();
            updateUI(currentWord);
        }
        const onClickBtnCheck = (event) => {
            const txtHiraIsTrue = txtHira.val().toLowerCase() === currentWord.hira.toLowerCase();
            const txtHanvietIsTrue = txtHanviet.val().toLowerCase() === currentWord.hanviet.toLowerCase();
            if (txtHiraIsTrue && txtHanvietIsTrue) {
                const message = `<i class="fa fa-check"></i> Bingo. Great answer !`;
                txtHira.removeClass('bg-danger');
                txtHira.addClass('bg-success text-light');
                txtHanviet.removeClass('bg-danger');
                txtHanviet.addClass('bg-success text-light');
                modalAlertContent.removeClass('bg-danger');
                modalAlertContent.addClass('bg-success text-light');
                modalAlertContent.html(message);
                modalAlert.modal('show');
                setTimeout(() => {
                    modalAlert.modal('hide');
                    onClickBtnNext(event);
                }, 1000);
            } else {
                const message = `<i class="fa fa-window-close rounded-circle"></i> Something was wrong!`;
                if (txtHiraIsTrue) {
                    txtHira.removeClass('bg-danger');
                    txtHira.addClass('bg-success text-light');
                } else {
                    txtHira.addClass('bg-danger text-light');
                }
                if (txtHanvietIsTrue) {
                    txtHanviet.removeClass('bg-danger');
                    txtHanviet.addClass('bg-success text-light');
                } else {
                    txtHanviet.addClass('bg-danger text-light');
                }
                modalAlertContent.removeClass('bg-success');
                modalAlertContent.addClass('bg-danger text-light');
                modalAlertContent.html(message);
                modalAlert.modal('show');
                setTimeout(() => modalAlert.modal('hide'), 1000);
            }
        }
        const onClickBtnShowResult = (event) => {
            btnShowResult.addClass('d-none');
            resultBlock.removeClass('d-none');
        }
        btnPrevious.click(onClickBtnPrevious);
        btnNext.click(onClickBtnNext);
        btnRandom.click(onClickBtnRandom);
        btnCheck.click(onClickBtnCheck);
        btnShowResult.click(onClickBtnShowResult);

        if (localStorage.getItem("words") === null) {
            const json = await fetch(dataUrl);
            words = await json.json();
        } else {
            words = JSON.parse(localStorage.getItem("words"));
        }
        for (let index = 0; index < words.length; index++) {
            const word = words[index];
            addEngVneseImageWordPromises.push(addEngVneseImageWord(word));
        }
        await Promise.all(addEngVneseImageWordPromises);
        currentWord = words[0];
        updateUI(currentWord);
    }

    main();
}
)();