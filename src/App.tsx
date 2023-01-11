import { BrowserRouter } from "react-router-dom";
import Router from "./components/Router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <main className="bg-text-light">
          <Container>
            <Router />
          </Container>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
