import React, { Suspense } from "react";
import { Home,  } from "./routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;