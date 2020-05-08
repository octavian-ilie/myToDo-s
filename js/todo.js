/* ------------------------------------------------------------
Storage
------------------------------------------------------------ */

let toDoElements = [];

/* ------------------------------------------------------------
Elements 
------------------------------------------------------------ */

const listOfElements = document.querySelector('.todo-list');
const todoForm = document.querySelector('form');
const eraseButton = document.querySelector('#proceed');
const cancelButton = document.querySelector('#cancel');
const errorMessage = document.querySelector('.error');
const completeErase = document.querySelector('#completeErase');

/* ------------------------------------------------------------
Functions 
------------------------------------------------------------ */

function createElement(title, content) {
  const item = {
    id: Date.now(),
    title,
    content,
    done: false,
  };
  toDoElements.push(item);

  listOfElements.insertAdjacentHTML('beforeend', `
    <li class="todo-element" data-key="${item.id}">
      <input id="${item.id}" class="check" type="checkbox"/>
      <label for="${item.id}" class="checked"></label>
      <h3>${item.title}</h3>
      <div class="todo-content">
        <span>${item.content}</span>
      </div>
      <button class="delete hidden">
        Remove
      </button>
    </li>
  `);
}

function markAsDone(key) {
  const location = toDoElements.findIndex((item) => item.id === Number(key));
  toDoElements[location].done = !toDoElements[location].done;

  const element = document.querySelector(`[data-key='${key}']`);
  const submitButton = document.querySelector(`[data-key='${key}'] button`);

  if (toDoElements[location].done) {
    element.classList.add('done');
    submitButton.classList.remove('hidden');
  } else {
    element.classList.remove('done');
    submitButton.classList.add('hidden');
  }
}

function deleteElement(key) {
  toDoElements = toDoElements.filter((element) => element.id !== Number(key));
  const element = document.querySelector(`[data-key='${key}']`);
  element.remove();
}

todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  errorMessage.classList.add('hidden');

  const titleField = document.querySelector('.title-field');
  const contentField = document.querySelector('.content-field');
  const title = titleField.value;
  const content = contentField.value;

  if (titleField.value !== '' && contentField.value !== '') {
    createElement(title, content);
    titleField.value = '';
    contentField.value = '';
    titleField.focus();
  } else {
    errorMessage.classList.remove('hidden');
  }
});

function eraseMeConfirm() {
  completeErase.style.display = "block";
}

function eraseMe() {
  if (toDoElements.length !== 0) {
    toDoElements.forEach((element) => {
      const elements = document.querySelector(`[data-key='${element.id}']`);
      if (elements) {
        elements.remove();
      }
    });
  }
  toDoElements = [];
  completeErase.style.display = "none";
}

/* ------------------------------------------------------------
Event listeners
------------------------------------------------------------ */

listOfElements.addEventListener('click', (event) => {
  const elementClass = event.target.classList;

  if (elementClass.contains('check')) {
    const { key } = event.target.parentElement.dataset;
    markAsDone(key);
  }

  if (elementClass.contains('delete')) {
    const { key } = event.target.parentElement.dataset;
    deleteElement(key);
  }
});

eraseButton.addEventListener('click', () => {
  eraseMe();
});

cancelButton.addEventListener('click', () => {
  completeErase.style.display = "none";
});
