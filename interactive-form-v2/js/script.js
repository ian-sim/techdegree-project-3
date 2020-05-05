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

// Create function to check field for user input
function userInputCheck(inputField) {
	if (inputField.value === "") {
		return true;
	} else {
		return false;
	}
}

// Create function to validate email format
function checkEmailFormat(email) {
	return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

// Create function to check activities checked property
function checkActivities() {
	for (let i = 0; i < checkboxList.length; i++) {
		if (checkboxList[i].checked) {
			return true;
		}
	}
	return false;
}

// Cretae function to check payment method and required fields
function ccValidation() {
	if (paymentDropdown.value === "credit card") {
		if (userInputCheck(ccNumberInput)) {
			return true;
		} else if (ccNumberInput.value.length < 13 || ccNumberInput.length > 16) {
			return true;
		} else if (userInputCheck(zipInput)) {
			return true;
		} else if (zipInput.value.length !== 5) {
			return true;
		} else if (userInputCheck(cvvInput)) {
			return true;
		} else if (cvvInput.value.length !== 3) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

// Create variables needed for form validation
const confForm = document.querySelector("form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#mail");
const ccNumberInput = document.querySelector("#cc-num");
const zipInput = document.querySelector("#zip");
const cvvInput = document.querySelector("#cvv");
const activitiesTitle = document.querySelector(
	'legend[text-content="Register for Activities"'
);

// Create handler for form submission
confForm.addEventListener("submit", (e) => {
	if (userInputCheck(nameInput)) {
		e.preventDefault();
		inputError(nameInput);
	}
	if (!checkEmailFormat(emailInput)) {
		e.preventDefault();
		inputError(emailInput);
	}
	if (checkActivities()) {
		e.preventDefault();
		inputError(activitiesTitle);
	}
	if (ccValidation()) {
		e.preventDefault();
		inputError(creditCardInfo);
	}
});

// Create function for higlighting missing/incorrect input
function inputError(inputField) {
	inputField.style.backgroundColor = "#E65B5B";
}
