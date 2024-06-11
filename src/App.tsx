import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Generate from "./pages/Generate";
import Final from "./pages/Final";
import ReviewPrompt from "./components/ReviewPrompt";

function App() {
  return (
    <div>

      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home />} />

          <Route
            path="/generate"
            element={<Generate />} />

          <Route
            path="/final"
            element={<Final />} />

<Route
            path="/review"
            element={<ReviewPrompt/>} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
