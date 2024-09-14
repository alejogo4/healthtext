export interface DataRows {
    id: number;
    name?: string;
    nit?: string;
    country?: string;
    details: {
      city?: string;
      country?: string;
    };
  }
  
  
  export const fakeData: DataRows[] = [
    {
      id: 1,
      name: 'Empresa Alpha',
      nit: '900123456-1',
      country: 'Colombia',
      details: {
        city: 'Bogotá',
        country: 'Colombia',
      },
    },
    {
      id: 2,
      name: 'Tech Innovators S.A.',
      nit: '800987654-2',
      country: 'Argentina',
      details: {
        city: 'Buenos Aires',
        country: 'Argentina',
      },
    },
    {
      id: 3,
      name: 'Global Solutions LLC',
      nit: '300123789-3',
      country: 'México',
      details: {
        city: 'Ciudad de México',
        country: 'México',
      },
    },
    {
      id: 4,
      name: 'Estrategias Financieras Ltda.',
      nit: '950321654-4',
      country: 'Chile',
      details: {
        city: 'Santiago',
        country: 'Chile',
      },
    },
    {
      id: 5,
      name: 'InnovaTech Corp.',
      nit: '750654321-5',
      country: 'Perú',
      details: {
        city: 'Lima',
        country: 'Perú',
      },
    },
  ];