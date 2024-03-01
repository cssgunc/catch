import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";
import NavBar from "./components/Navbar/NavBar";
import Footer from "./pages/Footer";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Footer />
    </div>
  );
}

export default App;
