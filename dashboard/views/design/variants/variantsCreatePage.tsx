import { listBase } from '../base/services/crudBase';
import VariantCreate from './components/variantCreate/variantCreate';
import { VariantsProvider } from './context/variants.context';

export interface IMetadataProps {
  params?: {};
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function BaseCreatePage({
  params,
  searchParams
}: IMetadataProps) {
  const bases =  await listBase();

  return (
    <VariantsProvider>
      <VariantCreate documentTypes={[]} personTypes={[]} countries={[]} bases={bases} />
    </VariantsProvider>
  );
}
