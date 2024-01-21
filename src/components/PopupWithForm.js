import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  open() {
    super.open();
  }

  _getInputValues() {
    const inputs = this._popupForm.querySelectorAll(".modal__input");
    const inputValues = {};
    inputs.forEach((input) => (inputValues[input.name] = input.value));
    return inputValues;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener(
      "submit",
      (e) => {
        e.preventDefault();
        this._handleFormSubmit(this._getInputValues());
        this.close();
      },
      { once: true }
    );
  }
}
