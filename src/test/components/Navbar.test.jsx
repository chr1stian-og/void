// src/test/components/Navbar.test.jsx
import React from "react";
import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Navbar from "../../components/Navbar";
import "@testing-library/jest-dom/vitest";

describe("Navbar", () => {
  it("Should render the username when it is provided", () => {
    render(<Navbar userLogged="Crazyy shit goin on" />);

    //gets all elements with the role of "heading".
    const headings = screen.getAllByRole("heading");

    // filters these elements to find the one with the specific text content.
    const heading = headings.find((h) =>
      h.textContent.match(/Crazyy shit goin on/i)
    );

    expect(heading).toBeInTheDocument();
  });

  it("Should render login when it is provided", () => {
    render(<Navbar userLogged="" />);

    //gets all elements with the role of "heading".
    const headings = screen.getAllByRole("heading");

    // filters these elements to find the one with the specific text content.
    const heading = headings.find((h) => h.textContent.match(/login/i));

    expect(heading).toBeInTheDocument();
  });
});
