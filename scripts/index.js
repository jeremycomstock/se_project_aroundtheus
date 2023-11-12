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
const closeButtons = document.querySelectorAll(".modal__close");
// Edit Modal Elements
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

  function handleDeleteCard() {
    cardElement.remove();
  }

  deleteButton.addEventListener("click", handleDeleteCard);

  return cardElement;
}

// Popup Functions

function openPopup(popup) {
  popup.classList.add("modal_opened");
}

editButton.addEventListener("click", () => {
  modalInputName.value = profileName.textContent;
  modalInputDescription.value = profileDescription.textContent;
  openPopup(editPopup);
});

addButton.addEventListener("click", () => {
  openPopup(cardPopup);
});

function closePopup(popup) {
  popup.classList.remove("modal_opened");
}

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closePopup(popup));
});

function handleSaveProfile(e) {
  e.preventDefault();
  profileName.textContent = modalInputName.value;
  profileDescription.textContent = modalInputDescription.value;
  closeEditPopup();
}

function handleAddCard(e) {
  e.preventDefault();
  const name = modalInputTitle.value;
  const link = modalInputLink.value;
  renderCard({ name, link }, cardList);
  modalInputTitle.value = "";
  modalInputLink.value = "";
  closePopup(cardPopup);
}

// Event Handlers

profileForm.addEventListener("submit", handleSaveProfile);
cardForm.addEventListener("submit", handleAddCard);

// Loops

initialCards.forEach((cardData) => renderCard(cardData, cardList));
