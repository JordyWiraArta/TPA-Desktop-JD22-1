import logo from './logo.svg';
import './index.css';
import Regis from './Pages/Regis';
import Home from './Pages/Home';
import Login from './Pages/Login';
import React from 'react';
import Header from './Pages/Header.jsx';
import CreateWorkspaceForm from './Pages/CreateWorkspaceForm.jsx';
import HeaderLogged from './Pages/HeaderLoged.jsx';
import { AuthProvider} from './js/Auth';
import { Route, Routes} from 'react-router-dom';
import { GetWorkspaceProvider } from './js/WorkspaceController'

function App() {

  return (

    <AuthProvider>
      <GetWorkspaceProvider>

        <Routes>

          <Route path="/" element={
          <React.Fragment>
            <Header/>
            <Home/>
          </React.Fragment>
          } />

          <Route path="/registration" element={<Regis />} />
          
          <Route path="/login" element={<Login />} />
          
          <Route path="/home" element={
            <React.Fragment>
              <HeaderLogged/>
              <Home/>
            </React.Fragment>
          }/>
        
          <Route path="/home/createworkspace" element={<CreateWorkspaceForm/> }/>

        </Routes>

      </GetWorkspaceProvider>
      
    </AuthProvider>
  );
}

export default App;
