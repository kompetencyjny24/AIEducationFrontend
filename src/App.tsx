import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Generate from "./pages/Generate";
import Final from "./pages/Final";

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
