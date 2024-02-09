import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputs = this._popupForm.querySelectorAll(".modal__input");
    this._submitButton = this._popupElement.querySelector(".modal__button");
  }

  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach((input) => (inputValues[input.name] = input.value));
    return inputValues;
  }

  open() {
    this._submitButton.textContent = "Save";
    super.open();
  }

  close() {
    this._popupForm.removeEventListener("submit", this._handleSubmitButton);
    this._popupForm.reset();
    super.close();
  }

  _handleSubmitButton = (e) => {
    this._submitButton.textContent = "Saving...";
    e.preventDefault();
    this._handleFormSubmit(this._getInputValues());
    this.close();
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._handleSubmitButton);
  }
}
