
const inputNumPage = document.querySelector('#page-num');
const btnPrev = document.querySelector('#btn-prev');
const btnNext = document.querySelector('#btn-next');
const limitPage = document.querySelector('#limit-page');
const imagesBlock = document.querySelector('#images-block');


function sendQuery(pageNum, limit) {
    imagesBlock.className = 'loading';

    let promise = new Promise((resolve, reject) => {
        // 1. Создаём новый объект XMLHttpRequest
        const xhr = new XMLHttpRequest();
        const client_id = 'ca5a2a324ba06f2cf8bede88a989bb6c2f5f87730032b3c6256b72888f2cc94c';
        const page = pageNum;
        const per_page = limit;
        let url = `https://api.unsplash.com/photos/?page=${page}&per_page=${per_page}&client_id=${client_id}`;

        // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
        xhr.open('GET', url, true);

        // 3. Отсылаем запрос
        xhr.send();

        xhr.onload = function () {
            if (this.status === 200) {
                resolve(this.responseText);
            } else {
                reject('err' + ' ' +  this.status);
                
            }
        }
    })
    
    let jsonFormat = dataJSON => JSON.parse(dataJSON); 
    let htmlFormat = data => data.map(image => `<img src="${image.urls.small}" />`);
    let renderImages = function (dataHtml) {
        let html = dataHtml.join('');
        imagesBlock.innerHTML = html;
    } 



    promise
        .then(jsonFormat)  // из JSON в объект JS
        .then(htmlFormat)  // достаём картинку из объекта
        .then(renderImages) // рендерим на экран картинки
        .then(() => {
            setTimeout(() => {
            imagesBlock.className = ''
            }, 600);
        }); // через 600мс после перерендеринга убираем класс 'Loading'
}

sendQuery(1, 6);

function changePrev() {
    inputNumPage.value > 1
        ? inputNumPage.value--
        : inputNumPage.value = 1;

    sendQuery(inputNumPage.value, limitPage.value);
}
function changeNext() {
    inputNumPage.value ++;
    
    sendQuery(inputNumPage.value, limitPage.value) ;
}
function changeLimit() {
    sendQuery(inputNumPage.value, limitPage.value) ;
}
function changeInput() {
    if(!inputNumPage.value || inputNumPage.value < 1) return;
    sendQuery (inputNumPage.value, limitPage.value) ;
}

btnPrev.onclick = changePrev;
btnNext.onclick = changeNext;
limitPage.onchange = changeLimit;
inputNumPage.oninput = changeInput;

