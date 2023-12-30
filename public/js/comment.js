const commentFormHandler = async (event) => {
  event.preventDefault();

  const commentContent = document.querySelector("#comment").value.trim();
  const postId = window.location.pathname.split("/").pop();

  if (commentContent) {
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post_id: postId, comment_content: commentContent }),
      });

      if (response.ok) {
        document.location.reload();
      } else {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting the comment.");
    }
  }
};

document.querySelector("#comment-form").addEventListener("submit", commentFormHandler);
