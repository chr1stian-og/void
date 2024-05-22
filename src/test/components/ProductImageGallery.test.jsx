// src/test/components/User.test.js
import React from "react";
import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductImageGallery from "../../components/ProductImageGallery";
import "@testing-library/jest-dom/vitest";

describe("ProductImageGallery", () => {
    
  it("Should not render if the array string is empty", () => {
    const imageUrls = [];

    const { container } = render(<ProductImageGallery imageUrls={imageUrls} />);

    expect(container).toBeEmptyDOMElement();
  });


  it("Should render the images", () => {
    const imageUrls = [
      "dsadasodasd",
      "dasodkaskdas",
      "dsakdakdoadadsa",
      "dsadiasdadsadsd",
    ];

    render(<ProductImageGallery imageUrls={imageUrls} />);

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(images.length);
    imageUrls.forEach((url, index) => {
      expect(images[index]).toHaveAttribute("src", url);
    });
  });
});
