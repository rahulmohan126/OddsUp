import { Request, Response } from "express"

import * as controller from "../controllers/group"
const router = require('express').Router()

router.post('/algo', async (req: Request, res: Response) => {
  res.json(await controller.temp());
});

router.post('/users', async (req: Request, res: Response) => {
  res.json(await controller.temp());
});

module.exports = router;