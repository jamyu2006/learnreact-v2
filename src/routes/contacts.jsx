let contactsList = []; // Array to hold the contacts

export function getContacts() {
  return contactsList; // Return the current list of contacts
}

export function getContact(contactID) {
    //console.log("get " + contactID);
    return contactsList[contactID]; // Return the current contact
  }

export function createContact() {
    const newContact = {
        first: "",
        last: "",
        avatar: "",
        twitter: "",
        notes: "",
        favorite: true,
        id: contactsList.length, 
    };

    contactsList.push(newContact);
    return newContact;
} 

export function updateContact(contactID, updates){
    const id = parseInt(contactID, 10);

    //console.log(id);
    //console.log(contactID);

  // Validate that the contactID is a valid number and within the bounds of the contactsList
  if (isNaN(id) || id < 0 || id >= contactsList.length) {
    console.log(`Invalid contact ID: ${contactID}`);
    return null; // Optionally return null, or handle as needed
  }

    const contact = contactsList[contactID]; // Access the contact by ID

  // Check if the contact exists
  if (!contact) {
    throw new Error(`Contact with ID ${contactID} not found`);
  }

  // Iterate over the keys in the updates object
  Object.keys(updates).forEach((key) => {
    if (key in contact) { // Check if the key exists in the contact
        const newValue = updates[key];

        // Check if the new value is not empty (i.e., not null, undefined, or an empty string)
        if (newValue !== null && newValue !== undefined && newValue !== ''){
            contact[key] = updates[key]; // Update the contact property
        }
    }
  });
}