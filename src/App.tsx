import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>

        <Route
        path="/"
        element={
          <div className="h-screen w-screen flex justify-center items-center">
            <h1 className="text-3xl font-bold underline">
              Hello world!
            </h1>
          </div>
        } />

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
  );
}

export default App;
