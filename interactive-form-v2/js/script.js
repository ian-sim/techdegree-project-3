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
		otherTitle.style.display = "inherit";
	} else {
		otherTitle.style.display = "none";
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

// Hide 'Select Theme'

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
				colorSelect[i].style.display = "none";
			}
		}
		for (let j = 0; j < displayed.length; j++) {
			displayed[j].style.display = "inherit";
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
		displayTotal.style.display = "inherit";
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
