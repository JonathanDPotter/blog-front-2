import { act, render, screen } from "@testing-library/react";
import Footer from "../components/Footer";
import { BrowserRouter } from "react-router-dom";

describe("Footer", () => {
  describe("given the footer has rendered properly", () => {
    it("should show the title and nav", () => {
      render(
        <BrowserRouter>
          <Footer />
        </BrowserRouter>
      );
      expect(screen.getByText("2022 Jonathan Potter")).toBeInTheDocument();
      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });
  });
  describe("given the nav links are rendered", () => {
    it("should react to navigation changes", () => {
      render(
        <BrowserRouter>
          <Footer />
        </BrowserRouter>
      );

      const aboutLink = screen.getByText("About");
      const contactLink = screen.getByText("Contact");

      expect(aboutLink.className).toMatch(/(?!active)/);
      expect(contactLink.className).toMatch(/(?!active)/);

      // simulates clicking the link
      act(() => contactLink.click());

      expect(aboutLink.className).toMatch(/(?!active)/);
      expect(contactLink.className).toMatch(/active/);
    });
  });
});
