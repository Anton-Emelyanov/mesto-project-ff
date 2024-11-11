import {closePopupKeydown, closePopupOverlay, openPopup} from "./modal";

const cardTemplate = document.querySelector('#card-template').content;
const popupTypeImage = document.querySelector('.popup_type_image');
const popupTypeImageCaption = popupTypeImage.querySelector('.popup__caption');
const popupTypeImageImage = popupTypeImage.querySelector('.popup__image');


// Функция создания карточки

export function createCard(item, deleteCallback, likeCallback, imageCallback){
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');

    cardElement.querySelector('.card__title').textContent = item.name;
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCallback);
    cardElement.querySelector('.card__like-button').addEventListener('click', likeCallback);
    cardElement.querySelector('.card__image').addEventListener('click', imageCallback);
    return cardElement;
}


// Функция удаления карточки

export function deleteCard (event) {
    const cardDelete = event.target.parentNode;
    cardDelete.remove();
}

// like карточки

export function likeCard (event) {
    if (event.target.classList.contains('card__like-button')) {
      event.target.classList.toggle('card__like-button_is-active');
    }
}


// Click по карточке

export function imageCard (event) {
    popupTypeImageCaption.textContent = event.target.offsetParent.innerText;
    popupTypeImageImage.src = event.target.currentSrc;
    popupTypeImageImage.alt = event.target.alt;
    openPopup(popupTypeImage, closePopupKeydown, closePopupOverlay);
}