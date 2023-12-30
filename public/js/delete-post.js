const deleteFormHandler = async (event) => {
  event.preventDefault();

  const postId = window.location.pathname.split("/").pop();

  try {
    const response = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post_id: postId }),
    });

    if (response.ok) {
      document.location.replace("/dashboard/");
    } else {
      throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred while deleting the post.");
  }
};

document.querySelector("#delete").addEventListener("click", deleteFormHandler);
