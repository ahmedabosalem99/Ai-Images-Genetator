const api = SECRET;
const inp = document.getElementById("inp");
const images = document.querySelector(".images");

document
  .getElementsByTagName("button")[0]
  .addEventListener("click", async () => {
    // make a request to OpenAI API
    const methods = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${api}`,
      },
      body: JSON.stringify({
        prompt: inp.value,
        n: 3,
        size: "256x256",
      }),
    };

    try {
      const res = await fetch(
        "https://api.openai.com/v1/images/generations",
        methods
      );
      const data = await res.json();

      if (!res.ok) {
        console.error("Error:", res.status, res.statusText, data);
        return;
      }

      //console.log(data);
      const listImages = data.data;
      images.innerHTML = "";
      listImages.map((photo) => {
        const container = document.createElement("div");
        images.append(container);
        const img = document.createElement("img");
        container.append(img);
        img.src = photo.url;
      });
    } catch (error) {
      console.error("Fetch error:", error);
    }
  });
