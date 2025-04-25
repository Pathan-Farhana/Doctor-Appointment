export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  availability: string[];
  image: string;
  location: string;
  experience: number;
  education: string;
  acceptingNewPatients: boolean;
  fee?: number;
  consultationType: 'Video' | 'In-clinic';
}