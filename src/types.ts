export type PageRoute =
  | '/'
  | '/story'
  | '/menu'
  | '/experience'
  | '/gallery'
  | '/reservations'
  | '/contact';

export type MenuCategory =
  | 'All Courses'
  | 'Amuse & Starters'
  | 'Mains'
  | 'Tasting Menu'
  | 'Desserts'
  | 'Wine & Pairings';

export type DietaryLabel =
  | 'Vegetarian'
  | 'Vegan'
  | 'Gluten-Free'
  | 'Dairy-Free';

export interface MenuItem {
  id: string;
  name: string;
  category: Exclude<MenuCategory, 'All Courses'>;
  price: number;
  description: string;
  dietary: DietaryLabel[];
  signature?: boolean;
  pairing?: string;
  allergens?: string;
  image: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export type GalleryCategory =
  | 'All'
  | 'Culinary Art'
  | 'Interiors'
  | 'Private Dining'
  | 'Wine Cellar';

export interface GalleryItem {
  id: string;
  title: string;
  category: Exclude<GalleryCategory, 'All'>;
  image: string;
  caption: string;
  detail: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  tenure: string;
  bio: string;
  philosophy: string;
  image?: string;
}

export interface ExperienceSpace {
  id: string;
  name: string;
  capacity: string;
  setting: string;
  description: string;
  highlights: string[];
  image: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  occasion: string;
}

export interface ReservationFormState {
  date: string;
  time: string;
  guests: number;
  seating: 'Main Dining Room' | 'Chef’s Hearth Counter' | 'Wine Cellar Table' | 'Garden Conservatory';
  occasion: string;
  dietaryNotes: string;
  fullName: string;
  email: string;
  phone: string;
}

export interface ReservationConfirmation extends ReservationFormState {
  referenceCode: string;
  createdAt: string;
}
