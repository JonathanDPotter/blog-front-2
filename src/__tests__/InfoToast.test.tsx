import {
  act,
  render,
  screen,
} from "@testing-library/react";
import InfoToast from "../components/InfoToast";
import { FC, useEffect, useState } from "react";

interface Props {
  title: string;
  message: string;
}

const ToastWrapper: FC<Props> = (props) => {
  const [toast, setToast] = useState<{
    title: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    setToast(props);
  }, [props]);

  return !!toast ? (
    <InfoToast
      show={!!toast}
      message={toast?.message}
      title={toast?.title}
      setShow={setToast}
    />
  ) : (
    <></>
  );
};

describe("InfoToast component", () => {
  describe("when provided a message and title", () => {
    it("should display them correctly", async () => {
      render(<ToastWrapper title="title" message="message" />);
      
      expect(await screen.findByText("title")).toBeInTheDocument();
      expect(await screen.findByText("message")).toBeInTheDocument();
    });
    
    it("should close after 3000ms", async () => {
      jest.useFakeTimers();
      render(<ToastWrapper title="title" message="message" />);

      expect(await screen.findByText("title")).toBeInTheDocument();
      expect(await screen.findByText("message")).toBeInTheDocument();

      act(() => jest.advanceTimersByTime(3000));

      expect(screen.queryByText("title")).toBe(null);
      expect(screen.queryByText("message")).toBe(null);
    });
  });

  it("should close when the button is clicked", async () => {
    render(<ToastWrapper title="title" message="message" />);

    expect(await screen.findByText("title")).toBeInTheDocument();
    expect(await screen.findByText("message")).toBeInTheDocument();

    act(() => screen.getByRole("button").click());

    expect(screen.queryByText("title")).toBe(null);
    expect(screen.queryByText("message")).toBe(null);
  });
});
