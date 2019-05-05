
var promise = new Promise((resolve, reject) => {
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();

    var url = "https://api.unsplash.com/photos/?page=2&per_page=20&client_id=ca5a2a324ba06f2cf8bede88a989bb6c2f5f87730032b3c6256b72888f2cc94c";

    // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
    xhr.open('GET', url, true);

    // 3. Отсылаем запрос
    xhr.send();

xhr.onload = function () {
        if (this.status === 200) {
            resolve(this.responseText);
        } else {
            reject('err' + this.status);
        }

}
})

var renderImages = function (dataHtml) {
    var html = dataHtml.join('');
    document.querySelector('#images-block').innerHTML = html;
    
}
var htmlFormat = data => data.map(image => `<img src="${image.urls.thumb}" />`);


var jsonFormat = dataJSON => JSON.parse(dataJSON);


promise
    .then(jsonFormat)
    .then(htmlFormat)
    .then(renderImages)
