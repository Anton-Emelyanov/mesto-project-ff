// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

// @todo: Функция создания карточки



// @todo: Функция удаления карточки
function deleteCard (event) {
    const cardDelete = event.target.parentNode;
    cardDelete.remove();
}


// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
   const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
   cardElement.querySelector('.card__title').textContent = item.name;
   cardElement.querySelector('.card__image').src = item.link;
   cardElement.querySelector('.card__delete-button').addEventListener('click', function (event) {
       deleteCard(event);
   });

   placesList.append(cardElement);

});


