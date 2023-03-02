import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from './components/NavBar';

import withFontSizeWrapper from './components/withFontSizeWrapper';


function App() {
  
  
  return (
    <div className="App" >
     
         <NavBar />

      
   

    </div>
  );
}

export default withFontSizeWrapper(App);
