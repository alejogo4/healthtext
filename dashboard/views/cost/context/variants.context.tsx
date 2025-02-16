'use client'

import { formSchema } from '@/views/client/schema/formCreate';
import { zodResolver } from '@hookform/resolvers/zod';
import { createContext, ReactNode, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';



export interface ContactInfo {
  name_contact: string;
  extension: string;
  phone: string;
  mobile: string;
  email_contact: string;
  alternate_email: string;
  job_title: string;
}

export interface FormType {
  person_type_id: { value: string; label: string };
  document_type_id: { value: string; label: string };
  document_number: string;
  name: string;
  payment_currency: { value: string };
  country: { value: string; label: string };
  department: { value: string; label: string };
  city: { value: string; label: string };
  neighborhood: string;
  postal_code: string;
  full_address: string;
  email: string;
  where_authorize: { value: string };
  way_to_meet_them: { value: string };
  profession_specialty: string;
  authorizes_receive_information: boolean;
  date_birth: 'string';
  contact_info: ContactInfo[];
}

interface VariantsState {
  user: string | null;
  theme: 'light' | 'dark';
}

interface VariantsContextProps {
  state: VariantsState;
  updateState: (newState: Partial<VariantsState>) => void;
}

const VariantsContext = createContext<VariantsContextProps | undefined>(undefined);

export const useVariantsContext = (): VariantsContextProps => {
  const context = useContext(VariantsContext);
  if (!context) {
    throw new Error('useVariantsContext debe ser usado dentro de VariantsProvider');
  }
  return context;
};

export const VariantsProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<VariantsState>({
    user: null,
    theme: 'light'
  });

  const onSubmit = async (data: any) => {
    // const response = await createClient(mapFormToClientCreate(data));
    // handleNext();
    // toast({
    //   title: response?.message
    // });
  };


  const form = useForm<FormType>({ resolver: zodResolver(formSchema) });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    ...formMethods
  } = form;

  const typePerson = watch('document_type_id');
  const accept_information = watch('authorizes_receive_information');

  const { control } = form;


  const errorMessages = Object.keys(errors).map(key => {
    const fieldError = errors[key as keyof typeof errors];
    return <p key={key}>{fieldError?.message}</p>;
  });

  const updateState = (newState: Partial<VariantsState>) => {
    setState(prevState => ({ ...prevState, ...newState }));
  };

  return (
    <VariantsContext.Provider value={{ state, updateState }}>
      {children}
    </VariantsContext.Provider>
  );
};
