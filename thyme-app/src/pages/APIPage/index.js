//import logo from "../../logo.svg";

import react, { useState } from "react";
import API from "../../utils/API";

// const QueryComponent = (props) => {
//   // Test Data State
//   const [data, setData] = useState(null);

//   // API.getUserData()

//   return <div>Test</div>;
// };

export function APIPage() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>{` API Demo`}</p>
      </header>
    </div>
  );
}
