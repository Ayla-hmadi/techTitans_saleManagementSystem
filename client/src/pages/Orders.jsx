import React, { useState, useEffect } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';
import {ordersGrid } from '../data/dummy';

const Orders = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = [''];
  const editing = { allowDeleting: true, allowEditing: true };
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:5000/buys');
      const data = await response.json();
      setDataSource(data);
    }
    fetchData();
  }, []);

  const handleAdd = async (data) => {
    const response = await fetch("http://localhost:5000/buys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const newOrder = await response.json();
    setDataSource([...dataSource, newOrder]);
  };

  const AddForm = ({ onAdd }) => {
    const [invoice_id, setInvoiceId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      const newItem = {invoice_id: invoice_id, quantity: quantity  };
      console.log(newItem);
      const response = await fetch("http://localhost:5000/buys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
      const data = await response.json();
      onAdd(data);
      setInvoiceId("");
      setQuantity("");
      setShowForm(false);
    };

    const handleCancel = (e) => {
      e.preventDefault();
      setInvoiceId("");
      setQuantity("");
      setShowForm(false);
    };

    return (
      <div>
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg mt-4"
          >
            Add Order
          </button>
        ) : (
          <div className="my-6">
            <h2 className="text-xl font-bold mb-2">Add Order</h2>
            <form onSubmit={handleSubmit}>
             
              <div className="flex flex-col mb-2">
                <label htmlFor="invoice_id" className="mb-1 font-bold">
                  Invoice Id
                </label>
                <input
                  type="number"
                  id="invoice_id"
                  value={invoice_id}
                  onChange={(e) => setInvoiceId(e.target.value)}
                  className="border p-2 rounded-lg"
                  required
                />
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="quantity" className="mb-1 font-bold">
                  Quantity
                </label>
                <input
                  type="num"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
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
      <Header category="Page" title="Orders" />
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
          {ordersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Orders;
