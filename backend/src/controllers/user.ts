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

  const userId = await registerUser(req.email, req.password);
  if (!userId) {
    return resError("Error registering user");
  }
  
  const created = await createUser(userId, req.username);
  if (!created) {
    return resError("Error creating user profile");
  }

  return resSuccess({ id: userId, username: req.username });
}

export async function login(req: {email: string, password: string}): Promise<OUResponse> {
  const userId = await loginUser(req.email, req.password);
  if (!userId) {
    return resError("Incorrect email/password combo");
  }

  const userInfo = await getInfo(userId);
  if (!userInfo) {
    return resError("Failed to get user info");
  }

  return resSuccess(userInfo);
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