import React, { useState, useEffect } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';
import {BranchesGrid } from '../data/dummy';

const Branches = () => {
  var id = 14;

  const selectionsettings = { persistSelection: true };
  const toolbarOptions = [''];
  const editing = { allowDeleting: true, allowEditing: true };
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:5000/branches');
      const data = await response.json();
      setDataSource(data);
    }
    fetchData();
  }, []);

  const handleAdd = async (data) => {
    const response = await fetch("http://localhost:5000/branches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const newBranch = await response.json();
    setDataSource([...dataSource, newBranch]);
  };

  const AddForm = ({ onAdd }) => {
    const [storeId, setStoreId] = useState("");
    const [road, setRoad] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [openingDate, setOpeningDate] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      const newItem = {id : id,storeId: storeId, road: road, city: city, country: country, openingDate: openingDate, phoneNumber: phoneNumber  };
      id = id +1;
      console.log(newItem);
      const response = await fetch("http://localhost:5000/branches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
      const data =
       await response.json();
      onAdd(data);
      setStoreId("");
      setRoad("");
      setCity("");
      setCountry("");
      setOpeningDate("");
      setPhoneNumber("");
      setShowForm(false);
    };

    const handleCancel = (e) => {
      e.preventDefault();
      setStoreId("");
      setRoad("");
      setCity("");
      setCountry("");
      setOpeningDate("");
      setPhoneNumber("");
      setShowForm(false);
    };

    return (
      <div>
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg mt-4"
          >
            Add Branch
          </button>
        ) : (
          <div className="my-6">
            <h2 className="text-xl font-bold mb-2">Add Branch</h2>
            <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-2">
                <label htmlFor="storeId" className="mb-1 font-bold">
                  Store Id
                </label>
                <input
                  type="number"
                  id="storeId"
                  value={storeId}
                  onChange={(e) => setStoreId(e.target.value)}
                  className="border p-2 rounded-lg"
                  required
                />
              </div>
              
              <div className="flex flex-col mb-2">
                <label htmlFor="road" className="mb-1 font-bold">
                  Road
                </label>
                <input
                  type="text"
                  id="road"
                  value={road}
                  onChange={(e) => setRoad(e.target.value)}
                  className="border p-2 rounded-lg"
                  required
                />
              </div>

              <div className="flex flex-col mb-2">
                <label htmlFor="city" className="mb-1 font-bold">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="border p-2 rounded-lg"
                  required
                />
              </div>
              
              <div className="flex flex-col mb-2">
                <label htmlFor="country" className="mb-1 font-bold">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="border p-2 rounded-lg"
                  required
                />
              </div>
               
              <div className="flex flex-col mb-2">
                <label htmlFor="openingDate" className="mb-1 font-bold">
                  Opening Date
                </label>
                <input
                  type="date"
                  id="openingDate"
                  value={openingDate}
                  onChange={(e) => setOpeningDate(e.target.value)}
                  className="border p-2 rounded-lg"
                  required
                />
              </div>
              
              
              <div className="flex flex-col mb-2">
                <label htmlFor="phoneNumber" className="mb-1 font-bold">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
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


  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Branches" />

      <AddForm onAdd={handleAdd} />


      <GridComponent
        dataSource={dataSource}
        enableHover={false}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        editSettings={editing}
        allowSorting
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {BranchesGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Branches;
