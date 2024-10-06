import { Request, Response } from "express"

import * as controller from "../controllers/group"
const router = require('express').Router()

router.post('/create', async (req: Request, res: Response) => {
  res.json(await controller.createGroup(req.body));
});

router.post('/getInfo', async (req: Request, res: Response) => {
  res.json(await controller.getAllGroupInfo(req.body));
});

router.post('/join', async (req: Request, res: Response) => {
  res.json(await controller.joinFromCode(req.body));
});

module.exports = router;