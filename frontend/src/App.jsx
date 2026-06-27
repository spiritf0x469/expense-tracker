import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Expenses from "./pages/Expenses"
import ProtectedRoute from "./components/ProtectedRoute"
import Home from "./pages/Home"
function App() {
  return(
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>}/>
          <Route path="/expenses" element={<Expenses/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
