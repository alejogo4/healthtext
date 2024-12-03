import CategoryBaseList from "./components/categoryBase/categoryBaseList";
import { fetchCategoriesBase } from "./services/categoriesBase";


export interface IMetadataProps {
  params?: {};
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function CategoryBase({
  params,
  searchParams
}: IMetadataProps) {
   const categoriesBase = await fetchCategoriesBase();
  return <CategoryBaseList categoriesBase={categoriesBase}/>;
}
