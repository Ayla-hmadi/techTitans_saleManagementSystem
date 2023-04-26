import React, { useState } from "react";

const AddForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = { name: name, phone_number: phone };
    console.log(newItem);
    const response = await fetch("http://localhost:5000/customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });
    const data = await response.json();
    onAdd(data);
    setName("");
    setPhone("");
    setShowForm(false);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setName("");
    setPhone("");
    setShowForm(false);
  };

  return (
    <div>
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg mt-4"
        >
          Add Customer
        </button>
      ) : (
        <div className="my-6">
          <h2 className="text-xl font-bold mb-2">Add Customer</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-2">
              <label htmlFor="email" className="mb-1 font-bold">
                Name
              </label>
              <input
                type="text"
                id="email"
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
      )}
    </div>
  );
};

export default AddForm;