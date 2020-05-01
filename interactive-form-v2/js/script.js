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

// Create 'please select' option for color dropdown
const colorDropdown = document.querySelector("#color");
const selectThemeMessage = document.createElement("option");
selectThemeMessage.selected = true;
selectThemeMessage.textContent = "Please select a theme";
const firstColorOption = colorDropdown.firstElementChild;
colorDropdown.insertBefore(selectThemeMessage, firstColorOption);

// Hide color dropdown options initially
hideMultiple(colorDropdown);

// Create listener for design drop down selection
const designDropdown = document.querySelector("#design");
designDropdown.addEventListener("change", () => {
	hideMultiple(colorDropdown);
	if (designDropdown.value === "js puns") {
		selectThemeMessage.hidden = true;
		for (let i = 0; i < colorDropdown.length; i++) {
			if (i < 4) {
				colorDropdown[i].style.display = "inherit";
			}
		}
	} else if (designDropdown.value === "heart js") {
		selectThemeMessage.hidden = true;
		for (let i = 0; i < colorDropdown.length; i++) {
			if (i >= 4) {
				colorDropdown[i].style.display = "inherit";
			}
		}
	} else {
		selectThemeMessage.hidden = false;
	}
});
