import React, { useState, useEffect } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';
import {InvoicesGrid } from '../data/dummy';

const Invoices = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = [''];
  const editing = { allowDeleting: true, allowEditing: true };
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:5000/invoice');
      const data = await response.json();
      setDataSource(data);
    }
    fetchData();
  }, []);

  const handleAdd = async (data) => {
    const response = await fetch("http://localhost:5000/invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const newInvoice = await response.json();
    setDataSource([...dataSource, newInvoice]);
  };

  const AddForm = ({ onAdd }) => {
    const [time_stamp, setTimeStamp] = useState("");
    const [payment_due_date, setPaymentDueDate] = useState("");
    const [payment_time_stamp, setPaymentTimeStamp] = useState("");
    const [payment_method, setPaymentMethod] = useState("");
    const [customer_id, setCustomerId] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      const newItem = {time_stamp: time_stamp, payment_due_date: payment_due_date, payment_time_stamp: payment_time_stamp, payment_method: payment_method,customer_id: customer_id  };
      console.log(newItem);
      const response = await fetch("http://localhost:5000/invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
      const data = await response.json();
      onAdd(data);
      setTimeStamp("");
      setPaymentDueDate("");
      setPaymentTimeStamp("");
      setPaymentMethod("");
      setCustomerId("");

      setShowForm(false);
    };

    const handleCancel = (e) => {
      e.preventDefault();
      setTimeStamp("");
      setPaymentDueDate("");
      setPaymentTimeStamp("");
      setPaymentMethod("");
      setCustomerId("");
      setShowForm(false);
    };

    return (
      <div>
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg mt-4"
          >
            Add Invoice
          </button>
        ) : (
          <div className="my-6">
            <h2 className="text-xl font-bold mb-2">Add Invoice</h2>
            <form onSubmit={handleSubmit}>
             
              <div className="flex flex-col mb-2">
                <label htmlFor="timeStamp" className="mb-1 font-bold">
                  Time Stamp
                </label>
                <input
                  type="time"
                  id="timeStamp"
                  value={timeStamp}
                  onChange={(e) => setTimeStamp(e.target.value)}
                  className="border p-2 rounded-lg"
                  required
                />
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="paymentDueDate" className="mb-1 font-bold">
                  Payment Due Date
                </label>
                <input
                  type="date"
                  id="paymentDueDate"
                  value={paymentDueDate}
                  onChange={(e) => setPaymentDueDate(e.target.value)}
                  className="border p-2 rounded-lg"
                  required
                />
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="paymentTimeStamp" className="mb-1 font-bold">
                  Payment Time Stamp
                </label>
                <input
                  type="date"
                  id="paymentTimeStamp"
                  value={paymentTimeStamp}
                  onChange={(e) => setPaymentTimeStamp(e.target.value)}
                  className="border p-2 rounded-lg"
                  required
                />
              </div>
                
              <div className="flex flex-col mb-2">
                <label htmlFor="paymentMethod" className="mb-1 font-bold">
                  Payment Method
                </label>
                <input
                  type="text"
                  id="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="border p-2 rounded-lg"
                  required
                />
              </div>
                
              <div className="flex flex-col mb-2">
                <label htmlFor="customerId" className="mb-1 font-bold">
                  Customer Id
                </label>
                <input
                  type="num"
                  id="customerId"
                  value={customerId}
                  onChange={(e) => setCustomerIdi(e.target.value)}
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
      <Header category="Page" title="Invoices" />
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
          {InvoicesGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Invoices;
