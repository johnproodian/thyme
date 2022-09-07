// import logo from "../../logo.svg";
import { MDBCol, MDBContainer, MDBRow } from "mdbreact";

export function LandingPage() {
  return (
    <MDBContainer fluid className="App Full-Screen bg-light">
      <MDBRow className="h-25">
        <MDBCol bottom className="h-50">
          logo
        </MDBCol>
      </MDBRow>
      <MDBRow className="bg-dark h-50" center>
        {" "}
        Panel
      </MDBRow>
      <MDBRow className="h-25" center></MDBRow>
    </MDBContainer>
  );
}
