import Navbar from "./components/Navbar";
import { AboutPage } from "./page/about/AboutPage";
import bgImage from "./assets/bgimage.jpg";
import "./App.css";

function App() {
  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <Navbar />
      </header>

      <main className="pt-16">
        <AboutPage />
      </main>
    </>
  );
}

export default App;
