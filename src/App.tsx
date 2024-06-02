import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Generate from "./pages/Generate";

function App() {
  return (
    <div>

      <Router>
        <Routes>

          <Route
          path="/"
          element={ <Home /> } />

          <Route
          path="/generate"
          element={ <Generate /> } />

        </Routes>
      </Router>

    </div>
  );
}

export default App;
