"use strict";

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var feedbackOpenButton = document.querySelector(".contacts__submit-button");
var popup = document.querySelector(".popup");
var animatedBlock = popup.querySelector(".feedback__container");
var cross = popup.querySelector(".feedback__close-button");
var feedbackForm = popup.querySelector(".feedback__form");
var nameInput = popup.querySelector(".feedback__input--name");
var emailInput = popup.querySelector(".feedback__input--email");
var storage = "";
var isStorageSupport = true;


// установка фокуса по умолчанию в наиболее подходящее поле
var getFocus = function() {
  if (storage) {
    nameInput.value = storage;
    emailInput.focus();
  } else {
    nameInput.focus();
  }
}
// проверка поддержки localStorage
var checkStorageSupport = function() {
  try {
    storage = localStorage.getItem("name");
  } catch (err) {
    isStorageSupport = false;
  }
}
// открытие модального окна
var showPopup = function() {
  popup.classList.remove("popup--closed");
  popup.classList.add("popup--showed");
  checkStorageSupport();
  getFocus();
};
// закрытие модального окна
var closePopup = function() {
  popup.classList.remove("popup--showed");
  popup.classList.add("popup--closed");
};
// тряска блока
var shakeTheElement = function() {
  animatedBlock.classList.add("feedback__container--error");
};

// валидация заполнения полей и запись в localStorage
var checkValues = function() {
  if (!nameInput.value || !emailInput.value) {
    event.preventDefault();
    shakeTheElement();
    feedbackForm.removeEventListener("submit", onSubmit);
    console.log("Заполните поле");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("name", nameInput.value);
    }
    feedbackForm.submit();
    closePopup();
    console.log("Сообщение отправлено");
  };
};

// Хендлеры
var onClickOpener = function(evt) {
  evt.preventDefault();
  showPopup();
};

var onClickCloser = function(evt) {
  evt.preventDefault();
  closePopup();
}

var onEscCloser = function(evt) {
  if (event.keyCode === ESC_KEYCODE) {
    evt.preventDefault();
    window.removeEventListener("keydown", onEscCloser);
    closePopup();
  }
}

var onSubmit = function() {
  checkValues();
}

// Обработчики событий

// обрабатываем событие отправки формы
feedbackForm.addEventListener("submit", onSubmit);
// обрабатываем открытие диалогового окна по клику
feedbackOpenButton.addEventListener("click", onClickOpener);
// обрабатываем открытие диалогового окна по Enter
feedbackOpenButton.addEventListener("keydown", onClickOpener);
// обрабатываем закрытие диалогового окна по клику на cross
cross.addEventListener("click", onClickCloser);
// обрабатываем закрытие диалогового окна по Esc
document.addEventListener("keydown", onEscCloser);
