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