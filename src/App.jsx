import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GoogleLogin from './components/GoogleLogin';
import SuccessLogin from './components/SuccessLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GoogleLogin />} />
        <Route path="/success-login" element={<SuccessLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
