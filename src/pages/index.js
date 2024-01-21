// ! ||--------------------------------------------------------------------------------||
// ! ||                                    Imports                                     ||
// ! ||--------------------------------------------------------------------------------||

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import Constants from "../utils/constants.js";

// ! ||--------------------------------------------------------------------------------||
// ! ||                               Declared Variables                               ||
// ! ||--------------------------------------------------------------------------------||

// Profile Elements
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
// Edit Modal Elements
const editPopup = document.querySelector(".modal_type_edit");
const profileForm = document.forms["profile-form"];
const modalInputName = editPopup.querySelector("#name");
const modalInputDescription = editPopup.querySelector("#description");
// Card Modal Elements
const cardForm = document.forms["card-form"];
// Card List Elements
const cardList = document.querySelector(".gallery__cards");
const cardTemplate = cardList
  .querySelector("#gallery-template")
  .content.querySelector(".card");

// ! ||--------------------------------------------------------------------------------||
// ! ||                                 Card Functions                                 ||
// ! ||--------------------------------------------------------------------------------||

function handleImageClick(cardData) {
  imagePopup.open(cardData);
}

function renderCard(cardData) {
  const card = new Card(cardData, cardTemplate, handleImageClick);
  cardList.prepend(card.getView());
}

// ! ||--------------------------------------------------------------------------------||
// ! ||                                 Event Listeners                                ||
// ! ||--------------------------------------------------------------------------------||

editButton.addEventListener("click", () => {
  const { name, description } = profileInfo.getUserInfo();
  modalInputName.value = name;
  modalInputDescription.value = description;
  editProfilePopup.open();
});

addButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  newCardPopup.open();
});

// ! ||--------------------------------------------------------------------------------||
// ! ||                Popup Functions - To be passed to classes                       ||
// ! ||--------------------------------------------------------------------------------||

function handleSaveProfile(data) {
  profileInfo.setUserInfo(data);
}

function handleAddCard({ title: name, link: link }) {
  cardGallery.addItem({ name, link });
  newCardPopup.close();
}

// ! ||--------------------------------------------------------------------------------||
// ! ||                               Class Instantiation                              ||
// ! ||--------------------------------------------------------------------------------||

const constants = new Constants();
console.log(constants.initialCards);
const editFormValidator = new FormValidator(
  constants.validationSettings,
  profileForm
);
const addFormValidator = new FormValidator(
  constants.validationSettings,
  cardForm
);

const profileInfo = new UserInfo({
  name: ".profile__name",
  description: ".profile__description",
});

const editProfilePopup = new PopupWithForm("#edit-popup", handleSaveProfile);
const newCardPopup = new PopupWithForm("#new-card-popup", handleAddCard);
const imagePopup = new PopupWithImage("#preview-image-popup");

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// ! ||--------------------------------------------------------------------------------||
// ! ||                                Gallery Creation                                ||
// ! ||--------------------------------------------------------------------------------||

const cardGallery = new Section(
  { items: constants.initialCards, renderer: renderCard },
  cardList
);

cardGallery.renderItems();
