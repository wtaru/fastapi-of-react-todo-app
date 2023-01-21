import { useEffect } from 'react';
import axios from "axios";
import { CsrfToken } from './types/types';
import { useAppSelector } from './app/hooks';
import { selectCsrfState } from './slices/appSlice';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth } from './components/Auth';
import { Todo } from './components/Todo';


function App() {
  // Reduxのstateを読みに行く
  const csrf = useAppSelector(selectCsrfState)
  // getでcsrf_tokenを取得しaxiosのdefaultヘッダーに設定
  useEffect(() => {
    const getCrsfToken = async () => {
      const res = await axios.get<CsrfToken>(
        `${process.env.REACT_APP_FASTAPI_URL}/csrftoken`
      );
      axios.defaults.headers.common["X-CSRF-Token"] = res.data.csrf_token
      // console.log(res.data.csrf_token)
    }
    getCrsfToken()
  }, [csrf])
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Auth/>}/>
        <Route path='/todo' element={<Todo/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
