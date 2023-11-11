// Default Card Array

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

// Profile Elements

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
// Edit Modal Elements
const popup = document.querySelector(".modal");
const editPopup = document.querySelector(".modal_type_edit");
const modalFormEdit = document.querySelector(".modal__form_edit");
const saveButton = editButton.querySelector(".modal__button");
const editCloseButton = document.querySelector(".modal__close_type_edit");
const modalInputName = editPopup.querySelector("#name");
const modalInputDescription = editPopup.querySelector("#description");
const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");
// Card Modal Elements
const cardPopup = document.querySelector(".modal_type_add");
const modalInputTitle = cardPopup.querySelector("#title");
const modalInputLink = cardPopup.querySelector("#link");
const cardCloseButton = cardPopup.querySelector(".modal__close_type_add");
const modalFormAdd = document.querySelector(".modal__form_add");
const previewImageModal = document.querySelector(".modal__type_image");
const previewImage = document.querySelector(".modal__preview-image");
const previewName = document.querySelector(".modal__preview-name");
const previewCloseButton = previewImageModal.querySelector(
  ".modal__close_type_preview"
);
// Card List Elements
const cardList = document.querySelector(".gallery__cards");
const cardTemplate = cardList
  .querySelector("#gallery-template")
  .content.querySelector(".card");

// Card Functions

function renderCard(cardData, cardList) {
  const cardElement = createCard(cardData);
  cardList.prepend(cardElement);
}

function createCard(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardName = cardElement.querySelector(".card__name");
  cardImage.setAttribute("src", cardData.link);
  cardImage.setAttribute("alt", cardData.name);
  cardName.textContent = cardData.name;
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.addEventListener("click", () => {
    previewImageModal.classList.toggle("modal_opened");
    previewImage.setAttribute("src", cardData.link);
    previewImage.setAttribute("alt", cardData.name);
    previewName.textContent = cardData.name;
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  // Delete Function

  function handleDeleteCard(cardData) {
    cardElement.remove();
  }

  deleteButton.addEventListener("click", handleDeleteCard);

  return cardElement;
}

// Popup Functions

function openEditPopup() {
  editPopup.classList.add("modal_opened");
  modalInputName.value = profileName.textContent;
  modalInputDescription.value = profileDescription.textContent;
}

function openCardPopup() {
  cardPopup.classList.add("modal_opened");
}

function closeEditPopup() {
  editPopup.classList.remove("modal_opened");
}

function closeCardPopup() {
  cardPopup.classList.remove("modal_opened");
}

function closePreviewPopup() {
  previewImageModal.classList.remove("modal_opened");
}

// Page Functions

function handleSaveProfile(e) {
  e.preventDefault();
  profileName.textContent = modalInputName.value;
  profileDescription.textContent = modalInputDescription.value;
  closeEditPopup();
}

function handleAddCard(e, cardData) {
  e.preventDefault();
  const name = modalInputTitle.value;
  const link = modalInputLink.value;
  renderCard({ name, link }, cardList);
  closeCardPopup();
}

function handleLikeButton() {
  cardLikeButton.classList.add("card__like-button-active");
}

function handleUnlike() {
  cardLikeButton.classList.remove("card__like-button-active");
}

// Event Handlers

editButton.addEventListener("click", openEditPopup);
addButton.addEventListener("click", openCardPopup);
cardCloseButton.addEventListener("click", closeCardPopup);
editCloseButton.addEventListener("click", closeEditPopup);
previewCloseButton.addEventListener("click", closePreviewPopup);
modalFormEdit.addEventListener("submit", handleSaveProfile);
modalFormAdd.addEventListener("submit", handleAddCard);

// Loops

initialCards.forEach((cardData) => renderCard(cardData, cardList));
