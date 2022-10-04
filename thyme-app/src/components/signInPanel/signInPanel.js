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
  MDBContainer,
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
          <a href="#!">Forgot Password?</a>
        </MDBCol>
      </MDBRow>

      <MDBBtn type="submit" className="mb-4" block>
        Sign in
      </MDBBtn>

      <div className="text-center d-none">
        <p>or sign up with:</p>

        <MDBBtn block className="mx-1 my-1">
          <MDBIcon fab icon="google" />
        </MDBBtn>

        <MDBBtn block className="mx-1">
          <MDBIcon fab icon="apple" />
        </MDBBtn>
      </div>
    </form>
  );
};

const CreateAccountForm = (props) => {
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
        type="email"
        id="form3Example3"
        label="Email address"
      />
      <MDBInput
        className="mb-4"
        type="password"
        id="form3Example4"
        label="Password"
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
    <MDBContainer>
      <MDBTabs pills justify className="mb-4 mx-auto">
        <MDBTabsItem>
          <MDBTabsLink
            className="mx-1 "
            onClick={() => handleTabClick("tab1")}
            active={activeTab === "tab1"}
          >
            Log In
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            className=""
            onClick={() => handleTabClick("tab2")}
            active={activeTab === "tab2"}
          >
            Register
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
    </MDBContainer>
  );
}

export default SignInPanel;
