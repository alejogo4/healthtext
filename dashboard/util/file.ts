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

const extractExtensionFromBase64 = (base64String: string): string | null => {
  const match = base64String.match(/^data:image\/([a-zA-Z0-9+]+);base64,/);
  return match ? match[1] : null;
};

const toBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};


export { convertFileToBase64, removeFileExtension, getImage, extractExtensionFromBase64, toBase64};
