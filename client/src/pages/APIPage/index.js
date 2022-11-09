//import logo from "../../logo.svg";

import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USERS, ADD_USER } from "../../utils/API";

console.log(GET_USERS);

const DisplayUsers = (props) => {
  const {loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <p>Error :(</p>;
  }

  return data?.users.map(({ _id, email, storeID }) => (
    <div key={_id}>
      <h5>{_id}</h5>
      <h6>{email}</h6>
      <h6>{storeID}</h6>
      <br />
    </div>
  ));
};

const CreateUser = (props) => {
  // Init State for Form data
  const [formData, setFormData] = useState({
    email: "",
    storeID: "",
    password: "",
  });

  // Init Mutate Hook
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // console.log(formData);

    const { email, storeID, password } = formData;

    // Add user with form data
    const { data } = await addUser({
      variables: {
        ...formData,
      },
      // Add User Mutation returns user token and user data
    });

    // After User is added see Returned Data
    console.log(data);
    // Reload Page
    window.location.assign("/api");
  };

  // if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  return (
    <>
      <p style={{ fontSize: "1rem" }}>Add User</p>
      <form onSubmit={handleFormSubmit}>
        <input
          placeholder="e-mail"
          name="email"
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="store ID"
          name="storeID"
          type="storeID"
          id="storeID"
          value={formData.storeID}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="******"
          name="password"
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

export function APIPage() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p style={{ fontSize: "1.2rem" }}>{` API Test Demo`}</p>

        <CreateUser />
        <hr />
        <br />
        <p style={{ fontSize: "1rem" }}> Query All Users</p>
        <DisplayUsers />
      </header>
    </div>
  );
}
