import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import API from "../../utils/API";

// MDB Components for Forms
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";

// MDB Components for Panel
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";

const LogInForm = (props) => {
  return (
    <form className="">
      <MDBInput
        className="mb-4"
        type="email"
        id="form2Example1"
        label="Email address"
      />
      <MDBInput
        className="mb-4"
        type="password"
        id="form2Example2"
        label="Password"
      />

      <MDBRow className="mb-4">
        <MDBCol className="d-flex justify-content-center">
          <MDBCheckbox id="form2Example3" label="Remember me" defaultChecked />
        </MDBCol>
        <MDBCol>
          <a href="#!">Forgot password?</a>
        </MDBCol>
      </MDBRow>

      <MDBBtn type="submit" className="mb-4" block>
        Sign in
      </MDBBtn>
    </form>
  );
};

const CreateAccountForm = (props) => {
  // Init State for Form data
  const [formData, setFormData] = useState({
    email: "",
    zipCode: "",
    password: "",
  });

  // Init Mutate Hook
  const [addUser, { data, loading, error }] = useMutation(
    API.mutation.ADD_USER
  );

  // Handle Input value change method
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

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
    <form>
      <MDBRow className="mb-4">
        <MDBCol>
          <MDBInput id="form3Example1" label="First name" />
        </MDBCol>
        <MDBCol>
          <MDBInput id="form3Example2" label="Last name" />
        </MDBCol>
      </MDBRow>
      <MDBInput
        className="mb-4"
        label="Email address"
        placeholder="e-mail"
        name="email"
        type="email"
        id="email"
        value={formData.email}
        onChange={handleChange}
      />
      <MDBInput
        className="mb-4"
        name="password"
        type="password"
        id="password"
        label="Password"
        value={formData.password}
        onChange={handleChange}
      />

      <MDBBtn type="submit" className="mb-4" block>
        Create Account
      </MDBBtn>
    </form>
  );
};

function SignInPanel(props) {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (value) => {
    if (value === activeTab) {
      return;
    }

    setActiveTab(value);
  };

  return (
    <>
      <MDBTabs pills justify className="mb-4 w-100">
        <MDBTabsItem>
          <MDBTabsLink
            className="mx-1"
            onClick={() => handleTabClick("tab1")}
            active={activeTab === "tab1"}
          >
            Log In
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleTabClick("tab2")}
            active={activeTab === "tab2"}
          >
            Create Account
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent className="d-flex justify-content-center w-100">
        <MDBTabsPane className="w-100 p-2" show={activeTab === "tab1"}>
          <LogInForm />
        </MDBTabsPane>
        <MDBTabsPane className="w-100 p-2" show={activeTab === "tab2"}>
          <CreateAccountForm />
        </MDBTabsPane>
      </MDBTabsContent>
    </>
  );
}

export default SignInPanel;
