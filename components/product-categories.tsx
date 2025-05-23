import Image from 'next/image';
import Link from 'next/link';
import { getDictionary } from '@/lib/dictionary';

interface ProductCategoriesProps {
  lang: string;
}

const ProductCategories = async ({ lang }: ProductCategoriesProps) => {
  const dictionary = await getDictionary(lang);

  const categories = [
    {
      key: 'honey',
      name: dictionary.productCategories?.categories?.honey?.name || 'Honey',
      image: '/images/categories/honey.jpg',
      description:
        dictionary.productCategories?.categories?.honey?.description ||
        'Pure, natural honey with rich flavors and golden hues',
      link: `/${lang}/search?category=honey`,
    },
    {
      key: 'beeswax',
      name:
        dictionary.productCategories?.categories?.beeswax?.name || 'Beeswax',
      image: '/images/categories/beeswax.jpg',
      description:
        dictionary.productCategories?.categories?.beeswax?.description ||
        'Natural beeswax products for home and wellness',
      link: `/${lang}/search?category=beeswax`,
    },
    {
      key: 'honeycomb',
      name:
        dictionary.productCategories?.categories?.honeycomb?.name ||
        'Honeycomb',
      image: '/images/categories/honeycomb.jpg',
      description:
        dictionary.productCategories?.categories?.honeycomb?.description ||
        'Fresh, raw honeycomb straight from the hive',
      link: `/${lang}/search?category=honeycomb`,
    },
  ];

  return (
    <section className='my-16'>
      <div className='text-center mb-10'>
        <h2 className='text-4xl font-serif text-[#1D1D1F] mb-2'>
          {dictionary.productCategories?.title || 'Product Categories'}
        </h2>
        <div className='w-20 h-1 bg-[#FF7A3D] mx-auto rounded-full'></div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-4'>
        {categories.map((category) => (
          <Link
            href={category.link}
            key={category.key}
            className='group relative overflow-hidden rounded-xl h-[250px] bg-[#FFFBF8]'
          >
            <div className='absolute inset-0'>
              <Image
                src={category.image}
                alt={category.name}
                fill
                className='object-cover transition-transform duration-300 group-hover:scale-105'
              />
              <div className='absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300'></div>
            </div>
            <div className='relative h-full flex flex-col justify-center items-center text-center p-6'>
              <h3 className='text-2xl font-serif mb-2 text-white'>
                {category.name}
              </h3>
              <p className='text-white/90 mb-4 max-w-md'>
                {category.description}
              </p>
              <div className='bg-[#FF7A3D] px-6 py-2 rounded-full text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#ff6a2a]'>
                {dictionary.productCategories?.shopNow || 'Shop Now'}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductCategories;
