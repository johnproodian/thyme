import "./App.css";

// Import React Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Pages
import LandingPage from "./pages/landingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* TO DO: Log in / Register Route */}
        {/* TO DO: Dashboard Routes */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
