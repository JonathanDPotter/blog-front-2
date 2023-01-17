import { render, screen, act, fireEvent } from "@testing-library/react";
import Footer from "../components/Footer";
import { MemoryRouter, useLocation } from "react-router-dom";

export const LocationDisplay = () => {
  const location = useLocation();
  return (
    <div data-testid="location-display" title={location.pathname}>
      {location.pathname}
    </div>
  );
};

const TestFooter = () => {
  return (
    <MemoryRouter initialEntries={["/"]}>
      <Footer />
      <LocationDisplay />
    </MemoryRouter>
  );
};

describe("Footer", () => {
  describe("given the footer has rendered properly", () => {
    it("should show the credits", () => {
      render(<TestFooter />);
      expect(screen.getByText(/2023 Jonathan Potter/)).toBeInTheDocument();
    });

    it("should show the About link", () => {
      render(<TestFooter />);

      const aboutLink = screen.getByRole("link");

      expect(aboutLink).toBe(screen.getByText(/About/));
      expect(aboutLink).toHaveAttribute("href");
      expect(aboutLink.getAttribute("href")).toEqual("/about");
    });
  });
});
