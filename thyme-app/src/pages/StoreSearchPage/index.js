// import logo from "../../logo.svg";
import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import StoreList from "../../components/storeList/storeList";

export function StoreSearchPage() {
  return (
    <MDBContainer fluid className="App Full-Screen bg-light">
      <MDBRow className="h-25">
        <MDBCol bottom className="h-50  ">
          <p>Logo Here</p>
        </MDBCol>
      </MDBRow>
      <MDBRow className="h-50" center>
        <MDBCol size="10" md="6" lg="4" className="">
          <MDBRow className="w-100">
            <StoreList />
          </MDBRow>
        </MDBCol>
      </MDBRow>
      <MDBRow className="h-25" center></MDBRow>
    </MDBContainer>
  );
}