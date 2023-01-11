import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";
import { BrowserRouter } from "react-router-dom";

describe("Footer", () => {
  describe("given the footer has rendered properly", () => {
    it("should show the credits", () => {
      render(
        <BrowserRouter>
          <Footer />
        </BrowserRouter>
      );
      expect(screen.getByText("2023 Jonathan Potter")).toBeInTheDocument();
    });
  });
});
