import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
let formData = {};
const savedMessage = localStorage.getItem(STORAGE_KEY);

const form = document.querySelector('.feedback-form');
console.log(form);

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

checkedForm();

function onFormInput() {
  formData = {
    email: form.elements.email.value,
    message: form.elements.message.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  return formData;
}

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log(savedMessage);
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
}

function checkedForm() {
  if (savedMessage) {
    const parsedData = JSON.parse(savedMessage);
    form.elements.email.value = parsedData.email ?? '';
    form.elements.message.value = parsedData.message ?? '';
  }
}
