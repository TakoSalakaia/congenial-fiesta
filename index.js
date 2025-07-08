
const toggleTheme = document.getElementById("toggle-theme");

toggleTheme.addEventListener("click", () => {
	document.body.classList.toggle("dark");
	const isDark = document.body.classList.contains("dark");
	toggleTheme.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
	localStorage.setItem("theme", isDark ? "dark" : "light");
});


if (localStorage.getItem("theme") === "dark") {
	document.body.classList.add("dark");
	toggleTheme.textContent = "☀️ Light Mode";
}

const regForm = document.querySelector("#registration-form");
const age = regForm.querySelector("#age");
const phone = regForm.querySelector("#phone");
const personalNumber = regForm.querySelector("#personal-number");
const email = regForm.querySelector("#email");
const password = regForm.querySelector("#password");
const passwordCounter = document.querySelector("#password-counter");

const successModal = document.querySelector("#reg-modal");
const closeSuccessModal = successModal.querySelector(".close");
const successDialog = document.querySelector("#success-dialog");
const successDialogClose = successDialog.querySelector(".close");

closeSuccessModal.addEventListener("click", () => {
	successModal.classList.remove("open");
});

successDialogClose.addEventListener("click", () => {
	successDialog.close();
});

function setError(element, message) {
	const group = element.closest(".form-group");
	group.classList.remove("success");
	group.classList.add("error");
	group.querySelector(".message").textContent = message;
}

function setSuccess(element, message) {
	const group = element.closest(".form-group");
	group.classList.remove("error");
	group.classList.add("success");
	group.querySelector(".message").textContent = message;
}

function isAgeValid() {
	const value = parseInt(age.value.trim());
	if (isNaN(value)) {
		setError(age, "Age is required");
		return false;
	} else if (value < 1 || value > 100) {
		setError(age, "Age should be between 1 and 100");
		return false;
	} else {
		setSuccess(age, "Valid age");
		return true;
	}
}

function isPhoneValid() {
	const value = phone.value.trim();
	const regex = /^\d{9}$/;
	if (value.length === 0) {
		setError(phone, "Phone number is required");
		return false;
	} else if (!regex.test(value)) {
		setError(phone, "Phone number must be 9 digits");
		return false;
	} else {
		setSuccess(phone, "Phone is valid");
		return true;
	}
}

function isPersonalNumberValid() {
	const value = personalNumber.value.trim();
	const regex = /^\d{11}$/;
	if (value.length === 0) {
		setError(personalNumber, "Personal number is required");
		return false;
	} else if (!regex.test(value)) {
		setError(personalNumber, "Personal number must be 11 digits");
		return false;
	} else {
		setSuccess(personalNumber, "Valid personal number");
		return true;
	}
}

function isEmailValid() {
	const value = email.value.trim();
	if (value.length === 0) {
		setError(email, "Email is required");
		return false;
	} else if (!value.endsWith("@gmail.com")) {
		setError(email, "Email must end with @gmail.com");
		return false;
	} else {
		setSuccess(email, "Valid email");
		return true;
	}
}

function isPasswordValid() {
	const value = password.value.trim();
	if (value.length === 0) {
		setError(password, "Password is required");
		return false;
	} else if (value.length < 8) {
		setError(password, "Password must be at least 8 characters");
		return false;
	} else {
		setSuccess(password, "Valid password");
		return true;
	}
}

password.addEventListener("input", () => {
	passwordCounter.textContent = `${password.value.length} / 20`;
	isPasswordValid();
});

=
age.addEventListener("input", isAgeValid);
phone.addEventListener("input", isPhoneValid);
personalNumber.addEventListener("input", isPersonalNumberValid);
email.addEventListener("input", isEmailValid);
password.addEventListener("input", isPasswordValid);


regForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const validAge = isAgeValid();
	const validPhone = isPhoneValid();
	const validPersonalNumber = isPersonalNumberValid();
	const validEmail = isEmailValid();
	const validPassword = isPasswordValid();

	if (validAge && validPhone && validPersonalNumber && validEmail && validPassword) {
		successDialog.showModal();

		// Auto-close after 3 seconds
		setTimeout(() => {
			successDialog.close();
		}, 3000);

		// Reset form
		regForm.reset();
		passwordCounter.textContent = "0 / 20";
		document.querySelectorAll(".form-group").forEach(group => {
			group.classList.remove("success");
			group.querySelector(".message").textContent = "";
		});
	}
});
