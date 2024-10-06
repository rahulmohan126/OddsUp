import { checkUsernameAvailable, createUser, getGroups, getInfo, loginUser, registerUser } from "../services/user";
import { OUResponse, resError, resSuccess, User } from "../util/models";

export async function temp() {
  return null;
}

export async function signUp(req: {email: string, username: string, password: string}): Promise<OUResponse> {
  let res = await checkUsernameAvailable(req.username);
  if (!res) {
    return resError("Username taken");
  }

  const userId = await registerUser(req.email, req.password);
  if (!userId) {
    return resError("Error registering user");
  }
  
  res = await createUser(userId, req.username);
  if (!res) {
    return resError("Error creating user profile")
  }

  return resSuccess(userId);
}

export async function login(req: {email: string, password: string}): Promise<OUResponse> {
  let res = await loginUser(req.email, req.password);
  if (!res) {
    return resError("Incorrect email/password combo");
  }

  return resSuccess(res);
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

  const user = {
    ...info,
    groups
  } as User

  return resSuccess(user);
}