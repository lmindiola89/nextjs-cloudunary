"use client";

import { useState } from "react";

function HomePage() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const formData = new FormData();
          formData.append("image", file);

          const res = await fetch("api/upload", {
            method: "POST",
            body: formData,
          });
          const data = await res.json();
          console.log(data.url);
          setImageUrl(data.url);
        }}
      >
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <button>Enviar</button>
      </form>
      {imageUrl && <img src={imageUrl} alt="" />}
    </div>
  );
}

export default HomePage;
