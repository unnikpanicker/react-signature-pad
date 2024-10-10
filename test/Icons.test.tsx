import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Icons from "../src/components/Icons";

test("renders clear icon", () => {
  const { getByRole } = render(<Icons iconType="clear" />);
  const iconClear = getByRole("ic-clear");
  expect(iconClear).toBeInTheDocument();
});

test("renders clear icon with fill color", () => {
  const { getByRole } = render(<Icons iconType="clear" fillColor="red" />);
  const iconClear = getByRole("ic-clear");
  expect(iconClear).toBeInTheDocument();
});

test("renders save icon", () => {
  const { getByRole } = render(<Icons iconType="save" />);
  const iconSave = getByRole("ic-save");
  expect(iconSave).toBeInTheDocument();
});

test("renders save icon with fill color", () => {
  const { getByRole } = render(<Icons iconType="save" fillColor="red" />);
  const iconSave = getByRole("ic-save");
  expect(iconSave).toBeInTheDocument();
});

test("renders download icon", () => {
  const { getByRole } = render(<Icons iconType="download" />);
  const iconDownload = getByRole("ic-download");
  expect(iconDownload).toBeInTheDocument();
});

test("renders download icon with fill color", () => {
  const { getByRole } = render(<Icons iconType="download" fillColor="red" />);
  const iconDownload = getByRole("ic-download");
  expect(iconDownload).toBeInTheDocument();
});
