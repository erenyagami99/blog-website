export function registerUser(reqBody) {
  return fetch("http://localhost:5000/register", {
    method: "POST",
    body: JSON.stringify(reqBody),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(function (response) {
    return response.json();
  });
}

export function loginUser(reqBody) {
  return fetch("http://localhost:5000/login", {
    method: "POST",
    body: JSON.stringify(reqBody),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(function (response) {
    return response.json();
  });
}

export const currentUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data from the API");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
