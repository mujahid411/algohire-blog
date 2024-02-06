import './App.css';
import { Route,Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import MainPage from './components/MainPage';
import WriteBlog from './components/WriteBlog';
import CreateBlog from './components/CreateBlog';
import SingleBlog from './components/SingleBlog';
import Landing from './components/Landing';
import MyBlogs from './components/MyBlogs';
import EditBlog from './components/EditBlog';

function App() {

  return (
   <Routes>
    <Route path='/' element={<Landing/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/main' element={<MainPage/>}/>
    <Route path='/writeblog' element={<CreateBlog/>}/>
    <Route path='/singleblog/:id' element={<SingleBlog/>}/>
    <Route path='/editblog/:id' element={<EditBlog/>}/>
    <Route path='/myblog' element={<MyBlogs/>}/>
   </Routes>
  );
}

export default App;
