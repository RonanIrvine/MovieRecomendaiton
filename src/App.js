import './App.css';
import {BrowserRouter, BrowserRouter as Router, Route, Routes }from 'react-router-dom';
import CustomFooter from './components/CustomFooter';
import CustomHeader from './components/CustomHeader';
import { Link } from 'react-router-dom';
import ListUserComponent from './components/ListUserComponent';
import ListMoviesComponent from './components/ListMoviesComponent';
import AddUserComponet from './components/AddUserComponent';
import AddMovieComponet from './components/AddMovieComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/Registercomponent';
import ViewMovieComponet from './components/ViewMovieComponent';
import FavMovieComponent from './components/favouritescomponent';
import FavListComponent from './components/ListFavComponent';
import RecoComponent from './components/RecoComponent';
function App() {
  return (
    <div >
      <BrowserRouter>
      <CustomHeader></CustomHeader>
      <div classname="container">
        <Routes>
            <Route  path = "/" element={<LoginComponent/>}></Route>
            <Route path = "/users" element={<ListUserComponent/>}></Route>
            <Route path = "/add-User" element={<AddUserComponet/>}></Route>
            <Route path = "/edit-user/:id" element={<AddUserComponet/>}></Route>
            <Route path = "/movies" element={<ListMoviesComponent/>}></Route>
            <Route path = "/favmovie" element={<FavMovieComponent/>}></Route>
            <Route path = "/favmovies" element={<FavListComponent/>}></Route>          
            <Route path = "/add-Movie" element={<AddMovieComponet/>}></Route>
            <Route path = "/edit-movie/:id" element={<AddMovieComponet/>}></Route>
            <Route path = "/view-movie/:id" element={<ViewMovieComponet/>}></Route>
            <Route path = "/login" element={<LoginComponent/>}></Route>
            <Route path = "/register" element={<RegisterComponent/>}></Route>
        </Routes>
      </div>
      <CustomFooter></CustomFooter>
      </BrowserRouter>
    </div>
  );
}
export default App;
