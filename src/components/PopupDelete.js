import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
  constructor(popupSelector, handleDeleteConfirm) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleDeleteConfirm = handleDeleteConfirm;
    this._submitButton = this._popupElement.querySelector(".modal__button");
  }

  open() {
    this._submitButton.textContent = "Save";
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleDeleteConfirm();
      super.close();
    });
  }
}
