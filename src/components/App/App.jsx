import { Link, Route, Routes } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";
import "./App.css";
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'
import { useSelector } from "react-redux";
import { selectToken } from "../../redux/auth/selectors";
function App() {
  const isThereToken = useSelector(selectToken)

  return <>
  <h1>App</h1>
  {  
  isThereToken ? <LoginForm/> : <RegistrationForm/>
  }
  
  </>;
}

export default App;
