// import logo from "../../logo.svg";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import SignInPanel from "../../components/signInPanel/signInPanel";

export function LandingPage() {
  return (
    <MDBContainer fluid className="App Full-Screen">
      <MDBRow className="h-25 ">
        <MDBCol center className="h-50  ">
          <p className="text-center ">Logo Here</p>
        </MDBCol>
      </MDBRow>
      <MDBRow className="h-50" center>
        <MDBCol size="10" md="6" lg="4" className="">
          {/* Panel For log in and Create account */}
          <MDBRow className="w-100">
            <SignInPanel />
          </MDBRow>
        </MDBCol>
      </MDBRow>
      <MDBRow className="h-25" center></MDBRow>
    </MDBContainer>
  );
}
