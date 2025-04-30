export interface Company {
    id: number;
    name: string;
    city: string;
    website: string;
    email: string;
    linkedin: string;
    latitude: number;
    longitude: number;
  }

export type CompanyFormData = Omit<Company, 'id' | 'latitude' | 'longitude'> & {
  latitude: string;
  longitude: string;
};