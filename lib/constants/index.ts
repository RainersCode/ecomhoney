export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Prostore';
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  'A modern ecommerce store built with Next.js';
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
export const LATEST_PRODUCTS_LIMIT =
  Number(process.env.LATEST_PRODUCTS_LIMIT) || 4;

export const signInDefaultValues = {
  email: 'admin@example.com',
  password: '123456',
};

export const signUpDefaultValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const shippingAddressDefaultValues = {
  fullName: '',
  streetAddress: '',
  city: '',
  postalCode: '',
  country: '',
  phoneNumber: '',
  deliveryMethod: 'home',
  omnivaLocationId: '',
  omnivaLocationDetails: null,
  agreeToTerms: false,
  agreeToPrivacyPolicy: false,
  rememberDetails: false,
};

export const PAYMENT_METHODS = ['Stripe'];
export const DEFAULT_PAYMENT_METHOD = 'Stripe';

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 12;

export const productDefaultValues = {
  name: '',
  slug: '',
  category: '',
  images: [],
  brand: '',
  description: '',
  price: '0',
  stock: 0,
  weight: '',
  rating: '0',
  numReviews: '0',
  isFeatured: false,
  banner: null,
};

export const USER_ROLES = process.env.USER_ROLES
  ? process.env.USER_ROLES.split(', ')
  : ['admin', 'user'];

export const reviewFormDefaultValues = {
  title: '',
  comment: '',
  rating: 0,
};

export const SENDER_EMAIL = process.env.SENDER_EMAIL || 'onboarding@resend.dev';

export const forgotPasswordDefaultValues = {
  email: '',
};

export const DELIVERY_METHODS = [
  {
    id: 'home',
    name: 'Home Delivery',
    description: 'Delivery to your address',
    price: 10.00,
  },
  {
    id: 'omniva',
    name: 'Omniva Parcel Machine',
    description: 'Pickup from Omniva parcel locker',
    price: 2.80,
  },
] as const;
