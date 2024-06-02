import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dhoujyhxk",
  api_key: "615535318484878",
  api_secret: "cVBiZ5W_BaAb1ZBNF60Ana_UsDg",
});

export async function POST(request) {
  const data = await request.formData();
  const image = data.get("image");

  if (!image) {
    return NextResponse.json("no se ha subido ninguna imagen", { status: 400 });
  }

  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // const filePath = path.join(process.cwd(), "public", image.name);
  // writeFile(filePath, buffer);
  // const response = await cloudinary.uploader.upload(filePath);
  // console.log(response);

  const response = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({}, (err, resutl) => {
        if (err) {
          reject(err);
        }
        resolve(resutl);
      })
      .end(buffer);
  });

  console.log(response);

  return NextResponse.json({
    message: "imagen subida",
    url: response.secure_url,
  });
}
