import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

function App() {
  return (
    <div className="h-screen w-screen flex justify-center">

      <Router>
        <Routes>

          <Route
          path="/"
          element={ <Home /> } />

          <Route
          path="/test"
          element={
            <div className="h-screen w-screen flex justify-center items-center">
              <h1 className="text-3xl font-bold underline">
                Test
              </h1>
            </div>
          } />

        </Routes>
      </Router>

    </div>
  );
}

export default App;
