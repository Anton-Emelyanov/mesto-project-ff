
// Изменение класса попапа
const editPopupClass = (popupElement) => {
    popupElement.classList.toggle('popup_is-opened');
};


// Анимирование попапа
export const animatingPopup = (popups) => {
    popups.forEach((item) => {
        item.classList.add('popup_is-animated');
    });
};


// Открытия попапа
export const openPopup = (popupElement) => {
    editPopupClass(popupElement);
    document.addEventListener('keydown', closePopupKeydown);
    popupElement.addEventListener('click', closePopupOverlay);
};

// Закрытия попапа
export const closePopup = (openedPopup) => {
    editPopupClass(openedPopup);
    document.removeEventListener('keydown', closePopupKeydown);
    openedPopup.removeEventListener('click', closePopupOverlay);
};

// Закрытие на клавишу Esc
export const closePopupKeydown = (popup) => {
    if (popup.key === 'Escape') {
        closePopup(document.querySelector('.popup_is-opened'));
    }
};

// Закрытие на оверлей
export const closePopupOverlay = (event) => {
    if (event.currentTarget === event.target) {
        closePopup(event.target.closest('.popup_is-opened'));
    }
};

