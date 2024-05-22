// src/test/components/Navbar.test.jsx
import React from "react";
import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import TermsAndConditions from "../../components/TermsAndConditions";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";

describe("TermsAndConditions", () => {
  const renderComponent = () => {
    render(<TermsAndConditions />);

    return {
      heading: screen.getByRole("heading"),
      checkbox: screen.getByRole("checkbox"),
      button: screen.getByRole("button"),
    };
  };
//   git it("Should render the component with correct text and initial state", () => {
//     const { heading, checkbox, button } = renderComponent();

//     expect(heading).toHaveTextContent(/Terms & conditions/i);
//     expect(checkbox).not.toBeChecked();
//     expect(button).toBeDisabled();
//   });

  it("Should enable the button on the checkbox is checked", async () => {
    const { checkbox, button } = renderComponent();

    const user = userEvent.setup();
    await user.click(checkbox);

    expect(button).toBeEnabled();
  });
});
