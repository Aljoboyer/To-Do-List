import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './Pages/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Yourlist from './Pages/AllTodolist/Yourlist'
import Completelist from './Pages/Completelist/Completelist';
import Addatask from './Pages/AddaTask/Addatask';
function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}>
             <Route path="/" element={<Addatask/>}/>
            <Route path="/yourlist" element={<Yourlist/>}/>
            <Route path="/completelist" element={<Completelist/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
