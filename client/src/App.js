import Nav from './components/Nav.jsx';
import Home from './screens/Home.jsx';
import { Routes, Route } from 'react-router-dom';
import './App.css';




function App() {
  return (
    <div className="App">
    <Nav />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<Users />} />
    </Routes>
    </div>
  );
}

export default App;
