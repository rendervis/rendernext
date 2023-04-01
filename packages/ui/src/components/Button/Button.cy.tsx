import {Button} from "./Button";

describe("ButtonFooter", () => {
  it("should", () => {
    cy.mount(<Button/>);
    cy.contains("hello");
  });
});
