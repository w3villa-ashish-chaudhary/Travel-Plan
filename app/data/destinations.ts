export interface Destination {
  id: string
  name: string
  country: string
  description: string
  image: string
  highlights: string[]
  avgTemp: string
  bestSeason: string
  currency: string
  language: string
  rating: number
}

export const destinations: Destination[] = [
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    description:
      'The City of Light dazzles with iconic landmarks, world-class cuisine, and unmatched romance. Stroll along the Seine, visit the Louvre, and savour fresh croissants at a sidewalk café.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80',
    highlights: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame', 'Montmartre'],
    avgTemp: '12°C',
    bestSeason: 'Spring & Fall',
    currency: 'EUR',
    language: 'French',
    rating: 4.8,
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    description:
      'A mesmerizing blend of ultra-modern technology and ancient traditions. Explore neon-lit streets, serene temples, and savour the freshest sushi on the planet.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80',
    highlights: ['Shibuya Crossing', 'Senso-ji Temple', 'Tsukiji Market', 'Akihabara'],
    avgTemp: '16°C',
    bestSeason: 'Spring (Cherry Blossom)',
    currency: 'JPY',
    language: 'Japanese',
    rating: 4.9,
  },
  {
    id: 'new-york',
    name: 'New York',
    country: 'United States',
    description:
      'The city that never sleeps offers Broadway shows, Central Park strolls, world-class museums, and a food scene that spans every cuisine imaginable.',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80',
    highlights: ['Statue of Liberty', 'Central Park', 'Times Square', 'Brooklyn Bridge'],
    avgTemp: '13°C',
    bestSeason: 'Fall',
    currency: 'USD',
    language: 'English',
    rating: 4.7,
  },
  {
    id: 'rome',
    name: 'Rome',
    country: 'Italy',
    description:
      'The Eternal City where ancient ruins meet vibrant street life. Toss a coin in the Trevi Fountain, marvel at the Colosseum, and feast on authentic Italian pasta.',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80',
    highlights: ['Colosseum', 'Vatican City', 'Trevi Fountain', 'Pantheon'],
    avgTemp: '16°C',
    bestSeason: 'Spring & Fall',
    currency: 'EUR',
    language: 'Italian',
    rating: 4.8,
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    description:
      'A tropical paradise of terraced rice paddies, ancient temples, pristine beaches, and warm hospitality. Perfect for adventure seekers and relaxation lovers alike.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80',
    highlights: ['Ubud Rice Terraces', 'Tanah Lot', 'Seminyak Beach', 'Mount Batur'],
    avgTemp: '27°C',
    bestSeason: 'Apr – Oct (Dry)',
    currency: 'IDR',
    language: 'Indonesian',
    rating: 4.7,
  },
  {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    description:
      'A global hub of history, culture, and innovation. From Buckingham Palace to Camden Market, London has something for every traveller.',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80',
    highlights: ['Big Ben', 'Tower of London', 'British Museum', 'Hyde Park'],
    avgTemp: '11°C',
    bestSeason: 'Summer',
    currency: 'GBP',
    language: 'English',
    rating: 4.6,
  },
  {
    id: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    description:
      'Sun-kissed beaches, Gaudí\u2019s architectural masterpieces, and a lively nightlife scene. Barcelona is where art, culture, and Mediterranean vibes collide.',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&q=80',
    highlights: ['Sagrada Família', 'Park Güell', 'La Rambla', 'Gothic Quarter'],
    avgTemp: '18°C',
    bestSeason: 'Late Spring & Early Fall',
    currency: 'EUR',
    language: 'Spanish / Catalan',
    rating: 4.7,
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'UAE',
    description:
      "A futuristic desert metropolis featuring the world's tallest building, luxury shopping, golden sand dunes, and extraordinary culinary experiences.",
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80',
    highlights: ['Burj Khalifa', 'Dubai Mall', 'Palm Jumeirah', 'Desert Safari'],
    avgTemp: '28°C',
    bestSeason: 'Nov – Mar (Cooler)',
    currency: 'AED',
    language: 'Arabic / English',
    rating: 4.6,
  },
  {
    id: 'sydney',
    name: 'Sydney',
    country: 'Australia',
    description:
      'A harbour city known for its stunning Opera House, golden beaches, and laid-back lifestyle. Great food, surf culture, and endless sunshine await.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&q=80',
    highlights: ['Sydney Opera House', 'Bondi Beach', 'Harbour Bridge', 'Darling Harbour'],
    avgTemp: '18°C',
    bestSeason: 'Sep – Nov (Spring)',
    currency: 'AUD',
    language: 'English',
    rating: 4.7,
  },
  {
    id: 'cape-town',
    name: 'Cape Town',
    country: 'South Africa',
    description:
      'Where mountains meet the ocean. Table Mountain, vibrant neighbourhoods, world-renowned vineyards, and incredible wildlife make Cape Town unforgettable.',
    image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&q=80',
    highlights: ['Table Mountain', 'V&A Waterfront', 'Cape of Good Hope', 'Robben Island'],
    avgTemp: '17°C',
    bestSeason: 'Nov – Mar (Summer)',
    currency: 'ZAR',
    language: 'English / Afrikaans',
    rating: 4.6,
  },
  {
    id: 'istanbul',
    name: 'Istanbul',
    country: 'Turkey',
    description:
      'Straddling two continents, Istanbul is a treasure trove of grand mosques, bustling bazaars, and a food culture that will leave you spellbound.',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80',
    highlights: ['Hagia Sophia', 'Grand Bazaar', 'Blue Mosque', 'Bosphorus Cruise'],
    avgTemp: '14°C',
    bestSeason: 'Spring & Fall',
    currency: 'TRY',
    language: 'Turkish',
    rating: 4.7,
  },
  {
    id: 'rio-de-janeiro',
    name: 'Rio de Janeiro',
    country: 'Brazil',
    description:
      'Samba rhythms, golden beaches, and the iconic Christ the Redeemer define this vibrant city. Rio pulses with energy, colour, and joy.',
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&q=80',
    highlights: ['Christ the Redeemer', 'Copacabana Beach', 'Sugarloaf Mountain', 'Carnival'],
    avgTemp: '24°C',
    bestSeason: 'Dec – Mar (Summer)',
    currency: 'BRL',
    language: 'Portuguese',
    rating: 4.5,
  },
]
