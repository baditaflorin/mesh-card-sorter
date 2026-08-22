export default async function scenario(a, b) {
  await a.getByLabel("New card").fill("Make the welcome warmer");
  await a.getByRole("button", { name: "Add card" }).click();
  await a.waitForTimeout(800);
  await b.getByLabel("New card").fill("Try a five minute round");
  await b.getByRole("button", { name: "Add card" }).click();
  await b.waitForTimeout(900);
  await a.getByRole("button", { name: "Flip card" }).first().click();
  await b.waitForTimeout(1800);
}
