"use client";

import { Button } from "@/components/ui/button";
import { useContactStore } from "../store/contact";
import { blankContact } from "../store/blankContact";

const ContactEditor = () => {
  const { currentContact, setCurrentContact, updateContact, deleteContact, createContact } =
    useContactStore();

  const handleChange = (name) => {
    return (text) => {
      let value = text.target.value;
      setCurrentContact({
        ...currentContact,
        [name]: value,
      });
    };
  };

  const handleSubmit = () => {
    const updatedCurrentContact = {
      ...currentContact,
    };
    setCurrentContact(updatedCurrentContact);
    let newContact = updatedCurrentContact;
    if (newContact.id) {
      try {
        updateContact(newContact);
      } catch (error) {
        console.error(error.message);
      }
    } else {
      try {
        createContact(newContact);
        setCurrentContact(blankContact);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const handleDelete = () => {
    deleteContact(currentContact);
    setCurrentContact(blankContact);
  };

  return (
    <div className="gap-12 p-8">
      <h1 className="text-h1 mb-8 text-center text-3xl font-semibold">
        {currentContact.id ? "Edit Contact" : "New Contact"}
      </h1>
      <div className="flex flex-col items-center justify-center gap-8 w-88">
        <div className="flex w-72 flex-row items-center justify-between">
          <h2 className="text-h2 text-xl font-semibold">Name:</h2>
          <Input
            placeholder="Name"
            value={currentContact.name}
            handleChange={handleChange("name")}
          />
        </div>
        <div className="flex w-72 flex-row items-center justify-between">
          <h2 className="text-h2 text-xl font-semibold">Adr:</h2>
          <Input
            placeholder="Address"
            value={currentContact.address}
            handleChange={handleChange("address")}
          />
        </div>
        <div className="flex w-72 flex-row items-center justify-between">
          <h2 className="text-h2 text-xl font-semibold">#:</h2>
          <Input
            placeholder="Phone Number"
            value={currentContact.number}
            handleChange={handleChange("number")}
          />
        </div>
        <div className="flex w-72 flex-row items-center justify-between">
          <h2 className="text-h2 text-xl font-semibold">Email:</h2>
          <Input
            placeholder="Email"
            value={currentContact.email}
            handleChange={handleChange("email")}
          />
        </div>
        <div className="flex w-72 flex-row items-center justify-between">
          <h2 className="text-h2 text-xl font-semibold">Cat:</h2>
          <Input
            placeholder="Category"
            value={currentContact.category}
            handleChange={handleChange("category")}
          />
        </div>
        <Button className="w-72" onClick={handleSubmit}>
          {currentContact.id ? "Update Contact" : "Create Contact"}
        </Button>
        <Button
          className="w-72 bg-[#fa5252] hover:bg-[#f03e3e]"
          onClick={handleDelete}
        >
          Delete Contact
        </Button>
      </div>
    </div>
  );
};

const Input = ({ value, placeholder, handleChange }) => {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className="w-max rounded-md border-2 border-gray-300 p-2 transition focus:border-primary focus:outline-none text-black"
    />
  );
};

export default ContactEditor;
