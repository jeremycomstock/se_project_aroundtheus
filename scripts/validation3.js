function showInputError(formElement, inputEl, options) {
  const errorMessageEl = formElement.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(options.inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(options.errorClass);
}

function hideInputError(formElement, inputEl, options) {
  const errorMessageEl = formElement.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(options.inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(options.errorClass);
}

function disableButton(submitButton, options) {
  submitButton.classList.add(options.inactiveButtonClass);
  submitButton.disabled = true;
}

function enableButton(submitButton, options) {
  submitButton.classList.remove(options.inactiveButtonClass);
  submitButton.disabled = false;
}

function toggleButtonState(inputEls, submitButton, options) {
  let foundInvalid = false;
  inputEls.forEach((inputEl) => {
    if (!inputEl.validity.valid) {
      foundInvalid = true;
    }
  });

  if (foundInvalid) {
    disableButton(submitButton, options);
  } else {
    enableButton(submitButton, options);
  }
}

function checkInputValidity(formElement, inputEl, options) {
  if (!inputEl.validity.valid) {
    showInputError(formElement, inputEl, options);
  } else {
    hideInputError(formElement, inputEl, options);
  }
}

function setEventListeners(formElement, options) {
  const inputEls = [...formElement.querySelectorAll(options.inputSelector)];
  const submitButton = formElement.querySelector(".modal__button");
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formElement, inputEl, options);
      toggleButtonState(inputEls, submitButton, options);
    });
  });
}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formElement, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
