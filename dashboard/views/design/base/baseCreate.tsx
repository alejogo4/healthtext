import BaseCreate from "./components/baseCreate/baseCreate";

export interface IMetadataProps {
  params?: {};
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function BaseCreatePage({
  params,
  searchParams
}: IMetadataProps) {


  return <BaseCreate/>;
}
