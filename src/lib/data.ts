export type ProductCategory = "bedroom" | "soft" | "living";

export interface Product {
  id: string;
  name: string;
  price: string;
  cat: ProductCategory;
  dims: string;
  img: string;
}

export interface ProductDetailContent {
  tagline: string;
  description: string;
  composition: Array<string | { title: string; image?: string; qty?: string }>;
  features: string[];
  suitableFor: string[];
}

export interface NewsItem {
  id: string;
  cat_key: "cats_tag" | "prod_tag" | "svc_tag";
  title_uz: string;
  title_ru: string;
  title_en: string;
  date: string;
  img: string;
  excerpt_uz: string;
  excerpt_ru: string;
  excerpt_en: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "bursa",
    name: "BURSA",
    price: "16 499 900",
    cat: "bedroom",
    dims: "230×230×233 sm",
    img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=75",
  },
  {
    id: "aycha",
    name: "AYCHA",
    price: "19 999 900",
    cat: "bedroom",
    dims: "250×115×215 sm",
    img: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&q=75",
  },
  {
    id: "ankara",
    name: "ANKARA",
    price: "15 499 900",
    cat: "bedroom",
    dims: "230×115×215 sm",
    img: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&q=75",
  },
  {
    id: "galaxy",
    name: "GALAXY",
    price: "34 999 900",
    cat: "bedroom",
    dims: "180×140×215 sm",
    img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&q=75",
  },
  {
    id: "dreams",
    name: "DREAMS",
    price: "12 499 900",
    cat: "soft",
    dims: "210×90×95 sm",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=75",
  },
  {
    id: "melek",
    name: "MELEK",
    price: "13 499 900",
    cat: "soft",
    dims: "220×88×92 sm",
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=75",
  },
  {
    id: "rich",
    name: "RICH",
    price: "16 899 900",
    cat: "soft",
    dims: "240×90×95 sm",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=75",
  },
  {
    id: "derya",
    name: "DERYA",
    price: "19 499 900",
    cat: "bedroom",
    dims: "197×140×215 sm",
    img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=75",
  },
  {
    id: "fiona",
    name: "FIONA",
    price: "12 999 900",
    cat: "bedroom",
    dims: "177×118×225 sm",
    img: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&q=75",
  },
  {
    id: "nice",
    name: "NICE",
    price: "12 499 900",
    cat: "soft",
    dims: "200×85×90 sm",
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=75",
  },
  {
    id: "nazli",
    name: "NAZLI",
    price: "10 999 900",
    cat: "soft",
    dims: "195×83×88 sm",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=75",
  },
  {
    id: "grecia",
    name: "GRECIA",
    price: "15 499 900",
    cat: "living",
    dims: "282×140×215 sm",
    img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=75",
  },
];

export const NEWS: NewsItem[] = [
  {
    id: "mattress-guide",
    cat_key: "cats_tag",
    title_uz: "Uyg'un yashash uchun to'g'ri matras tanlash",
    title_ru: "Как выбрать правильный матрас для комфортного сна",
    title_en: "How to Choose the Right Mattress for Comfortable Sleep",
    date: "12 Noyabr 2024",
    img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=75",
    excerpt_uz:
      "Sog'lom uyqu uchun to'g'ri matras tanlash muhim qaror. Ushbu maqolada biz sizga eng yaxshi tavsiyalarni beramiz.",
    excerpt_ru:
      "Выбор правильного матраса — важное решение для здорового сна. В этой статье мы дадим вам лучшие рекомендации.",
    excerpt_en:
      "Choosing the right mattress is an important decision for healthy sleep. In this article we give you the best recommendations.",
  },
  {
    id: "sofa-guide",
    cat_key: "prod_tag",
    title_uz: "Divan: turlari va xususiyatlari haqida to'liq qo'llanma",
    title_ru: "Диван: полное руководство по видам и особенностям",
    title_en: "Sofa: A Complete Guide to Types and Features",
    date: "5 Oktyabr 2024",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=75",
    excerpt_uz:
      "Divanlar turlari, materiallar va ularning afzalliklari haqida batafsil ma'lumot oling.",
    excerpt_ru:
      "Узнайте подробную информацию о видах диванов, материалах и их преимуществах.",
    excerpt_en:
      "Get detailed information about sofa types, materials and their advantages.",
  },
  {
    id: "furniture-facts",
    cat_key: "svc_tag",
    title_uz: "Mebel haqida 14 ta qiziqarli fakt",
    title_ru: "14 интересных фактов о мебели",
    title_en: "14 Fascinating Facts About Furniture",
    date: "20 Sentyabr 2024",
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=75",
    excerpt_uz:
      "Kundalik hayotingizda ishlatiladigan mebellar haqida siz bilmagan qiziqarli faktlar.",
    excerpt_ru:
      "Интересные факты о мебели, которую вы используете в повседневной жизни.",
    excerpt_en:
      "Interesting facts about furniture you use in everyday life that you may not have known.",
  },
];

