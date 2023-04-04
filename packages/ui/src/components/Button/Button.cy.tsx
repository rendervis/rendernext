import {Button} from "./Button";

describe("Button", () => {
  it("should", () => {
    const kind='primary';
    cy.mount(
    <Button kind={kind} onClick={cy.stub().as('click')}>hello</Button>);
    cy.getByCy(`button-action-${kind}`).click();
    cy.get("@click").should("be.called");
  });
});
