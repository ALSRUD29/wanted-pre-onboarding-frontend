import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Todo from './Pages/Todo';
function App() {
  const isLogin = localStorage.getItem('access_token');
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isLogin ? <Navigate to="/todo" /> : <Login />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/todo"
          element={isLogin ? <Todo /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
