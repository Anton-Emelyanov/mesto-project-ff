// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;


// @todo: DOM узлы

const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');


// @todo: Функция создания карточки

function createCard(item, deleteCallback){
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');

    cardElement.querySelector('.card__title').textContent = item.name;
    cardImage.src = item.link;
    cardImage.alt = 'Фото'
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCallback);
    return cardElement;
}


// @todo: Функция удаления карточки

function deleteCard (event) {
    const cardDelete = event.target.parentNode;
    cardDelete.remove();
}


// @todo: Вывести карточки на страницу

initialCards.forEach(item => {
    placesList.append(createCard(item, deleteCard))
})
