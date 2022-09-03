import { Routes, Route } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import Compiler from './components/Compiler/Compiler';
import LandingPage from './components/LandingPage/LandingPage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/compiler' element={<Compiler />} />
      </Routes>
      
      <Toaster position='top-center' reverseOrder={true} toastOptions={{
        style: {
          fontSize: '2rem'
        }
      }} />
    </>
  )
}

export default App;