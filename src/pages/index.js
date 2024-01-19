import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";

// ! ||--------------------------------------------------------------------------------||
// ! ||                               Default Card Array                               ||
// ! ||--------------------------------------------------------------------------------||

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// ! ||--------------------------------------------------------------------------------||
// ! ||                               Declared Variables                               ||
// ! ||--------------------------------------------------------------------------------||

// Profile Elements

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".modal__close");
// Edit Modal Elements
const formElement = document.querySelectorAll(".modal__form");
const editPopup = document.querySelector(".modal_type_edit");
const profileForm = document.forms["profile-form"];
const modalInputName = editPopup.querySelector("#name");
const modalInputDescription = editPopup.querySelector("#description");
const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");
// Card Modal Elements
const cardPopup = document.querySelector(".modal_type_add");
const modalInputTitle = cardPopup.querySelector("#title");
const modalInputLink = cardPopup.querySelector("#link");
const cardForm = document.forms["card-form"];
const previewImageModal = document.querySelector(".modal_image");
const previewImage = document.querySelector(".modal__preview-image");
const previewName = document.querySelector(".modal__preview-name");
// Card List Elements

const cardList = document.querySelector(".gallery__cards");

const cardGallery = new Section(
  { initialCards, renderer: renderCard },
  cardList
);
cardGallery.renderItems();

const cardTemplate = cardList
  .querySelector("#gallery-template")
  .content.querySelector(".card");

// ! ||--------------------------------------------------------------------------------||
// ! ||                                 Card Functions                                 ||
// ! ||--------------------------------------------------------------------------------||

function handleImageClick(cardData) {
  console.log(cardData);
  imagePopup.open();
  openPopup(previewImageModal);
}

function renderCard(cardData, cardList) {
  const card = new Card(cardData, cardTemplate, handleImageClick);
  cardList.prepend(card.getView());
}

// ! ||--------------------------------------------------------------------------------||
// ! ||                                 Popup Functions                                ||
// ! ||--------------------------------------------------------------------------------||

editButton.addEventListener("click", () => {
  modalInputName.value = profileName.textContent;
  modalInputDescription.value = profileDescription.textContent;
  editPopupClass.open();
});

addButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  newCardPopup.open();
});

function handleSaveProfile() {
  profileName.textContent = modalInputName.value;
  profileDescription.textContent = modalInputDescription.value;
  userInfo.getUserInfo();
  userInfo.setUserInfo();
  editPopupClass.close();
}

function handleAddCard() {
  const name = modalInputTitle.value;
  const link = modalInputLink.value;
  cardGallery.renderItems();
  cardGallery.addItem();
  cardForm.reset();
  newCardPopup.close();
}

// ! ||--------------------------------------------------------------------------------||
// ! ||                                 Event Handlers                                 ||
// ! ||--------------------------------------------------------------------------------||

profileForm.addEventListener("submit", handleSaveProfile);
cardForm.addEventListener("submit", handleAddCard);

// ! ||--------------------------------------------------------------------------------||
// ! ||                                     Loops                                     ||
// ! ||--------------------------------------------------------------------------------||

// initialCards.forEach((cardData) => renderCard(cardData, cardList));

// ! ||--------------------------------------------------------------------------------||
// ! ||                                 Form Validation                                ||
// ! ||--------------------------------------------------------------------------------||

const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(validationSettings, profileForm);
const addFormValidator = new FormValidator(validationSettings, cardForm);

const editPopupClass = new PopupWithForm("#edit-popup", handleSaveProfile);
const newCardPopup = new PopupWithForm("#new-card-popup", handleAddCard);
// const imagePopup = new PopupWithImage("#preview-image-popup", data);
const userInfo = new UserInfo(profileName, profileDescription);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
