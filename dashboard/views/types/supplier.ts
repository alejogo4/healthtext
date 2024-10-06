export interface SupplierCreate {
  person_type_id: string;
  document_type_id: string;
  document_number: string;
  name: string;
  country: string;
  department: string;
  city: string;
  neighborhood: string;
  postal_code: string;
  full_address: string;
  registered_simple_tax_regime: boolean;
  big_contributor: boolean;
  vat_responsible: boolean;
  reteiva_not_registered_simple_regimen: boolean;
  reteiva_registered_simple_regimen: boolean;
  cause_retefuente_for_income_tax: boolean;
  cause_retefuente_for_ica: boolean;
  tax_regime: string;
  type_account: string;
  account_number: string;
  bank: string;
  payment_option: string;
  invoice_deadline: string;
  type_service: string[];
  type_third_parties: string[];
  attachment: Attachment[];
  is_self_retaining: boolean;
  nationality: string;
  url_website: string;
  url_facebook: string;
  url_twitter: string;
  contact_info: ContactInfo[];
}

export interface Attachment {
  name: string;
  extension: string;
  fileBase64: string;
}

export interface ContactInfo {
  name: string;
  ext: string;
  phone: string;
  cellphone: string;
  mail: string;
  alternate_mail: string;
  job_title: string;
}

export const mapToSupplierCreate = (supplierData: any): SupplierCreate => {
  return {
    person_type_id: supplierData.person_type_id.value,
    document_type_id: supplierData.document_type_id.value,
    document_number: supplierData.document_number,
    name: supplierData.name,
    country: supplierData.country,
    department: supplierData.department,
    city: supplierData.city,
    neighborhood: supplierData.neighborhood,
    postal_code: supplierData.postal_code,
    full_address: supplierData.full_address,
    registered_simple_tax_regime: supplierData.registered_simple_tax_regime?? false,
    big_contributor: supplierData.big_contributor ?? false,
    vat_responsible: supplierData.vat_responsible ?? false,
    reteiva_not_registered_simple_regimen:
      supplierData.reteiva_not_registered_simple_regimen ?? false,
    reteiva_registered_simple_regimen:
      supplierData.reteiva_registered_simple_regimen ?? false,
    cause_retefuente_for_income_tax:
      supplierData.cause_retefuente_for_income_tax ?? false,
    cause_retefuente_for_ica: supplierData.cause_retefuente_for_ica ?? false,
    tax_regime: supplierData.tax_regime ?? false,
    is_self_retaining: supplierData.is_self_retaining ?? false,
    type_account: supplierData.type_account.value,
    account_number: supplierData.account_number,
    bank: supplierData.bank,
    payment_option: supplierData.payment_option.value,
    invoice_deadline: supplierData.invoice_deadline.value,
    type_service: supplierData.type_service.map(
      (service: any) => service.value
    ),
    type_third_parties: ['no idea'],
    attachment: supplierData?.attached_documents,
    nationality: supplierData.country,
    url_website: supplierData.url_website,
    url_facebook: supplierData.url_facebook,
    url_twitter: supplierData.url_twitter,
    contact_info: supplierData.contact_info.map((contact: any) => ({
      name: contact.name_contact,
      ext: contact.extension,
      phone: contact.phone,
      cellphone: contact.mobile,
      mail: contact.email,
      alternate_mail: contact.alternate_email,
      job_title: contact.position
    }))
  };
};
