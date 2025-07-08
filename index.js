const regForm = document.querySelector("#registration-form");
const age = regForm.querySelector("#age");
const phone = regForm.querySelector("#phone");
const personalNumber = regForm.querySelector("#personal-number");
const email = regForm.querySelector("#email");
const password = regForm.querySelector("#password");

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
	element.closest(".form-group").classList.remove("success");
	element.closest(".form-group").classList.add("error");
	element.closest(".form-group").querySelector(".message").textContent = message;
}

function setSuccess(element, message) {
	element.closest(".form-group").classList.remove("error");
	element.closest(".form-group").classList.add("success");
	element.closest(".form-group").querySelector(".message").textContent = message;
}

function isAgeValid() {
	if (age.validity.valueMissing) {
		setError(age, "Age is required");
		return false;
	} else if (!age.validity.valid) {
		setError(age, "Age should be between 1 and 20");
		return false;
	} else {
		setSuccess(age, "Valid age");
		return true;
	}
}

function isPhoneValid() {
	const phoneValue = phone.value.trim();
	const regex = /^\d{9}$/;

	if (phoneValue.length === 0) {
		setError(phone, "Phone number is required");
		return false;
	} else if (!regex.test(phoneValue)) {
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

regForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const validAge = isAgeValid();
	const validPhone = isPhoneValid();
	const validPersonalNumber = isPersonalNumberValid();
	const validEmail = isEmailValid();
	const validPassword = isPasswordValid();

	if (validAge && validPhone && validPersonalNumber && validEmail && validPassword) {
		successDialog.showModal();
	}
});

const passwordCounter = document.querySelector("#password-counter");

password.addEventListener("input", () => {
	passwordCounter.textContent = `${password.value.length} / 20`;
	isPasswordValid(); // 
});


age.addEventListener("input", isAgeValid);
phone.addEventListener("input", isPhoneValid);
personalNumber.addEventListener("input", isPersonalNumberValid);
email.addEventListener("input", isEmailValid);
password.addEventListener("input", isPasswordValid);
