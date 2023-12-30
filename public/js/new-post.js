const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value.trim();
  const content = document.querySelector("#content").value.trim();

  try {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred while creating a new post.");
  }
};

document.querySelector("#new-post-form").addEventListener("submit", newFormHandler);
