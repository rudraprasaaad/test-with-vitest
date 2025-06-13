import {describe, expect, it, vi} from "vitest"
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
    vi.mock("../db", () => {
      return {
        prismaClient: {
          sum: {
            create: vi.fn()
          }
        }
      }
    })

    describe("POST /sum", () => {
      it("should return the sum of two numbers", async () => {
        const res = await request(app).post("/sum").send({
          a: 1,
          b: 2
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(3);
      })

      it("should return the sum of two numbers with zero", async () => {
        const res = await request(app).post("/sum").send({
          a: 0,
          b: 0
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(0);
      })

      it("should reject when passing strings", async () => {
        const res = await request(app).post("/sum").send({
          a: "1",
          b: "2"
        });
        expect(res.statusCode).toBe(411);
        expect(res.body.message).toBe("Incorrect inputs");
      })

      it("should reject when missing parameters", async () => {
        const res = await request(app).post("/sum").send({
          a: 1
        });
        expect(res.statusCode).toBe(411);
        expect(res.body.message).toBe("Incorrect inputs");
      })
    })
  })
})