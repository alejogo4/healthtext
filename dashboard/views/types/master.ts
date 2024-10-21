export interface Master {
  id: string;
  name: string;
  destination?: string;
  created_at: string;
  updated_at: string;
}


export interface ColorXSupplier {
  id: string;
  name: string;
  supplier?: string;
  type?: string;
  color?: string;
  created_at: string;
  updated_at: string;
}


export interface ClothXSupplier {
  id: string;
  name: string;
  supplier?: string;
  category?: string;
  color?: string;
  created_at: string;
  updated_at: string;
}
