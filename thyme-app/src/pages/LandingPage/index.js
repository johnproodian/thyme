// import logo from "../../logo.svg";
import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import SignInPanel from "../../components/signInPanel/signInPanel";
import { SearchBar } from "../../components/SearchBar/SearchBar";

export function LandingPage() {
  return (
    <MDBContainer fluid className="App Full-Screen bg-light">
      <MDBRow className="h-25">
        <MDBCol bottom className="h-50  ">
          <p>Logo Here</p>
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
        <SearchBar />
    </MDBContainer>
 
 
   
  );
}
