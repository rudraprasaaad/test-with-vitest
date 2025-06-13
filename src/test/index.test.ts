import {describe, expect, it} from "vitest"
import request from "supertest"
import { app } from ".."

describe("POST /sum", () => {
  it("should return the sum of two numbers", async () => {
    const res = await request(app).post("/sum").send({
      a : 1,
      b : 2
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(3);
  })

  it("should return the sum of two numbers", async () => {
    const res = await request(app).post("/sum").send({
      a : 4,
      b : 5
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(9);
  })

  it("should return the sum of two numbers", async () => {
    const res = await request(app).post("/sum").send({
      a : -3,
      b : -1
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(-4);
  })

  it("should return the sum of two numbers", async () => {
    const res = await request(app).post("/sum").send({
      a : -3,
      b : 1
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(-2);
  })

   it("should return the sum of two numbers", async () => {
    const res = await request(app).post("/sum").send({
      a : ["asdfasdf"],
    });
    expect(res.statusCode).toBe(411);
    expect(res.body.message).toBe("Incorrect inputs");
  })
})