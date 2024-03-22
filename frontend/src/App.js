import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/Movie/HomePage";
import ViewMovie from "./components/Movie/ViewMovie";
import Movies from "./components/Movie/Movies";
import Register from "./components/Auth/Register";
import UserLogin from "./components/Auth/UserLogin";
import AdminLogin from "./components/Auth/AdminLogin";
import { useSelector } from "react-redux";
import AddMovie from "./components/Movie/AddMovie";
import EditMovie from "./components/Movie/EditMovie";
import BookMovie from "./components/Booking/Bookings";
import MyBookings from "./components/Booking/MyBookings";


function App() {

  const user = useSelector((state) => state.user.user);
  const admin = useSelector((state) => state.admin.admin);
  console.log("user", user )
  console.log("admin", admin )

  return (
    <div>
      <Navbar />
      <section>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/:movieId" element={<ViewMovie />} />
          <Route path="/bookings/:movieId" element={<BookMovie />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/add" element={<AddMovie />} />
          <Route path="/:movieId/edit" element={<EditMovie />} />
          <Route path="/mybookings/:id" element={<MyBookings />} />
          

        </Routes>
      </section>
    </div>
  );
}

export default App;
