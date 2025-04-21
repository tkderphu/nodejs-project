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

function Layout() {
    const location = useLocation();
    const hideNavbarRoutes = ["/login", "/register", "/forgot-password"];
  
    return (
      <div>
        {!hideNavbarRoutes.includes(location.pathname) && <Header />}
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<HomePost/>} />
            <Route path="my-followings" element={<HomeFollowing/>}/>
            <Route path="my-bookmarks" element={<HomeBookmark/>}/>
            <Route path="series" element={<HomeSeries/>}/>
          </Route>

          <Route path="/search" element={<Search/>} >
          
          </Route>
          <Route path="/bookmark/:userId"  element={<Bookmark/>}/>
          <Route path="/series/create"  element={<SeriesCreate/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/forgot-password" element={<ForgetPassword/> }/>
          <Route path="/profile/:id" element={<Profile/>}>
            <Route path="followings" element={<ProfileFollowing/>}/>
            <Route index element={<ProfilePost/>} />
            <Route path="posts" element={<ProfilePost/>} />
            <Route path="followers"  element={<ProfileFollower />}/>
            <Route path="series" element={<ProfileSeries/>}/>
            <Route path="bookmarks" element={<ProfileBookmark/>}/>
          </Route>
          <Route path='/create-post' element={<PostCreate/>}></Route>
          <Route path="/posts/:id" element={<PostVeryDetails/>}></Route>
          <Route path="/clone" element={<VibloClone/>}/>
        </Routes>
      </div>
    );
  }

export default Layout