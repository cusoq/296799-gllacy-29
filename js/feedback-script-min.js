"use strict";var ESC_KEYCODE=27,ENTER_KEYCODE=13,feedbackOpenButton=document.querySelector(".contacts__submit-button"),popup=document.querySelector(".popup"),animatedBlock=popup.querySelector(".feedback__container"),cross=popup.querySelector(".feedback__close-button"),feedbackForm=popup.querySelector(".feedback__form"),nameInput=popup.querySelector(".feedback__input--name"),emailInput=popup.querySelector(".feedback__input--email"),storage="",isStorageSupport=!0,getFocus=function(){storage?(nameInput.value=storage,emailInput.focus()):nameInput.focus()},checkStorageSupport=function(){try{storage=localStorage.getItem("name")}catch(e){isStorageSupport=!1}},showPopup=function(){popup.classList.remove("popup--closed"),popup.classList.add("popup--showed"),checkStorageSupport(),getFocus()},closePopup=function(){popup.classList.remove("popup--showed"),popup.classList.add("popup--closed")},shakeTheElement=function(){animatedBlock.classList.add("feedback__container--error")},checkValues=function(){nameInput.value&&emailInput.value?(isStorageSupport&&localStorage.setItem("name",nameInput.value),feedbackForm.submit(),closePopup(),console.log("Сообщение отправлено")):(shakeTheElement(),console.log("Заполните поле"))},onClickOpener=function(e){e.preventDefault(),showPopup()},onClickCloser=function(e){e.preventDefault(),closePopup()},onEscCloser=function(e){event.keyCode===ESC_KEYCODE&&(e.preventDefault(),window.removeEventListener("keydown",onEscCloser),closePopup())},onSubmit=function(e){e.preventDefault(),checkValues()};feedbackForm.addEventListener("submit",onSubmit),feedbackOpenButton.addEventListener("click",onClickOpener),feedbackOpenButton.addEventListener("keydown",onClickOpener),cross.addEventListener("click",onClickCloser),document.addEventListener("keydown",onEscCloser)