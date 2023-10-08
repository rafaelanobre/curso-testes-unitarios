import { faker } from "@faker-js/faker";

import { createOrder, getOrderByProtocol } from "../../src/order-service";
import * as orderRepository from "../../src/order-repository";
import { OrderInput } from "../../src/validator";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Order Service Tests", () => {
  it("should create an order", async () => {
    jest.spyOn(orderRepository, "create").mockImplementation((): any => {return true});
    
    const order = {
      client: "Rafaela",
      description: "Açaí"
    }
    await createOrder(order);

    expect(orderRepository.create).toBeCalled();
  });

  it("should return an order based on the protocol", async () => {
    jest.spyOn(orderRepository, "getByProtocol").mockImplementationOnce((): any =>{
      return {
        protocol: "test",
        status: "IN_PREPARATION"
      }
    })

    const {protocol, status} = await getOrderByProtocol("test");
    expect(protocol).toBe("test");
    expect(status).toBe("IN_PREPARATION");
    expect(orderRepository.getByProtocol).toBeCalled();
  });

  it("should return status INVALID when protocol doesn't exists", async () => {
    jest.spyOn(orderRepository, "getByProtocol").mockImplementationOnce((): any =>{
      return undefined
    })

    const {protocol, status} = await getOrderByProtocol("errortest");
    expect(protocol).toBe("errortest");
    expect(status).toBe("INVALID");
    expect(orderRepository.getByProtocol).toBeCalled();
  });
});