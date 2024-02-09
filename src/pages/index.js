// ! ||--------------------------------------------------------------------------------||
// ! ||                                    Imports                                     ||
// ! ||--------------------------------------------------------------------------------||

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupDelete from "../components/PopupDelete.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import Constants from "../utils/constants.js";
import Api from "../components/Api.js";

// ! ||--------------------------------------------------------------------------------||
// ! ||                                      API                                       ||
// ! ||--------------------------------------------------------------------------------||

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "7d9b26b0-78d0-422a-941a-09c95ea2b082",
    "Content-Type": "application/json",
  },
});

api.getUserInfo().then((userData) => {
  profileInfo.setUserInfo({
    name: userData.name,
    description: userData.about,
  });
});

api.getUserInfo().then((userData) => {
  avatar.setAttribute("src", userData.avatar);
});

function handleUpdateProfile(userData) {
  api.updateProfile(userData).then((userData) => {
    profileInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
    });
  });
}

function handleUpdateAvatar(userData) {
  api.updateAvatar(userData);
  api.getUserInfo().then((userdata) => {
    avatar.setAttribute("src", userData.avatar);
  });
}

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
// Avatar Modal Elements
const avatar = document.querySelector(".profile__avatar");
const avatarOverlay = document.querySelector(".profile__avatar-overlay");
const avatarPopup = document.querySelector(".modal_type_avatar");
const modalInputAvatar = avatarPopup.querySelector("#avatar-link");
const avatarForm = document.forms["avatar-form"];
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

// ! ||--------------------------------------------------------------------------------||
// ! ||                                 Event Listeners                                ||
// ! ||--------------------------------------------------------------------------------||

editButton.addEventListener("click", () => {
  const { name, description } = profileInfo.getUserInfo();
  modalInputName.value = name;
  modalInputDescription.value = description;
  editProfilePopup.open();
});

avatarOverlay.addEventListener("click", () => {
  console.log("Hello from avatar click");
  updateAvatarPopup.open();
});

// ! ||--------------------------------------------------------------------------------||
// ! ||                               Class Instantiation                              ||
// ! ||--------------------------------------------------------------------------------||

const constants = new Constants();

const editFormValidator = new FormValidator(
  constants.validationSettings,
  profileForm
);
const addFormValidator = new FormValidator(
  constants.validationSettings,
  cardForm
);

const avatarFormValidator = new FormValidator(
  constants.validationSettings,
  avatarForm
);

const profileInfo = new UserInfo({
  name: ".profile__name",
  description: ".profile__description",
});

const editProfilePopup = new PopupWithForm("#edit-popup", handleUpdateProfile);

const updateAvatarPopup = new PopupWithForm(
  "#avatar-popup",
  handleUpdateAvatar
);

const imagePopup = new PopupWithImage("#preview-image-popup");

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();

// ! ||--------------------------------------------------------------------------------||
// ! ||                                Gallery Creation                                ||
// ! ||--------------------------------------------------------------------------------||

api.getInitialCards().then((cards) => {
  const cardGallery = new Section(
    { items: cards, renderer: renderCard },
    ".gallery__cards"
  );

  function renderCard(cardData) {
    const card = new Card(
      {
        cardData,

        handleImageClick,
        handleDeleteButton,
        handleCardLike,
        handleCardUnlike,
      },
      cardTemplate
    );

    function handleDeleteButton() {
      console.log(document.querySelector(`.modal_type_delete`));
      deletePopup.open();
    }

    function handleCardLike(id) {
      api.likeCard(id);
    }

    function handleCardUnlike(id) {
      api.unlikeCard(id);
    }

    const handleDeleteSubmit = () => {
      let id = card.getId();
      api.removeCard(id);
      card.removeItem();
      // For some reason, when this function is called consecutively,
      // it saves the card's ID from each previous time it was called,
      // so it tries to delete those IDs as well.
    };

    const deletePopup = new PopupDelete("#delete-popup", handleDeleteSubmit);

    return card.getView();
  }

  function handleAddCard({ title: name, link: link }) {
    api.addCard({ name, link }).then((data) => {
      cardGallery.addItem(data);
    });
    newCardPopup.close();
  }

  const newCardPopup = new PopupWithForm("#new-card-popup", handleAddCard);

  addButton.addEventListener("click", () => {
    addFormValidator.toggleButtonState();
    newCardPopup.open();
  });

  cardGallery.renderItems();
});
