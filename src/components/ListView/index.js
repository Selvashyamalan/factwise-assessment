
import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import axios from 'axios';
import './index.css'
import Dialog from "../Dialog";

const ListView = () => {
  const [celebritiesList, setCelebritiesList] = useState([]);
  const [isShow, setIsShow] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [isEdit, setIsEdit] = useState(true);
  const [editIndex, setEditIndex] = useState(null);
  const [newdata, setNewdata] = useState(celebritiesList[editIndex]);
  const [query, setQuery] = useState("");
  const [buttonhide, setButtonhide] = useState(false);

  useEffect(() => {
    console.log("Fetching data....")
    axios.get("/celebrities.json")
    .then(response => {
      console.log("Data fetched Successfully:", response.data)
      setCelebritiesList(response.data);
    })
    .catch(error => console.log("Error in fetching data:", error))
  }, []);

  const openAccordian = (i) => {
    setIsShow((prev) => (prev === i ? null : i));
  };

  const handleDelete = () => {
    setConfirm(true);
  };

  const handleCancel = () => {
    console.log("cancelled");
    setConfirm(false);
  };

  const deleteCelebrity = (id, i) => {
    console.log("delete data", id, i);
    setCelebritiesList(celebritiesList.filter((delId) => delId.id !== id));
    setConfirm(false);
  };
  const ageCoverter = (date) => {
    let dob = new Date(date);
    let monthDeff = Date.now() - dob.getTime();
    let ageDate = new Date(monthDeff);
    let year = ageDate.getUTCFullYear();
    var age = Math.abs(year - 1970);
    return age;
  };

  const handlchange = (e) => {
    if (e.target.name === "country") {
      if (e.target.value === "number") {
        console.log("true");
      }
    }
    setNewdata({ ...newdata, [e.target.name]: e.target.value });
    setButtonhide(true);
  };

  const handleEdit = (index) => {
    setNewdata(celebritiesList[index]);
    setEditIndex(index);
    setIsEdit(false);
  };

  const handleSave = (e) => {
    if (newdata.first.length === 0) {
      alert("You can not keep the blank");
      setIsEdit(false);
    } else {
      setIsEdit(true);
      setButtonhide(false);
    }
    if (newdata.country.length === 0) {
      alert("You can not keep the blank");
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }

    celebritiesList.splice(editIndex, 1, newdata);
  };

  const searchChangeHandle = (e) => {
    setQuery(e.target.value);
  };

  const checkType = (data) => {
    if (isNaN(data)) {
      return data;
    } else {
      return "";
    }
  };
  return (
    <div className="container">
      <div className="list-input-container">
        <h1 className="list-heading">List View</h1>
        <input
          type="text"
          className="search"
          placeholder="Search user"
          onChange={searchChangeHandle}
        />

        {celebritiesList
          .filter(
            (user) =>
              user.first.toLowerCase().includes(query) ||
              user.last.toLowerCase().includes(query)
          )
          .map((data, i) => (
            <div className="accordian" key={data.id}>
              <div className="celebrity-detail">
                <div className="celebrity">
                  <img
                    src={data.picture}
                    alt={data.picture}
                    className="celebrity-picture"
                  />
                  {isEdit ? (
                    <p className="non-editable-heading">{data.first + " " + data.last}</p>
                  ) : editIndex !== i ? (
                    <p className="non-editable-heading">{data.first + " " + data.last}</p>
                  ) : (
                    <div className="InputNameFiled">
                      <input
                        name="first"
                        type="text"
                        className="edit_name"
                        value={newdata.first}
                        onChange={handlchange}
                      />
                      <input
                        name="last"
                        type="text"
                        className="edit_name"
                        value={newdata.last}
                        onChange={handlchange}
                      />
                    </div>
                  )}
                </div>
                <div>
                  {isShow !== i ? (
                    <span
                      className="plus-minus"
                      onClick={() => openAccordian(i)}
                    >
                      +
                    </span>
                  ) : (
                    <span
                      className="plus-minus"
                      onClick={() => openAccordian(i)}
                    >
                      -
                    </span>
                  )}
                </div>
              </div>
              {i === isShow && (
                <div>
                  <div className="celebrities-dob-gen-country">
                    <div>
                      <p className="label">Age</p>
                      {isEdit ? (
                        <p className="non-editable-text">{ageCoverter(data.dob)}</p>
                      ) : editIndex !== i ? (
                        <p className="non-editable-text">{ageCoverter(data.dob)}</p>
                      ) : (
                        <input
                          name="dob"
                          type="date"
                          className="edit_age"
                          value={newdata.dob || ageCoverter(data.dob)}
                          onChange={handlchange}
                        />
                      )}
                    </div>
                    <div>
                      <p className="label"> Gender</p>
                      {isEdit ? (
                        <p className="non-editable-text">{data.gender}</p>
                      ) : editIndex !== i ? (
                        <p className="non-editable-text">{data.gender}</p>
                      ) : (
                        <select
                          name="gender"
                          value={newdata.gender}
                          className="edit_gender"
                          onChange={handlchange}
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Transgender">Transgender</option>
                          <option value="Rather Not Say">Rather Not Say</option>
                        </select>
                      )}
                    </div>

                    <div>
                      <p className="label">Country</p>

                      {isEdit ? (
                        <p className="non-editable-text">{data.country}</p>
                      ) : editIndex !== i ? (
                        <p className="non-editable-text">{data.country}</p>
                      ) : (
                        <input
                          type="text"
                          name="country"
                          className="edit_country"
                          value={checkType(newdata.country)}
                          onChange={handlchange}
                        />
                      )}
                    </div>
                  </div>
                  <div className="description">
                    <p className="label">Description</p>
                    {isEdit ? (
                      <p className="non-editable-text">{data.description}</p>
                    ) : editIndex !== i ? (
                      <p className="non-editable-text">{data.description}</p>
                    ) : (
                      <textarea
                        rows="9"
                        cols="53"
                        name="description"
                        className="edit_description"
                        value={newdata.description}
                        onChange={handlchange}
                      ></textarea>
                    )}
                  </div>
                  {isEdit ? (
                    <div>
                      <div className="icons">
                        <RiDeleteBin6Line
                          className="delete"
                          onClick={handleDelete}
                        />
                        <MdOutlineEdit
                          className="edit"
                          onClick={() => handleEdit(i)}
                        />
                      </div>
                      <div>
                        {confirm && (
                          <Dialog
                            onCancel={handleCancel}
                            onDelete={() => deleteCelebrity(data.id, i)}
                          />
                        )}
                      </div>
                    </div>
                  ) : editIndex !== i ? (
                    <div>
                      <div className="icons">
                        <RiDeleteBin6Line
                          className="delete"
                          onClick={handleDelete}
                        />
                        <MdOutlineEdit
                          className="edit"
                          onClick={() => handleEdit(i)}
                        />
                      </div>
                      <div>
                        {confirm && (
                          <Dialog
                            onCancel={handleCancel}
                            onDelete={() => deleteCelebrity(data.id, i)}
                          />
                        )}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <button className="cancel" onClick={() => setIsEdit(true)}>cancel</button>
                      {buttonhide && <button className="save" onClick={handleSave}>save</button>}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListView
;
