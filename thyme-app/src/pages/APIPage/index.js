//import logo from "../../logo.svg";

import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import API from "../../utils/API";

const DisplayUsers = (props) => {
  const { loading, error, data } = useQuery(API.query.GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.users.map(({ _id, username, email, zipCode }) => (
    <div key={_id}>
      <h5>{username}</h5>
      <h6>{email}</h6>
      <h6>{zipCode}</h6>
      <br />
    </div>
  ));
};

const CreateUser = (props) => {
  // Init State for Form data
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    zipCode: "",
    password: "",
  });

  // Init Mutate Hook
  const [addUser, { data, loading, error }] = useMutation(
    API.mutation.ADD_USER
  );

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

    const { username, email, zipCode, password } = formData;

    // Add user with form data
    await addUser({
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

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  return (
    <>
      <p style={{ fontSize: "1rem" }}>Add User</p>
      <form onSubmit={handleFormSubmit}>
        <input
          placeholder="username"
          name="username"
          type="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
        />
        <br />
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
          placeholder="zipcode"
          name="zipCode"
          type="zipCode"
          id="zipCode"
          value={formData.zipCode}
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
