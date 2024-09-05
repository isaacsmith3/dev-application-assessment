import { blankContact } from "./blankContact";
import { create } from "zustand";

const API_URL = "http://localhost:3001";

import contactsData from "../server/data.json";

export const useContactStore = create()((set, get) => ({
  currentContact: blankContact,
  setCurrentContact(contact) {
    set({ currentContact: contact });
  },
  contacts: contactsData,
  getContacts() {
    return this.contacts;
  },
  setContacts(contacts) {
    set({ contacts: contacts });
  },
  async createContact(contact) {
    const response = await fetch(`${API_URL}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });

    const newContact = await response.json();

    set({ currentContact: newContact });
    let currentContacts = get().contacts;
    currentContacts.push(newContact);
    set({ contacts: currentContacts });
  },
  async updateContact(contact) {
    const response = await fetch(`${API_URL}/contacts/${contact.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });
    const returnedContact = await response.json();

    const updatedContact = {
      ...returnedContact,
      id: returnedContact.id ?? returnedContact._id,
    };

    set({ currentContact: updatedContact });
    const currentContacts = get().contacts;
    const updatedContacts = currentContacts.map((p) =>
      p.id === updatedContact.id ? updatedContact : p
    );
    return set({ contacts: updatedContacts });
  },
  async deleteContact(contact) {
    await fetch(`${API_URL}/contacts/${contact.id}`, {
      method: "DELETE",
    });
    set((state) => {
      const updatedContacts = state.contacts.filter(
        (theContact) => theContact.id !== contact.id
      );
      return { contacts: updatedContacts };
    });
  },
}));
