import ClientCreate from './components/clientCreate/clientCreate';
import { fetchDocumentTypes } from './../services/documentTypes';
import { fetchPersonTypes } from './../services/personType';

export interface IMetadataProps {
  params?: {};
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function ProductDetailPage({
  params,
  searchParams
}: IMetadataProps) {
  const documentTypes = await fetchDocumentTypes();
  const personTypes = await fetchPersonTypes();

  return <ClientCreate documentTypes={documentTypes} personTypes={personTypes} />;
}
