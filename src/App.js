import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {Routes, Route} from "react-router-dom";
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ConfirmAccount from "./pages/confirmAccount/ConfirmAccount";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import Home from "./pages/Home/Home";
import Profile from "./pages/profile/Profile";
import HomeLayout from "./layouts/homeLayout/HomeLayout";
import ChangePassword from "./pages/changePassword/ChangePassword";
import ProfilePageLayout from "./layouts/profilePageLayout/ProfilePageLayout";
import Contents from "./pages/contents/Contents";
import User from "./pages/user/User";
import Content from "./pages/content/Content";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/confirmaccount" element={<ConfirmAccount/>}/>
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        <Route path="/forgotpassword/change" element={<ForgotPassword/>}/>
        <Route path="/" element={<HomeLayout/>}>
          <Route index={true} element={<Home/>}/>
          <Route path="profile" element={<ProfilePageLayout/>} >
          <Route index={true} element={<Profile/>}/>
            <Route path="changepassword" element={<ChangePassword/>} />
            <Route path="shares" element={<Contents/>} />
          </Route>
          <Route path="user" element={<User/>} />
          <Route path="content" element={<Content/>} />
          
        </Route>
      </Routes>
      <ToastContainer/>
    </>

  );
}

export default App;
