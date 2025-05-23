import ProductCard from '@/components/shared/product/product-card';
import { Button } from '@/components/ui/button';
import {
  getAllProducts,
  getAllCategories,
} from '@/lib/actions/product.actions';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { capitalizeWords } from '@/lib/utils';
import Image from 'next/image';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/config/i18n.config';

const sortOrders = [
  { key: 'newest', value: 'newest' },
  { key: 'lowestPrice', value: 'lowest' },
  { key: 'highestPrice', value: 'highest' },
];

export async function generateMetadata({
  params: { lang },
  searchParams: { q = 'all', category = 'all' }
}: {
  params: { lang: Locale };
  searchParams: { q?: string; category?: string };
}) {
  const dict = await getDictionary(lang);

  const isQuerySet = q && q !== 'all' && q.trim() !== '';
  const isCategorySet = category && category !== 'all' && category.trim() !== '';

  if (isQuerySet || isCategorySet) {
    return {
      title: `
      ${isQuerySet ? dict.products.meta.searchTitle.replace('{query}', q) : ''} 
      ${isCategorySet ? dict.products.meta.categoryTitle.replace('{category}', category) : ''}`,
    };
  } else {
    return {
      title: dict.products.meta.title,
    };
  }
}

const SearchPage = async ({
  params: { lang },
  searchParams: { q = 'all', category = 'all', sort = 'newest', page = '1' }
}: {
  params: { lang: Locale };
  searchParams: { q?: string; category?: string; sort?: string; page?: string };
}) => {
  const dict = await getDictionary(lang);

  // Construct filter url
  const getFilterUrl = ({
    c,
    s,
    pg,
    query,
  }: {
    c?: string;
    s?: string;
    pg?: string;
    query?: string;
  }) => {
    const params = { q, category, sort, page };
    
    if (query !== undefined) params.q = query;
    if (c) params.category = c;
    if (s) params.sort = s;
    if (pg) params.page = pg;

    return `/${lang}/search?${new URLSearchParams(params).toString()}`;
  };

  const { data: products } = await getAllProducts({
    query: q,
    category,
    sort,
    page: page ? Number(page) : 1,
  });

  console.log('Products:', JSON.stringify(products, null, 2));

  const categories = await getAllCategories();

  // Category cards data
  const categoryCards = [
    {
      key: 'all',
      image: '/images/hero-section/alternative-medicine-concept-ingredients-for-flu-2024-10-18-04-51-28-utc.jpg',
    },
    {
      key: 'honey',
      image: '/images/categories/honey.jpg',
    },
    {
      key: 'beeswax',
      image: '/images/categories/beeswax.jpg',
    },
    {
      key: 'honeycomb',
      image: '/images/categories/honeycomb.jpg',
    }
  ];

  // Prepare breadcrumb items
  const breadcrumbItems = [];
  if (category !== 'all') {
    breadcrumbItems.push({
      label: dict.navigation.products,
      href: `/${lang}/search`
    });
    breadcrumbItems.push({
      label: capitalizeWords(category),
      href: getFilterUrl({ c: category })
    });
  } else {
    breadcrumbItems.push({
      label: dict.navigation.products,
      href: `/${lang}/search`
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
        {categoryCards.map((cat) => (
          <Link 
            href={getFilterUrl({ c: cat.key })}
            key={cat.key}
            className={`group relative overflow-hidden rounded-xl h-[200px] bg-[#FFFBF8] transition-transform duration-300 hover:-translate-y-1 ${
              (cat.key === 'all' && category === 'all') || category === cat.key 
                ? 'ring-2 ring-[#FF7A3D]' 
                : ''
            }`}
          >
            <div className="absolute inset-0">
              <Image
                src={cat.image}
                alt={dict.products.categories[cat.key].name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>
            </div>
            <div className="relative h-full flex flex-col justify-center items-center text-center p-6">
              <h3 className="text-2xl font-serif mb-2 text-white">{dict.products.categories[cat.key].name}</h3>
              <p className="text-white/90 text-sm mb-4">{dict.products.categories[cat.key].description}</p>
              <div className={`px-6 py-2 rounded-full text-sm font-medium text-white transition-all duration-300 ${
                (cat.key === 'all' && category === 'all') || category === cat.key
                  ? 'bg-[#FF7A3D] opacity-100' 
                  : 'bg-[#FF7A3D] opacity-0 group-hover:opacity-100'
              }`}>
                {(cat.key === 'all' && category === 'all') || category === cat.key 
                  ? dict.products.filters.currentlyViewing
                  : dict.products.filters.viewProducts}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <Card className="sticky top-4">
            <CardContent className="p-6">
              {/* Search */}
              <div className="space-y-3 mb-6">
                <h3 className='font-serif text-xl text-[#1D1D1F]'>{dict.common.search}</h3>
                <form action={`/${lang}/search`} method="GET" className="flex gap-2">
                  <Input
                    type="text"
                    name="q"
                    defaultValue={q !== 'all' ? q : ''}
                    placeholder={dict.products.search.placeholder}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon">
                    <SearchIcon className="h-4 w-4" />
                  </Button>
                </form>
              </div>

              {/* Sort */}
              <div className="space-y-3">
                <h3 className='font-serif text-xl text-[#1D1D1F]'>{dict.products.sort.label}</h3>
                <div className="flex flex-col gap-2">
                  {sortOrders.map((order) => (
                    <Link
                      key={order.value}
                      href={getFilterUrl({ s: order.value })}
                      className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
                        sort === order.value
                          ? 'bg-[#FF7A3D] text-white'
                          : 'hover:bg-[#FF7A3D]/10'
                      }`}
                    >
                      {dict.products.sort[order.key]}
                    </Link>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products && products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} lang={lang} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">{dict.products.noResults}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage; 