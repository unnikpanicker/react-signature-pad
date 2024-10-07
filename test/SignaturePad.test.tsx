import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignaturePad from "../src/components/SignaturePad";

test("renders signature pad and allows drawing", () => {
  const { getByRole } = render(<SignaturePad height={300} width={400} />);
  const canvas = getByRole("img");

  expect(canvas).toBeInTheDocument();
  fireEvent.mouseDown(canvas);
  fireEvent.mouseMove(canvas, { clientX: 50, clientY: 50 });
  fireEvent.mouseUp(canvas);
});

test("renders SignaturePad with default props", () => {
  const { getByRole } = render(<SignaturePad />);

  const canvas = getByRole("img");
  expect(canvas).toBeInTheDocument();
  expect(canvas).toHaveStyle({
    width: "300px",
    height: "150px",
    background: "white",
  });
});

test("renders SignaturePad with light theme", () => {
  const { getByRole } = render(<SignaturePad theme="light" />);

  const canvas = getByRole("img");
  expect(canvas).toHaveStyle({ background: "white" });
});

test("renders SignaturePad with dark theme", () => {
  const { getByRole } = render(<SignaturePad theme="dark" />);

  const canvas = getByRole("img");
  expect(canvas).toHaveStyle({ background: "black" });
});

test("renders SignaturePad with custom dimensions", () => {
  const { getByRole } = render(<SignaturePad width={500} height={300} />);

  const canvas = getByRole("img");
  expect(canvas).toHaveStyle({ width: "500px", height: "300px" });
});

test("downloads signature with black pen color", () => {
  const { getByRole } = render(<SignaturePad theme="light" download={true} />);
  const canvas = getByRole("img") as unknown as HTMLCanvasElement;

  fireEvent.mouseDown(canvas);
  fireEvent.mouseMove(canvas, { clientX: 50, clientY: 50 });
  fireEvent.mouseUp(canvas);

  const downloadButton = getByRole("icon-download");
  downloadButton.click();

  const ctx = canvas.getContext("2d");
  expect(canvas.toDataURL).toHaveBeenCalled();
});
