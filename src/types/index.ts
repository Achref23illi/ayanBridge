export interface Product {
  id: string;
  name: string;
  creator: string;
  price: number;
  imageUrl: string;
  description: string;
  category: string;
  rating: number;
  reviews: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  testimonial: string;
}

export type UserRole = 'student' | 'teacher' | 'content_creator' | 'investor' | 'entrepreneur';

export interface UserRoleOption {
  id: UserRole;
  title: string;
  description: string;
  icon: string;
  benefits: string[];
} 