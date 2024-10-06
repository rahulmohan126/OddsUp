import { checkUsernameAvailable, createUser, getGroups, getInfo, loginUser, registerUser } from "../services/user";
import { OUResponse, resError, resSuccess, User, UserBasic } from "../util/models";

export async function temp() {
  return null;
}

export async function signUp(req: {email: string, username: string, password: string}): Promise<OUResponse> {
  const isAvailable = await checkUsernameAvailable(req.username);
  if (!isAvailable) {
    return resError("Username taken");
  }

  const res = await registerUser(req.email, req.password);
  if (!res) {
    return resError("Error registering user");
  }
  
  const created = await createUser(res.userId, req.username);
  if (!created) {
    return resError("Error creating user profile");
  }

  return resSuccess({ id: res.userId, username: req.username, token: res.accessToken });
}

export async function login(req: {email: string, password: string}): Promise<OUResponse> {
  const res = await loginUser(req.email, req.password);
  if (!res) {
    return resError("Incorrect email/password combo");
  }

  const userInfo = await getInfo(res.userId);
  if (!userInfo) {
    return resError("Failed to get user info");
  }

  return resSuccess({ ...userInfo, accessToken: res.accessToken });
}

export async function getAllUserInfo(req: { userId: string }): Promise<OUResponse> {
  let info = await getInfo(req.userId);
  if (!info) {
    return resError("Failed to retrieve user info");
  }

  let groups = await getGroups(req.userId);
  if (!groups) {
    return resError("Failed to retrieve user's groups");
  }

  return resSuccess({ ...info, groups });
}