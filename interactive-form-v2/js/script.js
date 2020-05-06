// Set focus to first text field on load
window.addEventListener("DOMContentLoaded", () => {
	document.querySelector("#name").focus();
});

// Hide job role input field
const otherTitle = document.querySelector("#other-title");
otherTitle.style.display = "none";

// Create handler in case of 'other' selection for job role
const titleDropdown = document.querySelector("#title");
titleDropdown.addEventListener("change", () => {
	if (titleDropdown.value === "other") {
		showElement(otherTitle);
	} else {
		hideElement(otherTitle);
	}
});

// Create function to create, append and assign property values to an element
function createAssign(
	elementName,
	property1 = "",
	value1 = "",
	property2 = "",
	value2 = "",
	property3 = "",
	value3 = ""
) {
	const element = document.createElement(elementName);
	element[property1] = value1;
	element[property2] = value2;
	element[property3] = value3;
	return element;
}

// Create function to hide element
function hideElement(elementName) {
	elementName.style.display = "none";
}

// Create function to show element
function showElement(elementName) {
	elementName.style.display = "inherit";
}

// Create function to hide multiple elements
function hideMultiple(elementList) {
	for (let i = 0; i < elementList.length; i++) {
		hideElement(elementList[i]);
	}
}

// Create object to store design options key, value pairs
const designOptionsObject = {};
const designOptions = document.querySelectorAll("#design option[value]");
for (let i = 0; i < designOptions.length; i++) {
	designOptionsObject[designOptions[i].value] = designOptions[
		i
	].textContent.slice(8);
}

// Create and insert 'please select' message to color dropdown menu
const selectThemeMsg = createAssign(
	"option",
	"textContent",
	"Please select a T-shirt theme",
	"selected",
	true
);
const colorSelect = document.querySelector("#color");
const firstColorOption = colorSelect.firstElementChild;
colorSelect.insertBefore(selectThemeMsg, firstColorOption);

// Hide color options intially
hideMultiple(colorSelect);

// Create handler for change in design theme dropdown
let displayed = [];
const designDropdown = document.querySelector("#design");
designDropdown.addEventListener("change", () => {
	displayed = [];
	if (designDropdown.value === "Select Theme") {
		hideMultiple(colorSelect);
		selectThemeMsg.hidden = false;
		selectThemeMsg.selected = true;
	} else {
		selectThemeMsg.hidden = true;
		selectThemeMsg.selected = false;
		for (let i = 0; i < colorSelect.length; i++) {
			if (
				colorSelect[i].textContent.includes(
					designOptionsObject[designDropdown.value]
				)
			) {
				displayed.push(colorSelect[i]);
			} else {
				hideElement(colorSelect[i]);
			}
		}
		for (let j = 0; j < displayed.length; j++) {
			showElement(displayed[j]);
		}
		colorSelect.value = displayed[0].value;
	}
});

// ACTIVITIES CHECKBOX SECTION

// Create activitiesTotal variable and element to display total
let activitiesTotal = 0;
const displayTotal = createAssign(
	"label",
	"textContent",
	`Total:	$${activitiesTotal}`
);
hideElement(displayTotal);
const activitiesSection = document.querySelector(".activities");
activitiesSection.appendChild(displayTotal);

// Create function to calculate total cost of activities
function calcTotal(list) {
	activitiesTotal = 0;
	for (let i = 0; i < list.length; i++) {
		if (list[i].checked) {
			activitiesTotal += parseInt(list[i].dataset.cost);
		}
	}
	if (activitiesTotal > 0) {
		showElement(displayTotal);
		displayTotal.textContent = `Total:	$${activitiesTotal}`;
	} else {
		hideElement(displayTotal);
	}
}

// Create function to toggle disabled attribute
function toggleDisabled(target) {
	target.disabled ? (target.disabled = false) : (target.disabled = true);
}

// Create function to check for conflicts
function conflictCheck(target, comparisonList) {
	for (let i = 0; i < comparisonList.length; i++) {
		if (target !== comparisonList[i]) {
			if (target.dataset.dayAndTime === comparisonList[i].dataset.dayAndTime) {
				toggleDisabled(comparisonList[i]);
			}
		}
	}
}

// Create event listener for activities section
const checkboxList = document.querySelectorAll(".activities > label > input");
activitiesSection.addEventListener("change", (e) => {
	const input = e.target;
	calcTotal(checkboxList);
	conflictCheck(input, checkboxList);
});

