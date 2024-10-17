import { convertToDDMMYYYY } from "@/util/date";
import { FormType } from "../client/components/clientCreate/clientCreate";

export interface ClientCreate {
  person_type_id: number;
  document_type_id: number;
  document_number: number;
  name: string;
  country: string;
  department: string;
  city: string;
  neighborhood: string;
  postal_code: string;
  full_address: string;
  profession_specialty: string;
  authorizes_receive_information: boolean;
  where_authorize: string;
  way_to_meet_them: string;
  payment_currency: string;
  date_birth: string;
  email: string;
  cellphone: string;
  contact_info: ContactInfo[];
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


export const mapFormToClientCreate = (formData: FormType): ClientCreate => {
  const {
    document_type_id,
    document_number,
    name,
    payment_currency,
    country,
    department,
    city,
    neighborhood,
    postal_code,
    full_address,
    profession_specialty,
    authorizes_receive_information,
    where_authorize,
    way_to_meet_them,
    email,
    date_birth,
    person_type_id,
    contact_info: contactList,
  } = formData;

  // Mapear la información de contacto a la estructura de ClientCreate
  const contact_info = contactList.map((contact) => ({
    name: contact.name_contact,
    ext: contact.extension,
    phone: contact.phone,
    cellphone: contact.mobile,
    mail: contact.email_contact,
    alternate_mail: contact.alternate_email,
    job_title: contact.job_title,
  }));

  
  return {
    person_type_id: Number(person_type_id.value),
    document_type_id: Number(document_type_id.value), 
    document_number: Number(document_number),
    name,
    country: country.label,
    department: department.label,
    city: city.label ,
    neighborhood,
    postal_code,
    full_address,
    profession_specialty,
    authorizes_receive_information,
    where_authorize: where_authorize?.value, 
    way_to_meet_them: way_to_meet_them?.value, 
    payment_currency: payment_currency?.value, 
    date_birth:convertToDDMMYYYY(date_birth) , 
    email,
    cellphone: contactList[0]?.mobile || "",
    contact_info,
  };
};