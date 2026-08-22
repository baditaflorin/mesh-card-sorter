import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { createMockRoom } from "@baditaflorin/mesh-common/testing";
import { Feature } from "../../src/Feature";
import { config } from "../../src/config";

describe("Feature (component)", () => {
  it("renders the app name when connected", () => {
    const room = createMockRoom();
    render(<Feature room={room} config={config} />);
    expect(screen.getByRole("heading", { name: config.appName })).toBeInTheDocument();
    expect(screen.getByText("0 shared cards")).toBeInTheDocument();
  });

  it("shows a connecting state when room is null", () => {
    render(<Feature room={null} config={config} />);
    expect(screen.getByRole("button", { name: "Add card" })).toBeDisabled();
  });

  it("adds and flips a shared card", () => {
    render(<Feature room={createMockRoom()} config={config} />);
    fireEvent.change(screen.getByLabelText("New card"), { target: { value: "Try a new format" } });
    fireEvent.click(screen.getByRole("button", { name: "Add card" }));
    expect(screen.getByText("Hidden until flipped")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Flip card" }));
    expect(screen.getByText("Try a new format")).toBeInTheDocument();
  });
});
