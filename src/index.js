import './sass/main.scss';

import ApiServise from './js/api-service';
import refs from './js/refs';
import LoadMore from './js/load-more-btn';

import picsCardsTpl from './templates/pics-cards.hbs';


const apiServise = new ApiServise();

const loadMore = new LoadMore({ // Экземпляр класса кнопки загрузки
    selector: '[data-action="load-more"]',
    hidden: true,
});

refs.searchForm.addEventListener('submit', onSearchForm);
loadMore.refs.button.addEventListener('click', onLoadBtn);

function onSearchForm(e) {
    e.preventDefault();
    apiServise.query = e.currentTarget.elements.query.value;

    if (apiServise.query.trim() === '') {
        return alert('Некорректный ввод!');
    };

    loadMore.show();
    clearGallery();
    apiServise.resetPage();
    fetchHits();
};

function onLoadBtn() {
    if (apiServise.query.trim() === '') {
        return alert('Ошибка при загрузке!');
    };

    fetchHits();
};

function fetchHits() {
    loadMore.disable();
    apiServise.fetchPictures().then(hits => {
        renderMarkup(hits);
        scrollToRenderedMarkup()
        loadMore.enable();
    });
}

function renderMarkup(hits) {
    refs.gallery.insertAdjacentHTML('beforeend', picsCardsTpl(hits));
};

function clearGallery() {
    refs.gallery.innerHTML = '';
};


function scrollToRenderedMarkup() {
    setTimeout(() => {
        loadMore.refs.button.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        });
    }, 250);
};

