import { testimonials } from '../data/testimonials';

// Simule une latence réseau
const fakeNetworkDelay = (delay = 500) => new Promise(res => setTimeout(res, delay));

// --- API pour les Témoignages ---
export const getTestimonials = async () => {
  await fakeNetworkDelay();
  return testimonials;
}; 