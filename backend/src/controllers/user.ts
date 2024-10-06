import { checkUsernameAvailable, createUser, getGroups, getInfo, loginUser, registerUser } from "../services/user";
import { OUResponse, resError, resSuccess, User, UserBasic } from "../util/models";
import { LoginReq, SignInReq, GetUserReq } from "../util/reqBody";

export async function signUp(req: SignInReq): Promise<OUResponse> {
  const isAvailable = await checkUsernameAvailable(req.username);
  if (!isAvailable) {
    return resError("Error: Username taken");
  }

  const res = await registerUser(req.email, req.password);
  if (!res) {
    return resError("Error: Failed to authenticate user");
  }

  const created = await createUser(res.userId, req.username);
  if (!created) {
    return resError("Error: You already have an account");
  }

  return resSuccess({ id: res.userId, username: req.username } as UserBasic);
}

export async function login(req: LoginReq): Promise<OUResponse> {
  const res = await loginUser(req.email, req.password);
  if (!res) {
    return resError("Incorrect email/password combo");
  }

  const userInfo = await getInfo(res.userId);
  if (!userInfo) {
    return resError("Failed to get user info");
  }

  return resSuccess(userInfo as UserBasic);
}

export async function getAllUserInfo(req: GetUserReq): Promise<OUResponse> {
  let info = await getInfo(req.userId);
  if (!info) {
    return resError("Failed to retrieve user info");
  }

  let groups = await getGroups(req.userId);
  if (!groups) {
    return resError("Failed to retrieve user's groups");
  }

  return resSuccess({ ...info, groups } as User);
}

export async function getBasicUserInfo(req: GetUserReq): Promise<OUResponse> {
  let info = await getInfo(req.userId);
  if (!info) {
    return resError("Failed to retrieve user info");
  }

  return resSuccess(info);
}