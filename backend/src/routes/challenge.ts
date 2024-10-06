import { Request, Response } from "express"
import * as controller from "../controllers/challenge"

const router = require('express').Router();

router.post('/create', async (req: Request, res: Response) => {
  res.json(await controller.createChallenge(req.body));
});

router.post('/makeSelection', async (req: Request, res: Response) => {
  res.json(await controller.makeSelection(req.body));
});

router.post('/getInfo', async (req: Request, res: Response) => {
  res.json(await controller.getAllInfo(req.body));
});

router.post('/payout', async (req: Request, res: Response) => {
  res.json(await controller.payout(req.body));
});

module.exports = router;