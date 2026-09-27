const AUTH_SERVICE_URL =
  process.env.NEXT_PUBLIC_AUTH_SERVICE_URL ?? "http://localhost:4000";

type AuthResponse = {
  message: string;
  token?: string;
  user?: {
    id: string;
    username: string;
  };
};

export async function login(username: string, password: string) {
  const response = await fetch(`${AUTH_SERVICE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  const data = (await response.json()) as AuthResponse;

  if (!response.ok) {
    throw new Error(data.message || "Login gagal.");
  }

  return data;
}

export async function register(username: string, password: string) {
  const response = await fetch(`${AUTH_SERVICE_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  const data = (await response.json()) as AuthResponse;

  if (!response.ok) {
    throw new Error(data.message || "Sign up gagal.");
  }

  return data;
}

export async function verify(token: string) {
  const response = await fetch(`${AUTH_SERVICE_URL}/api/auth/verify`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Session tidak valid.");
  }

  return response.json();
}
