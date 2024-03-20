import Nav from './components/Nav.jsx';
import Home from './screens/RegisterLoginPage.jsx';
import { Routes, Route } from 'react-router-dom';
import './App.css';




function App() {
  return (
    <div className="App">
    <Nav />
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
    </div>
  );
}

export default App;
