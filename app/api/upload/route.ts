import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configura Cloudinary con las variables de entorno
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  try {
    // Convertir el archivo a un buffer
    const buffer = await file.arrayBuffer();
    const base64File = Buffer.from(buffer).toString('base64');

    // Subir la imagen a Cloudinary
    const result = await cloudinary.uploader.upload(`data:${file.type};base64,${base64File}`, {
      folder: 'products', // Carpeta en Cloudinary
    });

    // Devolver la URL de la imagen
    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
  }
}