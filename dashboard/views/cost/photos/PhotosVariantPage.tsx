import PhotosVariantCreate from "./components/PhotosVariantCreate";

export interface IMetadataProps {
  params?: {id:string};
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function PhotosVariantPage({
  params,
  searchParams
}: IMetadataProps) {


  return <PhotosVariantCreate id={params?.id ?? ''}/>;
}
