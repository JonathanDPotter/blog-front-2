import { act, render, screen } from "@testing-library/react";
import Header from "../components/Header";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store";
import { FC } from "react";

const HeaderSetup: FC = () => {
return (
  <Provider store={store}>
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  </Provider>
);
}

describe("Header", () => {
  describe("given the header has rendered properly", () => {
    it("should show the title and nav", () => {
      render(
        <HeaderSetup/>
      );
      expect(screen.getByRole("heading")).toBeInTheDocument();
    });
  });
  describe("given the nav links are rendered", () => {
    it("should react to navigation changes", () => {
      render(<HeaderSetup />);

      const homeLink = screen.getByText("Home");
      const loginLink = screen.getByText("Log In");

      // simulates clicking the link
      act(() => loginLink.click());

      expect(homeLink.className).toMatch(/(?!active)/);
      expect(loginLink.className).toMatch(/active/);
    });
  });
});
