import { describe, it, expect } from "vitest";
import { waLink, serviceMessage, BUSINESS } from "./business";

describe("enquiry links", () => {
  it("uses the international WhatsApp number", () => {
    expect(waLink("hi")).toBe("https://wa.me/917517855177?text=hi");
  });
  it("names the selected service in the message", () => {
    expect(serviceMessage("Bedroom Interiors")).toContain("Bedroom Interiors");
  });
  it("calls the studio phone", () => {
    expect(BUSINESS.phoneTel).toBe("+917517855177");
  });
});
