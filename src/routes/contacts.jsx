let contactsList = []; // Array to hold the contacts

export function getContacts() {
  return contactsList; // Return the current list of contacts
}

export function createContacts() {
  contactsList.push({
    first: "Your",
    last: "Name",
    avatar: "https://robohash.org/you.png?size=200x200",
    twitter: "your_handle",
    notes: "Some notes",
    favorite: true,
    id: contactsList.length, 
  });
} 