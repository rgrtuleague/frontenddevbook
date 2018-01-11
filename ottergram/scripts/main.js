var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;

function setDetails(imageUrl, titleText)
{
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail)
{
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail)
{
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail)
{
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb)
{
    'use strict';
    thumb.addEventListener('click', function(event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    })
}

function getThumbnailsArray()
{
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function initializeEvents()
{
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();
}

function hideDetails()
{
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails()
{
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function() {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPressHandler()
{
    'use strict';
    document.body.addEventListener('keyup', function(event){
        event.preventDefault();
        if (event.keyCode === ESC_KEY) {
            hideDetails();
        }
    });
}

initializeEvents();

var arrayURLImages = [
    'https://img3.badfon.ru/original/1920x1080/1/ce/vydry-dve-lyubov-fon.jpg',
    'http://mtdata.ru/u24/photoE6D7/20442202369-0/original.jpg',
    'http://333v.ru/uploads/b2/b2a3371aa8a06380c83d215b225ad78b.jpg',
    'https://uc.lolkot.ru/picture/8779_1.jpg',
    'http://fotorelax.ru/wp-content/uploads/2016/03/Wildlife-in-photographs-Andrew-Wakefield-18.jpg',
    'https://pbs.twimg.com/media/Cc3fWDCUUAAKiZ7.jpg:large',
    'https://cdn.fishki.net/upload/post/2017/01/31/2206857/5c18bbb9e2bc5f86a9f1bd2932da6bf4.jpg'
];

function getRandomUrlImage()
{
    var n = Math.round(Math.random() * 6);
    return arrayURLImages[n];
}



