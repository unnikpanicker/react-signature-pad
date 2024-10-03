import React from "react";
import { render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import SignaturePad from "../src/components/SignaturePad";

test("renders signature pad and allows drawing", () => {
  const { getByRole } = render(<SignaturePad height={300} width={400}/>);
  const canvas = getByRole("img");

  expect(canvas).toBeInTheDocument();
  fireEvent.mouseDown(canvas);
  fireEvent.mouseMove(canvas, { clientX: 50, clientY: 50 });
  fireEvent.mouseUp(canvas);
});
