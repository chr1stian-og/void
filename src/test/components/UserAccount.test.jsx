// src/test/components/User.test.js
import React from "react";
import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import UserAccount from "../../components/UserAccount";
import "@testing-library/jest-dom/vitest";

describe("UserAccount", () => {
  it("Should render the user's name if provided", () => {
    render(<UserAccount user={{ id: 1, name: "Christian", isAdmin: false }} />);

    expect(screen.getByText(/Christian/i)).toBeInTheDocument();
  });

  it("Should not render the edit button if user is not admin", () => {
    render(<UserAccount user={{ name: "Christian", isAdmin: false }} />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("Should render the edit button if user is admin", () => {
    render(<UserAccount user={{ id: 1, name: "Christian", isAdmin: true }} />);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/edit/i);
  });
});
