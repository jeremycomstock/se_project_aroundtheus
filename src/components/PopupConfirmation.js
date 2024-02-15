import Popup from "./Popup.js";

export default class PopupConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._submitButtonText = this._submitButton.textContent;
  }

  setConfirmAction(confirmHandler) {
    this._handleFormSubmit = confirmHandler;
  }

  renderLoading() {
    this._submitButton.textContent = "Saving...";
  }

  endLoading() {
    this._submitButton.textContent = this._submitButtonText;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }
}
