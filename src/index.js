// Импорты
import './pages/index.css';
import {initialCards} from  "./components/cards";
import { openPopup, closePopup, closePopupKeydown, closePopupOverlay, animatingPopup} from "./components/modal";
import {createCard, deleteCard, likeCard} from "./components/card.js"
import {validationConfig} from "./components/validationConfig.js"
import {clearValidation, enableValidation} from "./components/validation.js"



// Константы

const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');
const editButton = content.querySelector('.profile__edit-button');
const closeButtons = document.querySelectorAll('.popup__close');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const nameInput = popupTypeEdit.querySelector('.popup__input_type_name');
const jobInput = popupTypeEdit.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const addButton = content.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const cardName = popupTypeNewCard.querySelector('.popup__input_type_card-name');
const cardUrl = popupTypeNewCard.querySelector('.popup__input_type_url');
const popups = document.querySelectorAll('.popup');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupTypeImageCaption = popupTypeImage.querySelector('.popup__caption');
const popupTypeImageImage = popupTypeImage.querySelector('.popup__image');
const formNewPlace = document.forms.namedItem('new-place');
const data = {};



// Вывести карточки на страницу

initialCards.forEach(item => {
    placesList.append(createCard(item, deleteCard, likeCard, imageCard))
})


// Слушатель открытия попапа редактирования профиля
editButton.addEventListener('click', () => {
    openPopup(popupTypeEdit, closePopupKeydown, closePopupOverlay);
    fillProfileForm();
    clearValidation(popupTypeEdit, validationConfig);
});


// Слушатель закрытия попапа
closeButtons.forEach((closeButton) => {
    closeButton.addEventListener('click', () => {
        closePopup(closeButton.closest('.popup_is-opened'));
    })
});


// Подтягиваем данные из профиля в форму
const fillProfileForm = () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
};


// Обработчик «отправки» формы
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupTypeEdit);
}


// Прикрепляем обработчик к форме редактирования профиля:

popupTypeEdit.addEventListener('submit', handleFormSubmit);


// Слушатель открытия попапа добавления карточки

addButton.addEventListener('click', () => {
    openPopup(popupTypeNewCard, closePopupKeydown, closePopupOverlay);
    clearValidation(popupTypeNewCard, validationConfig);
    formNewPlace.reset();
});


// Обработчик формы добавления карточки

function addCard(evt) {
    evt.preventDefault();
    data.name = cardName.value;
    data.link = cardUrl.value;
    placesList.prepend(createCard(data, deleteCard, likeCard, imageCard))
    formNewPlace.reset();
    closePopup(popupTypeNewCard);
}


// Прикрепляем обработчик к форме добавления карточки

popupTypeNewCard.addEventListener('submit', addCard);


// Click по карточке

export function imageCard (event) {
    popupTypeImageCaption.textContent = event.target.offsetParent.innerText;
    popupTypeImageImage.src = event.target.currentSrc;
    popupTypeImageImage.alt = event.target.alt;
    openPopup(popupTypeImage, closePopupKeydown, closePopupOverlay);
}


// Анимирование попапа

animatingPopup(popups);


// Вызов функции вызова слушателя на форму

enableValidation(validationConfig);