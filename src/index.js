// Импорты
import './pages/index.css';
import { openPopup, closePopup, closePopupKeydown, closePopupOverlay, animatingPopup} from "./components/modal.js";
import {createCard, deleteCard, likeCard} from "./components/card.js"
import {validationConfig} from "./components/validationConfig.js"
import {clearValidation, enableValidation} from "./components/validation.js"
import {downloadCardsList, getProfileInfo, changeProfileInfo} from "./components/api.js"
import {loadButton} from "./components/loadButton.js"



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
const profileImage = document.querySelector('.profile__image');
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
let userId = "";



// Вывести карточки на страницу

Promise.all([getProfileInfo(), downloadCardsList()])
    .then(([profileInfo, initialCards]) => {
        userId = profileInfo["_id"];
        profileTitle.textContent = profileInfo.name;
        profileDescription.textContent = profileInfo.about;
        profileImage.style = `background-image: url('${profileInfo.avatar}')`;
        initialCards.forEach((cards) => {
            placesList.append(createCard(cards, removeCard, changeCardLikeStatus, openImagePopup, userId));
        })
    })
    .catch(err => console.log(err));


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


// Обработчик «отправки» формы редактирования профиля
function handleFormSubmit(evt) {
    evt.preventDefault();
    console.log(evt);
    loadButton(true, popupTypeEdit.querySelector('.popup__button'));
    changeProfileInfo(nameInput.value, jobInput.value)
        .then(profileInfo => {
            profileTitle.textContent = profileInfo.name;
            profileDescription.textContent = profileInfo.about;
            closePopup(popupTypeEdit);
        })
        .catch(err => console.log(err))
        .finally(() => loadButton(false, popupTypeEdit.querySelector('.popup__button')));
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

