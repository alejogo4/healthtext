const convertFileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });

function removeFileExtension(filename: string): string {
  // Encuentra la última posición del punto y corta el nombre hasta ahí
  const lastDotIndex = filename.lastIndexOf('.');
  return lastDotIndex !== -1 ? filename.slice(0, lastDotIndex) : filename;
}

function getImage(fileUrl: string):string{
  return `${process.env.NEXT_PUBLIC_SITE_URL}${fileUrl}`
}

export { convertFileToBase64, removeFileExtension, getImage};
