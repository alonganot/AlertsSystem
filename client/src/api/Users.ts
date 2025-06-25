import { appConfig } from "../appConfig";

export const addUser = async (userId: string) => {
  const response = await fetch(`${appConfig.SERVER_URL}/users/?user_id=${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  });

  return response.json();
}