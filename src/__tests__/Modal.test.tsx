import { FC, useEffect, useState } from "react";
import Modal from "../components/Modal";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

interface Props {
  title: string;
  heading: string;
  body: string;
}

const TestModal: FC<Props> = ({ title, heading, body }) => {
  const [showModal, setShowModal] = useState(false);
  const [confirmation, setConfirmation] = useState("no");

  const Confirmation: FC<{ confirmation: string }> = ({ confirmation }) => {
    return <p>{confirmation}</p>;
  };

  const confirm = () => {
    setConfirmation("yes");
  };

  useEffect(() => {
    confirmation === "yes" && setShowModal(false);
  }, [confirmation]);

  return (
    <>
      <button
        type="button"
        data-testid="open"
        onClick={() => setShowModal(true)}
      >
        Open Modal
      </button>
      {showModal ? (
        <Modal
          {...{ title, heading, body, confirm }}
          show={showModal}
          onHide={() => setShowModal(false)}
        />
      ) : null}
      <Confirmation confirmation={confirmation} />
    </>
  );
};

describe("Modal", () => {
  it("should not be shown until button is pressed", () => {
    render(<TestModal title="title" heading="heading" body="body" />);

    expect(screen.queryByText(/title/)).toBe(null);

    fireEvent.click(screen.getByTestId("open"));

    expect(screen.queryByText(/title/)).toBeInTheDocument();
  });

  it("should not be shown after confirmation and confirm function fires", async () => {
    render(<TestModal title="title" heading="heading" body="body" />);

    fireEvent.click(screen.getByTestId("open"));

    expect(screen.getByText(/title/)).toBeInTheDocument();
    expect(screen.getByText(/no/)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Confirm/));

    expect(screen.getByText(/yes/)).toBeInTheDocument();
    expect(screen.queryByText(/title/)).toBe(null);
  });

  it("should not be shown after cancel button is pressed", () => {
    render(<TestModal title="title" heading="heading" body="body" />);

    fireEvent.click(screen.getByTestId("open"));

    expect(screen.getByText(/title/)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Cancel/));

    expect(screen.getByText(/no/)).toBeInTheDocument();
    expect(screen.queryByText(/title/)).toBe(null);
  });
});
