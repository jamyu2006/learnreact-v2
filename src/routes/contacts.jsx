let contactsList = []; // Array to hold the contacts

export function getContacts() {
  return contactsList; // Return the current list of contacts
}

export function getContact(contactID) {
    console.log("get " + contactID);
    return contactsList[contactID]; // Return the current contact
  }

export function createContact() {
    const newContact = {
        first: "Your",
        last: "Name",
        avatar: "https://robohash.org/you.png?size=200x200",
        twitter: "your_handle",
        notes: "Some notes",
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
      contact[key] = updates[key]; // Update the contact property
    }
  });
}