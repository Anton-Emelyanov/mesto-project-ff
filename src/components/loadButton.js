export const loadButton = (loadingInProcess, submitButton) => {
    submitButton.textContent = loadingInProcess ? 'Сохранение...' : 'Сохранить';
};