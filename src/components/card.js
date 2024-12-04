// Импорты
import { deleteCard, setCardLike, removeCardLike } from "./api";

// Константы
const cardTemplate = document.querySelector('#card-template').content;
const isLike = (cards, userId) => {
    return cards.likes.some(like => like._id === userId);
};


// Функция создания карточки

export function createCard(cards, deleteCard, changeLikeStatus, openImagePopup, userId){
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');

    cardElement.querySelector('.card__title').textContent = cards.name;
    cardImage.src = cards.link;
    cardImage.alt = cards.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    cardElement.dataset.id = cards._id;
    if (userId === cards.owner._id) {
        deleteButton.addEventListener('click', (evt) => {
            deleteCard(evt, cards._id);
        });
    }
    else {
        deleteButton.remove();
    }
    cardImage.addEventListener('click', () => {
        openImagePopup(cards);
    });

    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardLikeCounter = cardElement.querySelector('.card__like-counter');
    cardLikeCounter.textContent = cards.likes.length;
    if (isLike(cards, userId)) {
        cardLikeButton.classList.add('card__like-button_is-active');
    } else {
        cardLikeButton.classList.remove('card__like-button_is-active');
    }
    cardLikeButton.addEventListener('click', () => {
        changeLikeStatus(cards, userId, cardElement, cardLikeButton, cardLikeCounter)
    });

    return cardElement;
}


// Функция удаления карточки

export const removeCard = (evt, cardsId) => {
    const removedCard = evt.target.closest('.card');
    deleteCard(cardsId)
        .then((res) => {
            removedCard.remove();
        })
        .catch(err => console.log(err))
};


// like карточки

export const changeLikeStatus = (cards, userId, cardElement, cardLikeButton, cardLikeCounter) => {
    if(isLike(cards, userId)) {
        removeCardLike(cards._id)
            .then((res) => {
                cardLikeButton.classList.remove('card__like-button_is-active');
                cardLikeCounter.textContent = res.likes.length;
                cards.likes = res.likes;
            })
            .catch(err => console.log(err));
    }
    else {
        setCardLike(cards._id)
            .then((res) => {
                cardLikeButton.classList.add('card__like-button_is-active');
                cardLikeCounter.textContent = res.likes.length;
                cards.likes = res.likes;
            })
            .catch(err => console.log(err));
    }
};