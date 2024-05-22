import { it, expect, describe } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import UserList from "../../components/UserList";
import "@testing-library/jest-dom/vitest";

describe("UserList", () => {
    
  it("Should render no users if array is empty", () => {
    const users = [];
    render(<UserList users={users} />);

    expect(screen.getByText(/no users/i)).toBeInTheDocument();
  });

  it("Should render a list of users if there are users on array", () => {
    const users = [
      { id: 0, name: "Christian" },
      { id: 1, name: "Daniel" },
      { id: 2, name: "Monteiro" },
      { id: 3, name: "MacArthur" },
    ];
    render(<UserList users={users} />);

    users.forEach(user => {
        const link = screen.getByRole('link', {name: user.name})
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', `/users/${user.id}`)
    })
  });
});
