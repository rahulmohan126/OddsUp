import { Request, Response } from "express"

import * as controller from "../controllers/user"
const router = require('express').Router()

router.post('/signup', async (req: Request, res: Response) => {
  res.json(await controller.signUp(req.body));
});

router.post('/login', async (req: Request, res: Response) => {
  res.json(await controller.login(req.body));
});

router.post('/getInfo', async (req: Request, res: Response) => {
  res.json(await controller.getAllUserInfo(req.body));
});

module.exports = router;
