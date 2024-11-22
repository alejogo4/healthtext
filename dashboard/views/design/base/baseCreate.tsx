import BaseCreate from "./components/baseCreate/baseCreate";
import { fetchCategoriesBase } from "./services/categoriesBase";

export interface IMetadataProps {
  params?: {};
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function BaseCreatePage({
  params,
  searchParams
}: IMetadataProps) {

  const base_categories = await fetchCategoriesBase()


  return <BaseCreate base_categories={base_categories}/>;
}
