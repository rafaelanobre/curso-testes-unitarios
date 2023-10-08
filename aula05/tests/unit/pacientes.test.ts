import { generateProtocolForPacient } from "protocols-generator";

jest.mock("uuid", ()=>{
  return {
    v4: () => {return "mock"}
  }
})

describe("calculator tests", () => {
  it("should work", async () => {
    expect(true).toBe(true);
  });

  it("generate protocol test", ()=>{
    const name = "Rafaela";
    const lastName = "Nobre";
    const {priority, date, pacient, protocol} = generateProtocolForPacient(name, lastName, false);

    expect(priority).toBe(false);
    expect(date).toEqual(expect.any(Date));
    expect(pacient).toBe(`${name} ${lastName}`);
    expect(protocol).toBe("mock");
  })
});