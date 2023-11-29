//Business Logic
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

//prototype method onto constructor obj assigns an "id"
AddressBook.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
}

//add contact
AddressBook.prototype.addContact = function (contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
}

//find contact
AddressBook.prototype.findContact = function (id) {
  if (this.contacts[id] !== undefined) {
    return this.contacts[id];
  }
  return false;
}

//delete contact
AddressBook.prototype.deleteContact = function (id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
}

//contact constructor function
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
}

//prototype method for getting full name
Contact.prototype.fullName = function () {
  return this.firstName + " " + this.lastName;
}

//UI LOGIC

//handle form submission and display contact details
document.addEventListener('DOMContentLoaded', function () {
  //create new instance of AddressBook
  const addressBook = new AddressBook();
  //get the form element by id
  const form = document.getElementById('new-contact');
  //add an event listener for submit
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    //get user input from the form
    const firstName = document.getElementById('new-first-name').value;
    const lastName = document.getElementById('new-last-name').value;
    const phoneNumber = document.getElementById('new-phone-number').value;
    //create a new contact instance
    const newContact = new Contact(firstName, lastName, phoneNumber);
    //add the new contact to the address book
    addressBook.addContact(newContact);
    //display the new contact details 
    displayContactDetails(newContact);
    //clear the form
    form.reset();
  });

  //function to display contact details in the HTML
  function displayContactDetails(contact) {
    //get the contact details by id
    const contactDetails = document.getElementById('contact-details');
    //get the span elements
    const firstNameSpan = contactDetails.querySelector('.first-name');
    const lastNameSpan = contactDetails.querySelector('.last-name');
    const phoneNumberSpan = contactDetails.querySelector('.phone-number');
    //added update and delete buttons
    const deleteButton = contactDetails.querySelector('.btn-delete');
    const updateButton = contactDetails.querySelector('.btn-update');
    //update the span elements with the contact details
    firstNameSpan.textContent = contact.firstName;
    lastNameSpan.textContent = contact.lastName;
    phoneNumberSpan.textContent = contact.phoneNumber;
    //remove hidden class from contact details
    contactDetails.classList.remove('hidden');

    //show/hide buttons if the contact exits/doesnt exist
    if (addressBook.findContact(contact.id)) {
      deleteButton.classList.remove('hidden');
      updateButton.classList.remove('hidden');
    } else {
      deleteButton.classList.add('hidden');
      updateButton.classList.add('hidden');
    }

    deleteButton.addEventListener('click', function () {
      addressBook.deleteContact(contact.id);
      contactDetails.classList.add('hidden');
      console.log(contact.id)
    });

    updateButton.addEventListener('click', function () {
      console.log(contact.id);
    });
  }
});