import express from "express";
import { z } from "zod";
import { prismaClient } from "./db";

export const app = express();

app.use(express.json());

const sumInput = z.object({
	a : z.number(), 
	b : z.number()
})

app.post("/sum", async (req, res) => {
	const parsedResponse = sumInput.safeParse(req.body);
	if(!parsedResponse.success) {
		res.status(411).json({
			message : "Incorrect inputs"
		})
		return;
	}

	const answer = parsedResponse.data.a + parsedResponse.data?.b;

	await prismaClient.sum.create({
		data : {
			a : parsedResponse.data.a,
			b : parsedResponse.data.b,
			result : answer,
		}
	})

	res.status(200).json({
		answer
	})
})

app.post("/multiply", async (req, res) => {
	const parsedResponse = sumInput.safeParse(req.body);
	if(!parsedResponse.success) {
		res.status(411).json({
			message : "Incorrect inputs"
		})
		return;
	}

	const answer = parsedResponse.data.a * parsedResponse.data?.b;

	await prismaClient.sum.create({
		data : {
			a : parsedResponse.data.a,
			b : parsedResponse.data.b,
			result : answer,
		}
	})

	res.status(200).json({
		answer
	})
})
