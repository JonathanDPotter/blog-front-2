import { render, screen } from "@testing-library/react";
import Header from "../components/Header";
import { Provider } from "react-redux";
import { store } from "../store";
import { BrowserRouter } from "react-router-dom";
import { FC } from "react";
import loggedInStore from "../store/testStore/loggedinStore";

const ProviderRouter = (props: any) => {
  return (
    <Provider store={props.testStore}>
      <BrowserRouter>{props.children}</BrowserRouter>
    </Provider>
  );
};

describe("Header for guest user", () => {
  const HeaderSetup: FC = () => {
    return (
      <ProviderRouter testStore={store}>
        <Header />
      </ProviderRouter>
    );
  };

  describe("given the header has rendered properly", () => {
    it("should show the title", () => {
      render(<HeaderSetup />);
      expect(screen.getByRole("heading")).toBeInTheDocument();
    });
  });

  describe("given the nav links are rendered", () => {
    it("should show the nav links", () => {
      render(<HeaderSetup />);

      expect(screen.getByText(/Home/)).toBeInTheDocument();
      expect(screen.getByText(/Log In/)).toBeInTheDocument();
    });
  });
});

describe("header for logged in user", () => {
  const HeaderSetup: FC = () => {
    return (
      <ProviderRouter testStore={loggedInStore}>
        <Header />
      </ProviderRouter>
    );
  };

  describe("given the links are displayed correctly", () => {
    it("should show Log Out, Make a Post and My Posts", async () => {
      render(<HeaderSetup />);

      expect(screen.getByRole("heading")).toBeInTheDocument();

      expect(await screen.findByText(/Home/)).toBeInTheDocument();
      expect(await screen.findByText(/Log Out/)).toBeInTheDocument();
      expect(await screen.findByText(/Make a Post/)).toBeInTheDocument();
      expect(await screen.findByText(/My Posts/)).toBeInTheDocument();
    });
  });
});