export const CATEGORY_IMAGES: Record<
  string,
  { src: string; alt: string }
> = {
  bedroom:
    {
      src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
      alt: "Bedroom furniture",
    },
  living:
    {
      src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
      alt: "Living room furniture",
    },
  soft: {
    src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    alt: "Soft furniture",
  },
};

export const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
    alt: "Bedroom showroom",
  },
  {
    src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    alt: "Sofa collection",
  },
  {
    src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
    alt: "Living room",
  },
  {
    src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80",
    alt: "Showroom interior",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80",
    alt: "Bedroom design",
  },
  {
    src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80",
    alt: "Modern bedroom",
  },
];

const CATEGORY_DETAIL_CONTENT: Record<ProductCategory, ProductDetailContent> = {
  bedroom: {
    tagline: "Yotoqxona uchun premium to'plam",
    description:
      "Ushbu model yotoqxona interyeriga nafislik va tartib beradi. Dizayn, funksionallik va qulaylik bir mahsulotda jamlangan.",
    composition: [
      { title: "Krovat" },
      { title: "Shkaf", qty: "1 sht." },
      { title: "Tumbochka", qty: "2 sht." },
      { title: "Ko'zgu paneli", qty: "1 sht." },
    ],
    features: [
      "Mustahkam karkas va yuqori sifatli furnitura",
      "Yumshoq rang palitrasi va zamonaviy fasad",
      "Kundalik foydalanish uchun qulay o'lchamlar",
    ],
    suitableFor: ["Yotoqxona", "Yangi ta'mirlangan kvartira", "Mehmon xonasi"],
  },
  soft: {
    tagline: "Yumshoq mebel: divan markazida qulaylik",
    description:
      "Divan modeli oilaviy dam olish uchun mo'ljallangan. Yostiq va kurpa elementlari bilan birga interyerga iliqlik qo'shadi.",
    composition: [
      { title: "Divan", qty: "1 sht." },
      { title: "Ortopedik o'tirish qismi" },
      { title: "Yostiqlar", qty: "2 sht." },
      { title: "Kurpa/plaid", qty: "1 sht." },
    ],
    features: [
      "Yumshoq va bardoshli qoplama matosi",
      "Keng o'tirish joyi va ergonomik suyanish qismi",
      "Tozalash va parvarishlash oson",
    ],
    suitableFor: ["Mehmonxona", "Kundalik foydalanish", "Oilaviy dam olish zonasi"],
  },
  living: {
    tagline: "Mehmonxona uchun to'liq yechim",
    description:
      "Mehmonxona modeli interyerning markaziy qismi bo'lib, stol va stullar bilan uyg'un kompozitsiya yaratadi.",
    composition: [
      { title: "Konsol", qty: "1 sht." },
      { title: "TV zona" },
      { title: "Stol", qty: "1 sht." },
      { title: "Stul to'plami", qty: "4 sht." },
    ],
    features: [
      "Minimalistik va premium ko'rinish",
      "Turli interyer uslublariga mos dizayn",
      "Ko'p funksiyali joylashtirish imkoni",
    ],
    suitableFor: ["Mehmonxona", "Katta zal", "Ofis kutish zonasi"],
  },
};

export function getProductById(id: string) {
  return PRODUCTS.find((product) => product.id === id);
}

export function getProductDetailContent(product: Product): ProductDetailContent {
  return CATEGORY_DETAIL_CONTENT[product.cat];
}

export function getRelatedProducts(product: Product, limit = 4) {
  return PRODUCTS.filter(
    (candidate) => candidate.cat === product.cat && candidate.id !== product.id
  ).slice(0, limit);
}
