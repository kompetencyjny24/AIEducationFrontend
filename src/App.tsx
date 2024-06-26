import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Generate from "./pages/Generate";
import Final from "./pages/Final";
import FinalWithUuid from "./pages/FinalWithUuid";
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
            path="/prepare_prompt"
            element={<Generate />} />

          <Route
            path="/review_prompt"
            element={<ReviewPrompt/>} />

          <Route
            path="/generated_tasks"
            element={<Final />} />

          <Route
            path="/:uuid"
            element={<FinalWithUuid />} />

        </Routes>

      </Router>

    </div>
  );
}

export default App;
