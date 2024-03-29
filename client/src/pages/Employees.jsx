import React, { useState, useEffect } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from "@syncfusion/ej2-react-grids";
import { Header } from "../components";
import { employeesGrid } from "../data/dummy";

const Employees = () => {
  var id = 13;

  const selectionsettings = { persistSelection: true };
  const toolbarOptions = [""];
  const editing = { allowDeleting: true, allowEditing: true };
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:5000/employee");
      const data = await response.json();
      setDataSource(data);
    }
    fetchData();
  }, []);

  const handleAdd = async (data) => {
    const response = await fetch("http://localhost:5000/employee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const newEmployee = await response.json();
    setDataSource([...dataSource, newEmployee]);
  };

  const AddForm = ({ onAdd }) => {
    const [branchId, setBranchId] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [phoneNumber, setPhoneNumber] = useState("");
    const [salary, setSalary] = useState("");
    const [position, setPosition] = useState("");
    const [managerId, setManagerId] = useState("");
    const [joinDate, setJoinDate] = useState("");

    const [showForm, setShowForm] = useState(false);
    const handleSubmit = async (e) => {
      e.preventDefault();
      const newItem = {
        id: id,
        branchId: branchId,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        salary: salary,
        position: position,
        managerId: managerId,
        joinDate: joinDate,
      };
      console.log(newItem);
      id = id + 1;
      const response = await fetch("http://localhost:5000/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
      const data = await response.json();
      onAdd(data);
      setBranchId("");
      setFirstName("");
      setLastName("");
      setPhoneNumber("");
      setSalary("");
      setPosition("");
      setBranchId("");
      setManagerId("");
      setJoinDate("");
      setShowForm(false);
    };

    const handleCancel = (e) => {
      e.preventDefault();
      setName("");
      setPhone("");
      setPosition("");
      setSalary("");
      setBranchId("");
      setShowForm(false);
    };

    return (
      <div>
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg mt-4"
          >
            Add Employee
          </button>
        ) : (
          <div className="my-6">
            <h2 className="text-xl font-bold mb-2">Add Employee</h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col mb-2">
                <label htmlFor="branchId" className="mb-1 font-bold">
                  Branch Id
                </label>
                <input
                  type="number"
                  id="branchId"
                  value={branchId}
                  onChange={(e) => setBranchId(e.target.value)}
                  className="border p-2 rounded-lg"
                  required
                />
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="firstName" className="mb-1 font-bold">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="border p-2 rounded-lg"
                  required
                />
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="lastName" className="mb-1 font-bold">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="border p-2 rounded-lg"
                  required
                />
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="phoneNumber" className="mb-1 font-bold">
                  Phone
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
              <div className="flex flex-col mb-2">
                <label htmlFor="salary" className="mb-1 font-bold">
                  Salary
                </label>
                <input
                  type="num"
                  id="salary"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="border p-2 rounded-lg"
                  required
                />
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="position" className="mb-1 font-bold">
                  Position
                </label>
                <input
                  type="text"
                  id="position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="border p-2 rounded-lg"
                  required
                />
              </div>

              <div className="flex flex-col mb-2">
                <label htmlFor="managerId" className="mb-1 font-bold">
                  Manager Id
                </label>
                <input
                  type="num"
                  id="managerId"
                  value={managerId}
                  onChange={(e) => setManagerId(e.target.value)}
                  className="border p-2 rounded-lg"
                  required
                />
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="joinDate" className="mb-1 font-bold">
                  Join Date
                </label>
                <input
                  type="date"
                  id="joinDate"
                  value={joinDate}
                  onChange={(e) => setJoinDate(e.target.value)}
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
      <Header category="Page" title="Employees" />
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
          {employeesGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Employees;
