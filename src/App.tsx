import Navbar from "./components/Navbar";
import { AboutPage } from "./page/about/AboutPage";
import "./App.css";

function App() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </header>

      <main className="pt-16">
        <AboutPage />
      </main>
    </>
  );
}

export default App;
