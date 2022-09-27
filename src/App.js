import React, { Suspense } from "react";
import { Home, Articles, Article, Create } from "./routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/articles" exact={true} element={<Articles />} />
          <Route path="/articles/:articleId" element={<Article />} />
          <Route path="/create" exact={true} element={<Create />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;