// PAYMENT INFO SECTION
const creditCardInfo = document.querySelector("#credit-card");
const paypalInfo = document.querySelector("#paypal");
const bitcoinInfo = document.querySelector("#bitcoin");
hideElement(paypalInfo);
hideElement(bitcoinInfo);
// Hide 'Select payment method' option
const selectPaymentMethod = document.querySelector(
	'option[value="select method"]'
);
hideElement(selectPaymentMethod);

// Set credit card as default payment option
const creditCardOption = document.querySelector('option[value="credit card"');
creditCardOption.selected = true;
const paymentDropdown = document.querySelector("#payment");

// Create handler to display payment options based on selection
paymentDropdown.addEventListener("change", () => {
	if (paymentDropdown.value === "credit card") {
		showElement(creditCardInfo);
		hideElement(paypalInfo);
		hideElement(bitcoinInfo);
	} else if (paymentDropdown.value === "paypal") {
		showElement(paypalInfo);
		hideElement(creditCardInfo);
		hideElement(bitcoinInfo);
	} else if (paymentDropdown.value === "bitcoin") {
		showElement(bitcoinInfo);
		hideElement(creditCardInfo);
		hideElement(paypalInfo);
	}
});

// FORM VALIDATION SECTION

// Function for creating and inserting validation messages
function errorMessage(message) {
	const errorLabel = createAssign(
		"p",
		"className",
		"error",
		"innerHTML",
		`<span>&#9888;</span> ${message}`
	);
	return errorLabel;
}

// Function to create and append cc error message
function ccErrorAppend(message) {
	const errorLabel = errorMessage(message);
	creditCardInfo.appendChild(errorLabel);
}

// Create function to check field for user input
function userInputCheck(inputField) {
	if (inputField.value === "" || inputField.value === null) {
		return true;
	} else {
		return false;
	}
}

// Function to check name input
function nameCheck(input) {
	if (userInputCheck(input)) {
		const errorLabel = errorMessage("Please enter your name");
		const parent = input.parentNode;
		const sibling = input.nextElementSibling;
		parent.insertBefore(errorLabel, sibling);
		return false;
	} else {
		return true;
	}
}

// Function to check email input
function emailCheck(input) {
	if (!/^[^@]+@[^@.]+\.[a-z]+$/i.test(input.value)) {
		const errorLabel = errorMessage("Please enter a valid email address");
		const parent = input.parentNode;
		const sibling = input.nextElementSibling;
		parent.insertBefore(errorLabel, sibling);
		return false;
	} else {
		return true;
	}
}

// Create function to check activities checked property
function checkActivities() {
	for (let i = 0; i < checkboxList.length; i++) {
		if (checkboxList[i].checked) {
			return true;
		}
	}
	const errorLabel = errorMessage("Please select at least 1 activity");
	activitiesSection.appendChild(errorLabel);
	return false;
}

// Create function to check payment method and required fields
function ccValidation() {
	if (userInputCheck(ccNumberInput)) {
		ccErrorAppend("Please enter a credit card number.");
		return false;
	} else if (ccNumberInput.value.length < 13 || ccNumberInput.length > 16) {
		ccErrorAppend(
			"Please enter a number that is between 13 and 16 digits long"
		);
		return false;
	} else if (userInputCheck(zipInput)) {
		ccErrorAppend("Please enter a zip code");
		return false;
	} else if (zipInput.value.length !== 5) {
		ccErrorAppend("Please enter a 5 digit zip code");
		return false;
	} else if (userInputCheck(cvvInput)) {
		ccErrorAppend("Please enter a CVV number");
		return false;
	} else if (cvvInput.value.length !== 3) {
		ccErrorAppend("Please enter a 3 digit CVV number");
		return false;
	} else {
		return true;
	}
}

// Create variables needed for form validation
const confForm = document.querySelector("form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#mail");
const ccNumberInput = document.querySelector("#cc-num");
const zipInput = document.querySelector("#zip");
const cvvInput = document.querySelector("#cvv");

// Function to run all individual field validations
function validateAll() {
	const validationResults = [];
	validationResults.push(nameCheck(nameInput));
	validationResults.push(emailCheck(emailInput));
	validationResults.push(checkActivities());
	if (paymentDropdown.value === "credit card") {
		validationResults.push(ccValidation());
	}
	for (let i = 0; i < validationResults.length; i++) {
		if (validationResults[i] === false) {
			return false;
		}
	}
	return true;
}

// Create handler for form submission
confForm.addEventListener("submit", (e) => {
	// Remove previous error messages
	const prevError = document.querySelectorAll(".error");
	if (prevError.length > 0) {
		for (let i = 0; i < prevError.length; i++) {
			const parent = prevError[i].parentNode;
			parent.removeChild(prevError[i]);
		}
	}
	// Validate user inputs
	if (!validateAll()) {
		e.preventDefault();
	}
});
