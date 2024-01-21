import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._previewImage = document.querySelector(".modal__preview-image");
    this._previewName = document.querySelector(".modal__preview-name");
  }

  open({ name, link }) {
    this._previewImage.src = link;
    this._previewImage.alt = name;
    this._previewName.textContent = name;
    super.open();
  }
}
