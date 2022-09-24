import React, { Suspense } from "react";
import { Home, Article } from "./routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/article" exact={true} element={<Article />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;