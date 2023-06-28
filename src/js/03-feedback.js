import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const localStorageKey = 'feedback-form-state';

const savedState = JSON.parse(localStorage.getItem(localStorageKey));

if (savedState) {
  emailInput.value = savedState.email || '';
  messageInput.value = savedState.message || '';
}

const saveFormState = throttle(function() {
  const state = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(localStorageKey, JSON.stringify(state));
}, 500);

form.addEventListener('input', saveFormState);

form.addEventListener('submit', function(event) {
  event.preventDefault();

  console.log('Form values:', savedState);

  localStorage.removeItem(localStorageKey);
  emailInput.value = '';
  messageInput.value = '';
});