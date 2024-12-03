// Эндпоинт и данные для авторизации

const authorizationConfig = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-28',
    headers: {
        authorization: 'a4d488ed-cddf-4d94-9bf3-3ef89f8b3a00',
        'Content-Type': 'application/json'
    }
};


// Функция получения статуса запроса

const getRequestStatus = (res) => {
    if (res.ok) {
        return res.json();
    }
    else {
        return Promise.reject(`Ошибка: ${res.statusText}`);
    }
};


// Загрузка карточек с сервера

export const downloadCardsList = () => {
    return fetch(`${authorizationConfig.baseUrl}/cards`, {
        method: "GET",
        headers: authorizationConfig.headers
    })
    .then((res) => getRequestStatus(res));
};


// Загрузка информации о пользователе

export const getProfileInfo = () => {
    return fetch(`${authorizationConfig.baseUrl}/users/me`, {
        method: "GET",
        headers: authorizationConfig.headers
    })
    .then((res) => getRequestStatus(res));
};


// Редактирование профиля

export const changeProfileInfo = (profileName, aboutInfo) => {
    return fetch(`${authorizationConfig.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: authorizationConfig.headers,
        body: JSON.stringify({
            name: profileName,
            about: aboutInfo
        })
    })
    .then((res) => getRequestStatus(res));
};


// Обновление аватара

export const changeProfileImage = (newImage) => {
    return fetch(`${authorizationConfig.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: authorizationConfig.headers,
        body: JSON.stringify({
            avatar: newImage
        })
    })
    .then((res) => getRequestStatus(res))
};


// Добавление новой карточки

export const addNewCard = (nameInputValue, linkInputValue) => {
    return fetch(`${authorizationConfig.baseUrl}/cards`, {
        method: 'POST',
        headers: authorizationConfig.headers,
        body: JSON.stringify({
            name: nameInputValue,
            link: linkInputValue
        })
    })
    .then((res) => getRequestStatus(res));
};


// Удаление карточки

export const deleteCard = (cardId) => {
    return fetch(`${authorizationConfig.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: authorizationConfig.headers
    })
    .then((res) => getRequestStatus(res))
};


// Постановка и снятие лайка

export const setCardLike = (cardId) => {
    return fetch(`${authorizationConfig.baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: authorizationConfig.headers
    })
    .then((res) => getRequestStatus(res))
};

export const removeCardLike = (cardId) => {
    return fetch(`${authorizationConfig.baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: authorizationConfig.headers
    })
    .then((res) => getRequestStatus(res))
};
