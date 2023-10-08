import * as infractionsRepository from "../../src/infractions-repository";
import * as userRepository from "../../src/users-repository";
import { getInfractionsFrom } from "../../src/infractions-service";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Order Service Tests", () => {
  it("should get infractions from user", async () => {
    jest.spyOn(userRepository, "getUserByDocument").mockImplementationOnce((): any => {
      return {
        id: 1,
        firstName: "Fake",
        lastName: "User",
        licenseId: "12345678"
      };
    });

    jest.spyOn(userRepository, "getUser").mockImplementationOnce((): any => {
      return {
        id: 1,
        firstName: "Fake",
        lastName: "User",
        licenseId: "12345678"
      };
    });

    const infractionsMock = jest.spyOn(infractionsRepository, "getInfractionsFrom");
    infractionsMock.mockImplementationOnce((userId: number): any => {
      return [
        {
          id: 1,
          date: new Date().toString(),
          description: "Fake Description",
          cost: 9999,
          level: "SEVERE",
          userId: 1
        }
      ]
    });

    const userInfractions = await getInfractionsFrom("12345678");
    expect(userInfractions).toMatchObject({
      id: 1,
      firstName: "Fake",
      lastName: "User",
      licenseId: "12345678"
    });

    const { infractions } = userInfractions;
    expect(infractions).toHaveLength(1);
    expect(infractions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          date: expect.any(String),
          description: expect.any(String),
          cost: expect.any(Number),
          level: expect.any(String)
        })
      ])
    );
  });

  it("should throw an error when driver license does not exists", () => {
    const usersMock = jest.spyOn(userRepository, "getUserByDocument").mockImplementation((): any => {
      return undefined;
    });

    const userInfractions = getInfractionsFrom("invalid");
    expect(usersMock).toBeCalledTimes(1);
    expect(userInfractions).rejects.toEqual({
      type: "NOT_FOUND",
      message: "Driver not found."
    });
  })
});