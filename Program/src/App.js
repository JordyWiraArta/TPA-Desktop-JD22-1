import logo from './logo.svg';
import './index.css';
import Regis from './Pages/Regis';
import Home from './Pages/Home';
import Login from './Pages/Login';
import React from 'react';
import Header from './Pages/Header.jsx';
import CreateWorkspaceForm from './Pages/CreateWorkspaceForm.jsx';
import WorkspaceDetail from './Pages/WorkspaceDetail';
import HeaderLogged from './Pages/HeaderLoged.jsx';
import AccRej from './Pages/AccRej.jsx';
import InviteMember from './Pages/InviteMember';
import CreateBoard from './Pages/CreateBoard';
import BoardDetail from './Pages/BoardDetail';
import MyWo from './Component/myWo';
import { AuthProvider} from './js/Auth';
import { Route, Routes} from 'react-router-dom';
// import { GetWorkspaceProvider } from './js/WorkspaceController'

function App() {

  return (

    <AuthProvider>
      {/* <GetWorkspaceProvider> */}

        <Routes>

          <Route path="/" element={
          <React.Fragment>
            <Header/>
            <Home/>
          </React.Fragment>
          } />

          <Route path="/registration/:acc" element={<Regis />} />
          
          <Route path="/login/:acc" element={<Login />} />
          
          <Route path="/home" element={
            <React.Fragment>
              <HeaderLogged/>
            </React.Fragment>
          }/>
        
          <Route path="/home/createworkspace" element={<CreateWorkspaceForm/> }/>

          <Route path="/home/workspacedetail/:id" element={<WorkspaceDetail/>}/>
          <Route path="/createboard/:id" element={<CreateBoard/>}/>
          <Route path="/home/invite/:id" element={<InviteMember/>}/>
          <Route path="/invitationlink/:id" element={<AccRej/>}/>
          <Route path="/boarddetail/:workspaceId/:boardId" element={<BoardDetail/>}/>

          <Route path="/choose/:id" element={<MyWo/>}/>
        </Routes>

      {/* </GetWorkspaceProvider> */}
      
    </AuthProvider>
  );
}

export default App;
