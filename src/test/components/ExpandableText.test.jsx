// src/test/components/Navbar.test.jsx
import React from "react";
import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import ExpandableText from "../../components/ExpandableText";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";

describe("ExpandableText", () => {
  const limit = 255;
  const longText = "a".repeat(limit + 1);
  const truncatedText = longText.substring(0, limit) + "...";

  //   it("Should render all text if less than 255 chars", () => {
  //     const shortText =
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, sunt?";

  //     render(<ExpandableText text={shortText} />);

  //     const result = screen.getByText(shortText);
  //     expect(result).toBeInTheDocument();
  //   });

  //   it("Should truncate text if longer than 255 chars", () => {
  //     render(<ExpandableText text={longText} />);

  //     expect(screen.getByText(truncatedText)).toBeInTheDocument();

  //     const button = screen.getByRole("button");

  //     expect(button).toHaveTextContent(/more/i);
  //   });

  //   it("Should expand text when show more button is clicked", async () => {
  //     render(<ExpandableText text={longText} />);
  //       const showMoreButton = screen.getByRole("button", { name: /more/i });

  //     const user = userEvent.setup();
  //     await user.click(showMoreButton);

  //     expect(screen.getByText(longText)).toBeInTheDocument();
  //   });

  it("Should collapse text when button is clicked", async () => {
    render(<ExpandableText text={longText} />);

    const button = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(button);
    await user.click(button);

    expect(screen.getByText(truncatedText)).toBeInTheDocument();

          expect(button).toHaveTextContent(/more/i);

  });
});
