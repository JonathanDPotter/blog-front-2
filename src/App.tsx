import { BrowserRouter } from "react-router-dom";
import Router from "./components/Router";
import Footer from "./components/Footer";
import Header from "./components/Header";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <main>
          <Router />
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
