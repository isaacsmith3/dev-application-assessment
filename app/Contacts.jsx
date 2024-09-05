"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { blankContact } from "../store/blankContact";
import { useContactStore } from "../store/contact";

import ContactEditor from "../components/ContactEditor";

export default function Contacts() {
  const { currentContact, contacts, setCurrentContact } = useContactStore();
  const [contactSearch, setContactSearch] = useState(contacts);
  const router = useRouter();

  useEffect(() => {
    let newContacts = contacts;
    setContactSearch(newContacts);
  }, [currentContact, contacts]);

  function handleContactChange(id) {
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].id === id) {
        const updatedCurrentContact = contacts[i];
        setCurrentContact(updatedCurrentContact);
      }
    }
  }

  function handleCreateContact() {
    const newContact = blankContact;
    setCurrentContact(newContact);
  }

  return (
    <>
      <div className="mx-auto mt-5 max-w-[1400px] pb-10">
        <div className="max grid grid-cols-[30%_70%] ">
          <section className="flex flex-col gap-8 p-10">
            <div className="flex items-center justify-between">
              <h1 className="text-h1 text-3xl font-semibold">Contacts</h1>
              <button
                onClick={handleCreateContact}
                className="text-h1 text-4xl text-green-500 p-2"
              >
                +
              </button>
            </div>
            <div className="h-[60vh] w-60 p-2">
              {contactSearch.map((contact) => {
                return (
                  <div>
                    <Button
                      key={contact.id}
                      className={`border-1 mb-6 h-12 w-[100%] flex-shrink-0 rounded text-center text-black  hover:bg-[#b5bac0] ${
                        currentContact.id === contact.id ? "bg-[#cbd1d8]" : "bg-input"
                      } bg-white`}
                      onClick={() => handleContactChange(contact.id)}
                    >
                      <div className="flex flex-row justify-start gap-4">
                        <h3 className="">{contact.name}</h3>
                      </div>
                    </Button>
                  </div>
                );
              })}
            </div>
          </section>
          {currentContact && (
            <div className="h-[80vh] p-2">
              <ContactEditor />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
