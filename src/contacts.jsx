let contactsList = {}; // Array to hold the contacts
let nextindex = 0;

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
        id: nextindex, 
    };
    
    contactsList[nextindex] = newContact;
    nextindex = nextindex + 1;

    return newContact;
} 

export function updateContact(contactID, updates) {
  const contact = contactsList[contactID]; // Access the contact by ID

  // Check if the contact exists
  if (!contact) {
      throw new Error(`Contact with ID ${contactID} not found`);
  }

  // Iterate over the keys in the updates object
  Object.keys(updates).forEach((key) => {
      if (key in contact) {
          const newValue = updates[key];

          if (newValue !== null && newValue !== undefined && newValue !== '') {
              contact[key] = newValue; // Update the contact property
          } else {
              console.log(`Field '${key}' is empty and will not be updated.`);
          }
      }
  });
}

export function deleteContact(contactID){
  delete contactsList[contactID];
}