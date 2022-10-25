import React, { Suspense, useEffect, useState } from "react";
import { Home, Articles, Article, Create, Category, Login, NotFound, Dashboard } from "./routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./redux/user/userSlice"
import Loading from "./components/Loading";
import PrivateRoute from "./components/PrivateRoute";
import Cookies from "js-cookie"

function App() {
  const [user,] = useState(Cookies.get('sv_user') ? Cookies.get('sv_user') : null)
  const [token,] = useState(Cookies.get('sv_access') ? Cookies.get('sv_access') : null)
  const dispatch = useDispatch()
  useEffect(() => {
    if (user) {
      dispatch(
        setCredentials({
          user: user,
          token: token
        })
      );
    }
  }, [user, token, dispatch])


  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/articles" exact={true} element={<Articles />} />
          <Route path="/articles/:articleId" element={<Article />} />
          <Route path="/create" exact={true} element={<Create />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category/:categoryId" element={<Category />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          {/* <Route path="/dashboard" element={<PrivateRoute component={<Dashboard />} />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;