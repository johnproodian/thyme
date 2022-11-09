import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import SignInPanel from "../../components/signInPanel/signInPanel";
import { SearchBar } from "../../components/SearchBar/SearchBar";

export function LandingPage() {
  return (
    <MDBContainer fluid className="bg-light Full-Screen ">
      <MDBRow center className="p-4 mt-3 mt-md-5">
        <MDBCol size={8} className="text-center my-4">
          <img
            src={"/images/thyme_logo.png"}
            className="img-fluid mx-auto"
            alt="logo"
          />
        </MDBCol>
      </MDBRow>
      <MDBRow className="mt-3" center>
        <MDBCol size="12" md="6" lg="4" className="">
          {/* Panel For log in and Create account */}
          <MDBRow className="">
            <SignInPanel />
          </MDBRow>
        </MDBCol>
      </MDBRow>
<<<<<<< HEAD
=======
      <MDBRow className="h-25" center></MDBRow>   
        <SearchBar />
>>>>>>> e39e843 (moved div tags around search bar componeneet and moved it inside the mdbdcontainer in the index.js file in the Landingpage folder)
    </MDBContainer>
 
 
   
  );
}
