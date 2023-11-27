import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Movie from "./pages/movie/Movie";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Movie1 from "./pages/movie1/Movie1";
import Payment from "./components/payment/Payment";
import FailPage from "./pages/fail/Fail";
import SuccessPage from "./pages/success/Success";
import AdminLogin from "./pages/admin/login/AdminLogin";
import AdminHome from "./pages/admin/home/AdminHome";
import Users from "./pages/admin/users/Users";
import Movies from "./pages/admin/movies/Movies";
import Theaters from "./pages/admin/movies/Theaters";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<List />} />
        <Route path="/movies/:id/shows" element={<Movie />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Experimental */}
        <Route path="/seat" element={<Movie1 />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/fail" element={<FailPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/users" element={<Users />} />
        <Route path="/allmovies" element={<Movies />} />
        <Route path="/theaters" element={<Theaters />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
