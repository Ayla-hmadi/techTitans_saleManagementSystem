import React, { useState } from "react";

const EditForm = ({ customer, onUpdate }) => {
  const [name, setName] = useState(customer.name);
  const [phone, setPhone] = useState(customer.phone_number);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedItem = { name: name, phone_number: phone };
    const response = await fetch(`http://localhost:5000/customer/${customer.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    });
    const data = await response.json();
    onUpdate(data);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setName(customer.name);
    setPhone(customer.phone_number);
  };

  return (
    <div className="my-6">
      <h2 className="text-xl font-bold mb-2">Edit Customer</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-2">
          <label htmlFor="name" className="mb-1 font-bold">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded-lg"
            required
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="phone" className="mb-1 font-bold">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 rounded-lg"
            required
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg mt-4"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg mt-4"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
