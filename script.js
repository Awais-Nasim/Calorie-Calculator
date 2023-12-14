document.addEventListener('DOMContentLoaded', function () {
  checkAuth();
});

function calculateCalories() {
  const gender = document.getElementById('gender').value;
  const age = parseInt(document.getElementById('age').value);
  const weight = parseFloat(document.getElementById('weight').value);
  const height = parseFloat(document.getElementById('height').value);
  const activityLevel = document.getElementById('activityLevel').value;


  

  if (isNaN(age) || isNaN(weight) || isNaN(height)) {
    alert('Please enter valid numeric values for age, weight, and height.');
    return;
  }

  let bmr;
  if (gender === 'male') {
    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }

  let tdee;
  switch (activityLevel) {
    case 'sedentary':
      tdee = bmr * 1.2;
      break;
    case 'lightlyActive':
      tdee = bmr * 1.375;
      break;
    case 'moderatelyActive':
      tdee = bmr * 1.55;
      break;
    case 'veryActive':
      tdee = bmr * 1.725;
      break;
    case 'extraActive':
      tdee = bmr * 1.9;
      break;
    default:
      break;
  }

  const resultElement = document.getElementById('result');
  resultElement.innerHTML = `<p>Your estimated Total Daily Energy Expenditure (TDEE) is: <strong>${Math.round(tdee)}</strong> calories per day.</p>`;

  
}

function register() {
  const email = document.getElementById('registerEmail').value;
  const password = btoa(document.getElementById('registerPassword').value); // Encode the password

  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

  if (existingUsers.some(user => user.email === email)) {
    alert('This email is already registered. Please use a different email.');
    return false; // Prevent form submission
  }

  existingUsers.push({ email, password });

  // Save the updated array back to localStorage
  localStorage.setItem('users', JSON.stringify(existingUsers));

  alert('Registration successful. You can now log in.');
  return false; // Prevent form submission
}


function submitLoginForm() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  if (!email || !password) {
    alert('Please enter both email and password.');
    return false; // Prevent form submission
  }

  // Assume there's a function to validate the login on the server-side
  authenticateUser(email, password);

  return false; // Prevent form submission
}

function authenticateUser(email, password) {
  // Retrieve the array of users from localStorage
  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

  // Encode the entered password to match the stored encoding
  const encodedPassword = btoa(password);

  // Check if the user exists and the encoded password is correct
  const user = existingUsers.find((user) => user.email === email && user.password === encodedPassword);

  if (user) {
    alert('Login successful.');
    // Redirect to the calorie calculator page or perform any other actions
    window.location.href = 'interface.html'; // Replace with your actual calorie calculator page
  } else {
    alert('Invalid email or password. Please try again.');
  }
}
function checkAuth() {
  const authSection = document.getElementById('authSection');
  const calculatorSection = document.getElementById('calculatorSection');
  const storedUser = localStorage.getItem('user');

  if (storedUser) {
    switchSection('authSection', 'calculatorSection');
  }
}

function switchSection(hideSection, showSection) {
  const hideElement = document.getElementById(hideSection);
  const showElement = document.getElementById(showSection);

  hideElement.classList.add('hidden');
  showElement.classList.remove('hidden');
}

function login() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  if (!email || !password) {
    alert('Please enter both email and password.');
    return false; // Prevent form submission
  }

  authenticateUser(email, password);

  return false; // Prevent form submission
}