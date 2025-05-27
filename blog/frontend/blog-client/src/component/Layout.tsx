import { Route, Routes, useLocation } from "react-router-dom";
import Post from "./post/PostSimple";
import ForgetPassword from "./forget-password/ForgetPassword";
import Header from "./header/Header";
import Home from "./home/Home";
import Login from "./login/Login";
import PostCreate from "./post/PostCreate";
import Profile from "./profile/Profile";
import Register from "./register/Register";
import PostDetail from "./post/PostDetail";
import Bookmark from "./bookmark/Bookmark";
import Series from "./series/Series";
import SeriesCreate from "./series/SeriesCreate";
import VibloClone from "../VibloClone";
import HomePost from "./home/HomePost";
import HomeFollowing from "./home/HomeFollowing";
import HomeBookmark from "./home/HomeBookmark";
import HomeSeries from "./home/HomeSeries";
import Search from "./search/Search";
import PostVeryDetails from "./post/PostVeryDetails";
import ProfileFollowing from "./profile/ProfileFollowing";
import ProfilePost from "./profile/ProfilePost";
import ProfileFollower from "./profile/ProfileFollower";
import ProfileSeries from "./profile/ProfileSeries";
import ProfileBookmark from "./profile/ProfileBookmark";
import SearchPost from "./search/SearchPost";
import SearchAuthor from "./search/SearchAuthor";
import ProtectedComponent from "./protected/ProtectedComponent";
import ViosmashBlog from "../new-ui/Home";
import Header1 from "./header/Header1";
import Footer from "./header/Footer";
import Profile1 from "./profile/Profile1";
import SettingComponent from "./setting/SettingComponent";
import Return from "../Return";
import SettingNotifyComponent from "./setting/SettingNotifyComponent";
import SettingPassword from "./setting/SettingPasword";
import AdminHome from "./admin/AdminHome";
import AdminHomeOverview from "./admin/AdminHomeOverview";
import AdminHomeUserManagement from "./admin/AdminHomeUserManagement";
import AdminHomeReport from "./admin/AdminHomeReport";
import AdminHomeReportPost from "./admin/AdminHomeReportPost";
import AdminLogin from "./admin/AdminLogin";
import AdminHomeReportComment from "./admin/AdminHomeReportComment";

function Layout() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register", "/forgot-password", "/admin"];
  // user-ui
  return (
    <div>
      <Routes>
        <Route element={<ProtectedComponent  role={"admin"}/>}>
          <Route path="admin" element={<AdminHome />} >
            <Route index element={<AdminHomeOverview />} />
            <Route path="panel" element={<AdminHomeOverview />} />
            <Route path="users" element={<AdminHomeUserManagement />} />
            <Route path="reports" element={<AdminHomeReport />} >
              <Route path="post" element={<AdminHomeReportPost />} />
              <Route index element={<AdminHomeReportPost />} />
              <Route path="comment" element={<AdminHomeReportComment />} />
            </Route>
          </Route>
        </Route>
        <Route path="admin/login" element={<AdminLogin />} />
      </Routes>
      <div id="user-ui">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
        </Routes>
        <Routes>
          {/* <Route path="admin/panel" element={<AdminHome/>} ></Route> */}
          <Route element={<Header1 />}>
            <Route path="/" element={<Home />}>
              <Route index element={<HomePost />} />
              <Route path="newest" element={<HomePost />} />
              <Route element={<ProtectedComponent />}>
                <Route path="my-followings" element={<HomeFollowing />} />
                <Route path="my-bookmarks" element={<HomeBookmark />} />
              </Route>
              <Route path="series" element={<HomeSeries />} />
            </Route>

            <Route path="return" element={<Return />} />

            <Route path="new-ui" element={<ViosmashBlog />} />

            <Route path="/search" element={<Search />} >

            </Route>
            <Route path="/bookmark/:userId" element={<Bookmark />} />

            <Route path="/profile/:id" element={<Profile1 />}>
              <Route path="followings" element={<ProfileFollowing />} />
              <Route index element={<ProfilePost />} />
              <Route path="posts" element={<ProfilePost />} />
              <Route path="followers" element={<ProfileFollower />} />
              <Route path="series" element={<ProfileSeries />} />
              <Route path="bookmarks" element={<ProfileBookmark />} />
            </Route>
            <Route path="setting/:userId" element={<SettingComponent />}>
              <Route index element={<SettingNotifyComponent />} />
              <Route path="notification" element={<SettingNotifyComponent />} />
              <Route path="password" element={<SettingPassword />} />
            </Route>
            <Route path="/posts/:id" element={<PostVeryDetails />}></Route>
            <Route path="/clone" element={<VibloClone />} />

            <Route element={<ProtectedComponent />}>
              <Route path='/create-post' element={<PostCreate />}></Route>
              <Route path="/create-series" element={<SeriesCreate />} />
              <Route />
            </Route>

          </Route>
        </Routes>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Layout