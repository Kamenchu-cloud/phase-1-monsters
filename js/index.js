const URL_PREFIX = 'http://localhost:3000/';

// Initial page
let page = 1;

// Function to get monsters from the API
const getMonsters = (pageNumber) => {
  fetch(`${URL_PREFIX}monsters/?_limit=50&_page=${pageNumber}`)
    .then(response => response.json())
    .then(monsters => {
      document.querySelector('#monster-container').innerHTML = '';
      monsters.forEach(monster => createMonsterCard(monster));
    });
};

// Function to create a monster card to the DOM
const createMonsterCard = (monster) => {
  const monsterContainer = document.querySelector('#monster-container');
  const monsterCard = document.createElement('div');
  monsterCard.innerHTML = `
    <h2>${monster.name}</h2>
    <h4>Age: ${monster.age}</h4>
    <p>Bio: ${monster.description}</p>
  `;
  monsterContainer.appendChild(monsterCard);
};

// Function to create the monster creation form
const createMonsterForm = () => {
  const form = document.createElement('form');
  form.id = 'monster-form';

  const nameInput = createInputElement('name', 'name...', 'text');
  const ageInput = createInputElement('age', 'age...', 'number');
  const descriptionInput = createInputElement('description', 'description...', 'text');

  const submitButton = document.createElement('button');
  submitButton.innerHTML = 'Create';

  form.appendChild(nameInput);
  form.appendChild(ageInput);
  form.appendChild(descriptionInput);
  form.appendChild(submitButton);

  document.getElementById('create-monster').appendChild(form);

  addSubmitEventListener();
};

// Helper function to create form input element
const createInputElement = (id, placeholder, type) => {
  const input = document.createElement('input');
  input.id = id;
  input.placeholder = placeholder;
  input.type = type;
  return input;
};

// Function to add submit event listener to the form
const addSubmitEventListener = () => {
  document.querySelector('#monster-form').addEventListener('submit', event => {
    event.preventDefault();
    const formData = getFormData();
    postNewMonster(formData);
    clearForm();
  });
};

// Function to get form data
const getFormData = () => {
  const nameInput = document.querySelector('#name');
  const ageInput = document.querySelector('#age');
  const descriptionInput = document.querySelector('#description');
  return {
    name: nameInput.value,
    age: parseFloat(ageInput.value),
    description: descriptionInput.value
  };
};

// Function to send a POST request to create a new monster
const postNewMonster = (monsterData) => {
  const url = `${URL_PREFIX}monsters`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(monsterData)
  };

  fetch(url, options)
    .then(response => response.json())
    .then(newMonster => console.log('new monster', newMonster));
};

// Function to clear the form after submission
const clearForm = () => {
  document.querySelector('#monster-form').reset();
};

// Function to add navigation button event listeners
const addNavListeners = () => {
  const backButton = document.querySelector('#back');
  const forwardButton = document.querySelector('#forward');

  backButton.addEventListener('click', () => {
    pageDown();
  });

  forwardButton.addEventListener('click', () => {
    pageUp();
  });
};

// Function to load the next page of monsters
const pageUp = () => {
  page++;
  getMonsters(page);
};

// Function to load the previous page of monsters
const pageDown = () => {
  if (page > 1) {
    page--;
    getMonsters(page);
  } else {
    alert('No more monsters to display');
  }
};

// Initialization function
const init = () => {
  getMonsters(page);
  createMonsterForm();
  addNavListeners();
};

// Run initialization when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);
