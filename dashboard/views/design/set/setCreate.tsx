import SetCreate from './components/setCreate/setCreate';
import { fetchVariantsCategory } from './services/categoriesBase';

export interface IMetadataProps {
  params?: {};
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function SetCreatePage({
  params,
  searchParams
}: IMetadataProps) {
  const shirts = await fetchVariantsCategory('1');
  const pants = await fetchVariantsCategory('2');

  return <SetCreate shirts={shirts} pants={pants} />;
}
