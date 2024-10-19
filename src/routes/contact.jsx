import { Form, useLoaderData, useFetcher } from "react-router-dom";
import { getContact, updateContact } from "../contacts";
import { useState } from 'react';

export async function loader({ params }) {
  //console.log(params); //array with contactID = 0
  //console.log(params.contactID); //undefined
  const contact = await getContact(params.contactID);
  console.log(contact);
  //if(!contact){
    //throw new Response("",{
      //status: 404,
      //statusText: "Not Found",});
  //}
  return { contact };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}

export default function Contact() {
  const { contact } = useLoaderData();

  const [showModal, setShowModal] = useState(false);

  return (
    <div id="contact">
      <div>
        <img
          key={contact.avatar}
          src={
            contact.avatar ||
            `https://robohash.org/${contact.id}.png?size=200x200`
          }
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${contact.twitter}`}
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <button onClick={() => {
              setShowModal(true);
            }}>Delete</button>

          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <p>Are you sure you want to delete this contact?</p>
                <Form
                  id="delete-form"
                  method="post"
                  action="destroy"
                  onSubmit={() => {setShowModal(false);}}
                >
                  <button type="submit">Yes</button>
                </Form>
                <button onClick={() => {
                  setShowModal(false);
                }}>No</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }) {
  const fetcher = useFetcher();
  const favorite = fetcher.formData
    ? fetcher.formData.get("favorite") === "true"
    : contact.favorite;
  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}