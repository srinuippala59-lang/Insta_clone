export const API_URL = "https://dummyjson.com/auth/login";

export async function loginUser(username, password) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, expiresInMins: 30 }),
  });

  const data = await response.json();

  // Wrong credentials: the API replies with an error status and a message
  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data; // contains the user details and the token
}
