export default class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._formElement = formElement;

    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );

    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
  }

  _showInputError(formElement, inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    console.log(inputElement);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    this.errorMessage = this._inputSelector.errorMessage;
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }

  _hasValidInput() {
    return !this._inputList.every((inputEl) => inputEl.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasValidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _checkFormValidity(foundInvalid) {
    this._inputList.forEach((inputEl) => {
      if (!inputEl.validity.valid) {
        foundInvalid = true;
      }
      return foundInvalid;
    });
  }

  _disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  checkInputValidity(formElement, inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(formElement, inputEl);
    } else {
      this._hideInputError(formElement, inputEl);
    }
  }

  _setEventListeners() {
    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this.checkInputValidity(this._formElement, inputEl);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }
}
