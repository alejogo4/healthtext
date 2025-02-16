import CostCreate from "./components/costCreate/CostCreate";

export interface IMetadataProps {
  params?: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function PhotosVariantPage({
  params,
  searchParams
}: IMetadataProps) {
  return <CostCreate id={params?.id ?? ''} />;
}
