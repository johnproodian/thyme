// MDB Components for Forms
import {
    MDBInput,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBRadio,
} from "mdb-react-ui-kit";
import './storeList.styles.css';

function StoreList() {
    return (
        <div>
            <MDBInput
                className="mb-4"
                type='number'
                id="zipcode"
                label="Store Search"
            />
            <MDBCard>
                <MDBCardBody>
                    <div>
                        <MDBCardTitle>Alon Market Kroger</MDBCardTitle>
                        <MDBCardText>
                            <p>8503 NW Military Hwy</p>
                            <p>San Antonio, TX 78231</p>
                        </MDBCardText>
                    </div>
                    <MDBRadio name='flexRadioDefault' id='flexRadioDefault1' />
                </MDBCardBody>
            </MDBCard>
            <MDBCard>
                <MDBCardBody>
                    <div>
                        <MDBCardTitle>Babcock Kroger</MDBCardTitle>
                        <MDBCardText>
                            <p>8503 NW Military Hwy</p>
                            <p>San Antonio, TX 78231</p>
                        </MDBCardText>
                    </div>
                    <MDBRadio name='flexRadioDefault' id='flexRadioDefault1' />
                </MDBCardBody>
            </MDBCard>
            <MDBCard>
                <MDBCardBody>
                    <div>
                        <MDBCardTitle>Da Zavala Kroger</MDBCardTitle>
                        <MDBCardText>
                            <p>8503 NW Military Hwy</p>
                            <p>San Antonio, TX 78231</p>
                        </MDBCardText>
                    </div>
                    <MDBRadio name='flexRadioDefault' id='flexRadioDefault1' />
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}
  
export default StoreList;