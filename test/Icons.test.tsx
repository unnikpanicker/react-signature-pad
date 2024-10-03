import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Icons from "../src/components/Icons";

test("renders clear icon", () => {
  const { getByRole } = render(<Icons iconType="clear" />);
  const iconClear = getByRole("icon-clear");
  expect(iconClear).toBeInTheDocument();
});

test("renders clear icon with fill color", () => {
  const { getByRole } = render(<Icons iconType="clear" fillColor="red" />);
  const iconClear = getByRole("icon-clear");
  expect(iconClear).toBeInTheDocument();
});

test("renders copy icon", () => {
  const { getByRole } = render(<Icons iconType="copy" />);
  const iconCopy = getByRole("icon-copy");
  expect(iconCopy).toBeInTheDocument();
});

test("renders copy icon with fill color", () => {
  const { getByRole } = render(<Icons iconType="copy" fillColor="red" />);
  const iconCopy = getByRole("icon-copy");
  expect(iconCopy).toBeInTheDocument();
});

test("renders download icon", () => {
  const { getByRole } = render(<Icons iconType="download" />);
  const iconDownload = getByRole("icon-download");
  expect(iconDownload).toBeInTheDocument();
});

test("renders download icon with fill color", () => {
  const { getByRole } = render(<Icons iconType="download" fillColor="red" />);
  const iconDownload = getByRole("icon-download");
  expect(iconDownload).toBeInTheDocument();
});
