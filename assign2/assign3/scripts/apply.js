/*
filename: apply.js
author: Chirag Satwani
created: 24/09/2023
last modified: 24/09/2023
description: assign2
*/
"use strict";












function displayErrorMessage(message) {                               //function for displaying error message on website with parameter message
    const errorMessages = document.getElementById("error-messages");
    const errorMessage = document.createElement("p");
    errorMessage.textContent = message;
    errorMessages.appendChild(errorMessage);
  }
  
  function clearErrorMessages() {                                                   //function to clear previous error messages if any
    const errorMessages = document.getElementById("error-messages");
    errorMessages.innerHTML = "";
  }


  document.addEventListener("DOMContentLoaded", function () {
    // Retrieve job reference number from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const jobRefParam = urlParams.get("jobRef");
    const jobRefInput = document.getElementById("jobRef");
  
    // Set the job reference number input field if the parameter exists
    if (jobRefParam) {
      jobRefInput.value = jobRefParam;
    }
  });

    
function validateform() {                                           //function for different validations
    clearErrorMessages();
    
    const dobInput = document.getElementById("dob");
    const dobValue = dobInput.value;
    const dobPattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    
    const stateSelect = document.getElementById("state");
    const selectedState = stateSelect.value;
    const postcodeInput = document.getElementById("postcode");
    const postcodeValue = postcodeInput.value;
    const stateToFirstDigit = {
        VIC: ["3", "8"],
        NSW: ["1", "2"],
        QLD: ["4", "9"],
        NT: ["0"],
        WA: ["6"],
        SA: ["5"],
        TAS: ["7"],
        ACT: ["0"],
      };
      const otherSkillsCheckbox = document.getElementById("other");
      const otherSkillsTextArea = document.getElementById("other_skills");
      


    if (!dobPattern.test(dobValue)) {
      displayErrorMessage("Please enter a valid date of birth in dd/mm/yyyy format.");
      dobInput.focus();
      return false;
    }

    const [day, month, year] = dobValue.split('/').map(Number);
    const currentDate = new Date();
    const dobDate = new Date(year, month - 1, day);
    const age = currentDate.getFullYear() - dobDate.getFullYear();

    if (age < 15 || age > 80) {
      displayErrorMessage("Applicants must be between 15 and 80 years old.");
      dobInput.focus();
      return false;
    }

    if (!stateToFirstDigit[selectedState].includes(postcodeValue[0])) {
        displayErrorMessage("The selected state does not match the first digit of the postcode.");
        postcodeInput.focus();
        return false;
      }

      if (otherSkillsCheckbox.checked && otherSkillsTextArea.value.trim() === "") {
        displayErrorMessage("Please describe your other skills in the 'Other Skills' text area.");
        otherSkillsTextArea.focus();
        return false;
      }


    return true;
}

// Function to pre-fill the form with session storage data
function preFillForm() {
    const sessionData = sessionStorage.getItem("applicantData");
  
    if (sessionData) {
      const applicantData = JSON.parse(sessionData);
  
      // Pre-fill form fields with applicant data
      document.getElementById("first_name").value = applicantData.first_name || "";
      document.getElementById("last_name").value = applicantData.last_name || "";
      document.getElementById("dob").value = applicantData.dob || "";
  
      // Pre-select gender radio button
      const genderRadio = document.querySelector(`input[name="gender"][value="${applicantData.gender}"]`);
      if (genderRadio) {
        genderRadio.checked = true;
      }
  
      document.getElementById("address").value = applicantData.address || "";
      document.getElementById("suburb").value = applicantData.suburb || "";
      document.getElementById("state").value = applicantData.state || "";
      document.getElementById("postcode").value = applicantData.postcode || "";
      document.getElementById("mail").value = applicantData.mail || "";
      document.getElementById("phone_no").value = applicantData.phone_no || "";
  
      // Pre-check checkboxes
      document.getElementById("basic_programming").checked = applicantData.basic_programming || false;
      document.getElementById("java").checked = applicantData.java || false;
      document.getElementById("adv_java").checked = applicantData.adv_java || false;
      document.getElementById("python").checked = applicantData.python || false;
      document.getElementById("other").checked = applicantData.other || false;
  
      // Populate other skills textarea
      document.getElementById("other_skills").value = applicantData.other_skills || "";
    }
  }
  
  // Function to store applicant data in session storage
  function storeApplicantData() {
    const applicantData = {
      first_name: document.getElementById("first_name").value,
      last_name: document.getElementById("last_name").value,
      dob: document.getElementById("dob").value,
      gender: document.querySelector(`input[name="gender"]:checked`).value,
      address: document.getElementById("address").value,
      suburb: document.getElementById("suburb").value,
      state: document.getElementById("state").value,
      postcode: document.getElementById("postcode").value,
      mail: document.getElementById("mail").value,
      phone_no: document.getElementById("phone_no").value,
  
      basic_programming: document.getElementById("basic_programming").checked,
      java: document.getElementById("java").checked,
      adv_java: document.getElementById("adv_java").checked,
      python: document.getElementById("python").checked,
      other: document.getElementById("other").checked,
      other_skills: document.getElementById("other_skills").value,
    };
  
    sessionStorage.setItem("applicantData", JSON.stringify(applicantData));
  }
  
  // Function to clear form data from session storage
  function clearSessionData() {
    sessionStorage.removeItem("applicantData");
  }
  
  // Add event listeners
  document.addEventListener("DOMContentLoaded", preFillForm);
  