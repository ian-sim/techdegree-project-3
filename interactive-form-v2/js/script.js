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
