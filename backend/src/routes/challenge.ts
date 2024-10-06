import { Request, Response } from "express"

import * as controller from "../controllers/challenge"

const router = require('express').Router()

router.post('/getInfo', async (req: Request, res: Response) => {
  res.json(await controller.temp());
});

router.post('/create', async (req: Request, res: Response) => {
  res.json(await controller.temp());
});

router.post('/payout', async (req: Request, res: Response) => {
  res.json(await controller.temp());
});

module.exports = router;