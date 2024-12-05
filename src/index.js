// Импорты
import './pages/index.css';
import { openPopup, closePopup, closePopupKeydown, closePopupOverlay, animatingPopup} from "./components/modal.js";
import {createCard, removeCard, changeLikeStatus} from "./components/card.js"
import {validationConfig} from "./components/validationConfig.js"
import {clearValidation, enableValidation, disableButtonElement} from "./components/validation.js"
import {downloadCardsList, getProfileInfo, changeProfileInfo, addNewCard, changeProfileImage} from "./components/api.js"
import {loadButton} from "./components/loadButton.js"



// Константы

const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');
const editButton = content.querySelector('.profile__edit-button');
const closeButtons = document.querySelectorAll('.popup__close');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const profileEditForm = document.querySelector('.popup_edit-profile-image');
const newProfileImage = document.querySelector('#profile-image-url-input');
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
const formNewAvatar = document.forms.namedItem('edit-profile-image');
let userId = "";



// Click по карточке

const imageCard = (cards) => {
    popupTypeImageCaption.textContent = cards.name;
    popupTypeImageImage.src = cards.link;
    popupTypeImageImage.alt = cards.name;
    openPopup(popupTypeImage, closePopupKeydown, closePopupOverlay);
};


// Вывести карточки на страницу

Promise.all([getProfileInfo(), downloadCardsList()])
    .then(([profileInfo, initialCards]) => {
        userId = profileInfo["_id"];
        profileTitle.textContent = profileInfo.name;
        profileDescription.textContent = profileInfo.about;
        profileImage.style = `background-image: url('${profileInfo.avatar}')`;
        initialCards.forEach((cards) => {
            placesList.append(createCard(cards, removeCard, changeLikeStatus, imageCard, userId));
        })
    })
    .catch(err => console.log(err));


// Слушатель открытия попапа редактирования профиля
editButton.addEventListener('click', () => {
    openPopup(popupTypeEdit, closePopupKeydown, closePopupOverlay);
    fillProfileForm();
    clearValidation(popupTypeEdit, validationConfig);
});


// Слушатель открытия попапа редактирования аватара

profileImage.addEventListener('click', () => {
    const buttonElement = profileEditForm.querySelector(validationConfig.submitButtonSelector);
    clearValidation(profileEditForm, validationConfig);
    openPopup(profileEditForm, closePopupKeydown, closePopupOverlay);
    formNewAvatar.reset();
    disableButtonElement(true, buttonElement, validationConfig);
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

function editProfileSubmit(evt) {
    evt.preventDefault();
    const submitButtonEditProfile = popupTypeEdit.querySelector(validationConfig.submitButtonSelector)
    loadButton(true, submitButtonEditProfile);
    changeProfileInfo(nameInput.value, jobInput.value)
        .then(profileInfo => {
            profileTitle.textContent = profileInfo.name;
            profileDescription.textContent = profileInfo.about;
            closePopup(popupTypeEdit);
        })
        .catch(err => console.log(err))
        .finally(() => loadButton(false, submitButtonEditProfile));
}


// Прикрепляем обработчик к форме редактирования профиля:

popupTypeEdit.addEventListener('submit', editProfileSubmit);


// Редактирование аватара пользователя

const editProfileImage = (evt) => {
    evt.preventDefault();
    const submitButtonEditAvatar = profileEditForm.querySelector(validationConfig.submitButtonSelector)
    loadButton(true, submitButtonEditAvatar);
    changeProfileImage(newProfileImage.value)
        .then(res => {
            profileImage.style = `background-image: url('${res.avatar}')`;
            closePopup(evt.target.closest('.popup_is-opened'));
            formNewAvatar.reset();
        })
        .catch(err => console.log(err))
        .finally(() => loadButton(false, submitButtonEditAvatar));
};


// Устанавливаем слушатель на форму редактирования аватара

formNewAvatar.addEventListener('submit', (evt) => {
    editProfileImage(evt);
});


// Слушатель открытия попапа добавления карточки

addButton.addEventListener('click', () => {
    const buttonElement = popupTypeNewCard.querySelector(validationConfig.submitButtonSelector);
    openPopup(popupTypeNewCard, closePopupKeydown, closePopupOverlay);
    clearValidation(popupTypeNewCard, validationConfig);
    formNewPlace.reset();
    disableButtonElement(true, buttonElement, validationConfig);
});


// Обработчик формы добавления карточки

popupTypeNewCard.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const submitButtonAddCard = formNewPlace.querySelector(validationConfig.submitButtonSelector)
    loadButton(true, submitButtonAddCard);
    addNewCard(cardName.value, cardUrl.value)
        .then(cards => {
            placesList.prepend(createCard(cards, removeCard, changeLikeStatus, imageCard, userId));
            closePopup(popupTypeNewCard);
            formNewPlace.reset();
        })
        .catch(err => console.log(err))
        .finally(() => loadButton(false, submitButtonAddCard));
});


// Анимирование попапа

animatingPopup(popups);


// Вызов функции вызова слушателя на форму

enableValidation(validationConfig);

