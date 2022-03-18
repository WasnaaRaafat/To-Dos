import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Update from './component/Update';
import Home from './component/Home';
import NotFound from './component/NotFound';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/Home' element={<Home />} />
          <Route exact path='/Update' element={<Update />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
