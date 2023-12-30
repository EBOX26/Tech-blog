// // Common function for both login and signup forms
// const formHandler = async (event, endpoint) => {
//   event.preventDefault();

//   const username = document.querySelector(`#username-${endpoint}`).value.trim();
//   const password = document.querySelector(`#password-${endpoint}`).value.trim();

//   if (username && password) {
//     try {
//       const response = await fetch(`/api/users/${endpoint}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });

//       if (response.ok) {
//         // If successful, redirect the browser to the dashboard
//         document.location.replace("/dashboard/");
//       } else {
//         throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
//       }
//     } catch (error) {
//       console.error(error);
//       alert(`An error occurred while ${endpoint === 'login' ? 'logging in' : 'signing up'}.`);
//     }
//   }
// };

// // Login form
// const loginFormHandler = (event) => formHandler(event, 'login');

// // Signup form
// const signupFormHandler = (event) => formHandler(event, 'signup');

// document.querySelector(".login-form").addEventListener("submit", loginFormHandler);

// document.querySelector(".signup-form").addEventListener("submit", signupFormHandler);









// login form
const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (username && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard
      document.location.replace("/dashboard/");
    } else {
      alert(response.statusText);
    }
  }
};

// Signup form
const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (username && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      // If successful, redirect the browser to the dashboard
      document.location.replace("/dashboard/");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);




