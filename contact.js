//grouping all fields into an object
var fields = {}

//Linking all fields to the new object field
document.addEventListener("DOMContentLoaded", function () {
    fields.name = document.getElementById('name');
    fields.email = document.getElementById('email');
    fields.message = document.getElementById('message');
})

//checks that the field in not empty
function isNotEmpty(value) {
    if (value == null || typeof value == 'undefined') return false;
    return (value.length > 0);
}

//checks if string is an email
function isEmail(email) {
    let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(String(email).toLowerCase());
}

//checks field validation --- ????
function fieldValidation(field, validationFunction) {
    if (field == null) return false;

    let isFieldValid = validationFunction(field.value)
    if (!isFieldValid) {
        field.className = 'placeholderRed';
    } else {
        field.className = '';
    }

    return isFieldValid;
}

//checks if all the fields are correct --?
function isValid() {
    var valid = true;

    valid &= fieldValidation(fields.name, isNotEmpty);
    valid &= fieldValidation(fields.email, isEmail);
    valid &= fieldValidation(fields.message, isNotEmpty);
    valid &= arePasswordsEqual();

    return valid;
}

// user class constructor
class User {
    constructor(name, email, message) {
    this.name = name;
    this.email = email;
    this.message = message;
    }
   }

//sending form data
function sendContact() {

    if (isValid()) {
        let usr = new User(name.value, email.value, message.value);

        alert(`${usr.name} thanks for emailing me. I will be in contact soon.`)
    } else {
        alert("There was an error")
    }
}