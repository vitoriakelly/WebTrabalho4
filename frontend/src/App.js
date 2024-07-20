/* eslint-disable react/jsx-no-undef */
import { Route, Routes} from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Singup';
import TaskCategory from './components/TaskCategory';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/my-list" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<TaskCategory />} />

      </Routes>
    </div>
  );
}

export default App;
