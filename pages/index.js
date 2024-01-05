import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

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

const cardTemplate = cardList
  .querySelector("#gallery-template")
  .content.querySelector(".card");

// ! ||--------------------------------------------------------------------------------||
// ! ||                                 Card Functions                                 ||
// ! ||--------------------------------------------------------------------------------||

function handleImageClick(card) {
  openPopup(previewImageModal);
  previewImage.setAttribute("src", card.link);
  previewImage.setAttribute("alt", card.name);
  previewName.textContent = card.name;
}

function renderCard(cardData, cardList) {
  const card = new Card(cardData, cardTemplate, handleImageClick);
  cardList.prepend(card.getView());
}

// ! ||--------------------------------------------------------------------------------||
// ! ||                                 Popup Functions                                ||
// ! ||--------------------------------------------------------------------------------||

function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByEscape);
  popup.addEventListener("click", closeModalByOverlayClick);
}

editButton.addEventListener("click", () => {
  modalInputName.value = profileName.textContent;
  modalInputDescription.value = profileDescription.textContent;
  openPopup(editPopup);
});

addButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  openPopup(cardPopup);
});

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByEscape);
  popup.removeEventListener("click", closeModalByOverlayClick);
}

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closePopup(popup));
});

function closeModalByEscape(e) {
  if (e.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closePopup(openedModal);
  }
}

function closeModalByOverlayClick(e) {
  const openedModal = document.querySelector(".modal_opened");
  if (e.target == openedModal) {
    closePopup(openedModal);
  }
}

function handleSaveProfile(e) {
  e.preventDefault();
  profileName.textContent = modalInputName.value;
  profileDescription.textContent = modalInputDescription.value;
  closePopup(editPopup);
}

function handleAddCard(e) {
  e.preventDefault();
  const name = modalInputTitle.value;
  const link = modalInputLink.value;
  renderCard({ name, link }, cardList);
  cardForm.reset();
  closePopup(cardPopup);
}

// ! ||--------------------------------------------------------------------------------||
// ! ||                                 Event Handlers                                 ||
// ! ||--------------------------------------------------------------------------------||

profileForm.addEventListener("submit", handleSaveProfile);
cardForm.addEventListener("submit", handleAddCard);

// ! ||--------------------------------------------------------------------------------||
// ! ||                                     Loops                                     ||
// ! ||--------------------------------------------------------------------------------||

initialCards.forEach((cardData) => renderCard(cardData, cardList));

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

editFormValidator.enableValidation();
addFormValidator.enableValidation();
