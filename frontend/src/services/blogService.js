export function createBlog(reqBody) {
  return fetch("http://localhost:5000/create-blog", {
    method: "POST",
    body: JSON.stringify(reqBody),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(function (response) {
    return response.text;
  });
}

export function updateBlog(reqBody, id) {
  return fetch(`http://localhost:5000/update-blog/${id}`, {
    method: "PATCH",
    body: JSON.stringify(reqBody),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(function (response) {
    return response.text;
  });
}

export function deleteBlog(id) {
  return fetch(`http://localhost:5000/delete-blog/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(function (response) {
    return response.text;
  });
}

export const getBlogs = async () => {
  try {
    const response = await fetch("http://localhost:5000/get-blogs");
    if (!response.ok) {
      throw new Error("Failed to fetch data from the API");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
