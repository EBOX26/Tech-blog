const editFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#title").value.trim();
  const content = document.querySelector("#content").value.trim();
  const postId = window.location.pathname.split("/").pop();

  try {
    const response = await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post_id: postId, title, content }),
    });

    if (response.ok) {
      document.location.replace("/dashboard/");
    } else {
      throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred while updating the post.");
  }
};

document.querySelector("#update").addEventListener("click", editFormHandler);
