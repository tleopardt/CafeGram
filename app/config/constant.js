export const ROUTES = {
  App: "App",
  Tabs: "Tabs",
  Home: "Home",
  Profile: "Profile",
  Explore: "Explore",
  Auth: "Auth",
  DetailCafe: "DetailCafe",
  Onboarding: "Onboarding",
  Search: "Search",
  Browser: "Browser",
};

export const socialAuth = {
  facebook: "facebook",
  google: "google",
};

export const socialAuthToken = {
  facebook: {
    clientId: "1795660994146316",
  },
  google: {
    androidClientId:
      "242707978714-pasuv8rdn5vlshdbu8fucr4it3dpgia0.apps.googleusercontent.com",
    expoClientId:
      "242707978714-cos4skoqt1pnvljg25o879fkskjkek3a.apps.googleusercontent.com",
  },
};

export const Thumbnail = [
  "https://i0.wp.com/waktuindonesiaberlibur.com/wp-content/uploads/2021/09/@aditkakbar.jpg?resize=780%2C975&ssl=1",
  "https://i.pinimg.com/736x/1d/12/03/1d12036c2c5a75afb684d5ecb5f83e8c.jpg",
  "https://i.pinimg.com/736x/2e/f0/82/2ef082d50792c1b7aded4112fb94a8c6.jpg",
  "https://assets-pergikuliner.com/GzvW6YrXv9LsRggBq0ddS3BPxpk=/fit-in/1366x768/smart/filters:no_upscale()/https://assets-pergikuliner.com/uploads/image/picture/1994334/picture-1597491737.JPG",
  "https://wisatamilenial.com/wp-content/uploads/2022/06/Kudo-Cafe-Batu-Foto-Image-From-@jejakrasa.id_.jpg",
  "https://cdn.idntimes.com/content-images/post/20190905/70265805-157782678705376-4726675857703246929-n-c8dd2e220fd1eb6c22c96c054be639f5.jpg",
  "https://cdn.timesmedia.co.id/images/2020/07/31/Tenthirty-Coffee.jpg",
  "https://www.cr1coffee.com/forum/uploads/editor/u5/gex0l70y37m1.jpg",
  "https://1.bp.blogspot.com/--cefpb6AjIA/X85MUCRGlII/AAAAAAAAMBM/J571x6t6CwoAqwN9LSNtrA64tVeU6UBhgCLcBGAsYHQ/s1080/noi-coffee-batu-jawa-timur.jpg"
];

export const kecamatan = [
  "Klojen",
  "Sukun",
  "Lowokwaru",
  "Blimbing",
  "KedungKandang",
];

export const categories = [
  {
    name: "View",
    thumbnail:
      "https://design4users.com/wp-content/uploads/2019/10/autumn-illustration-digital-art.jpg",
  },
  {
    name: "Price",
    thumbnail:
      "https://img.freepik.com/free-vector/profitable-pricing-strategy-price-formation-promo-action-clearance-shopping-idea-design-element-cheap-products-advertisement-customers-attraction_335657-3554.jpg?w=2000",
  },
  {
    name: "Menu Variant",
    thumbnail:
      "https://images.template.net/wp-content/uploads/2018/02/flat-lay-food-and-drink-menu-788x524.jpg",
  },
  {
    name: "Open Time",
    thumbnail:
      "https://png.pngtree.com/png-vector/20200319/ourlarge/pngtree-modern-flat-design-concept-of-time-management-with-characters-planning-a-png-image_2157998.jpg",
  },
];

export const slidesArr = [
  {
    name: "view",
    metaName: 'View',
    title: "Before We Start",
    question: "Please choose category view of cafe do you like?",
    option: [
      {
        name: "Natural",
        value: "natural",
      },
      {
        name: "Coastal",
        value: "coastal",
      },
      {
        name: "Vintage",
        value: "vintage",
      },
      {
        name: "Modern",
        value: "modern",
      },
      {
        name: "Industrial",
        value: "industrial",
      },
    ],
  },
  {
    name: "lokasi",
    metaName: 'Location',
    title: "Next Question",
    question: "Which districts of Malang do you live?",
    option: [
      {
        name: "Klojen",
        value: "Klojen",
      },
      {
        name: "Sukun",
        value: "Sukun",
      },
      {
        name: "Lowokwaru",
        value: "Lowokwaru",
      },
      {
        name: "Blimbing",
        value: "Blimbing",
      },
      {
        name: "Kedungkandang",
        value: "Kedungkandang",
      },
    ],
  },
  {
    name: "harga",
    metaName: 'Price',
    title: "Next Question",
    question: "How much price do you prefer?",
    option: [
      //   "Low", //   "Tidak lebih dari Rp. 35.000"
      //   "Middle", //   "Lebih dari Rp. 35.000, tidak lebih dari 70.000"
      //   "Expensive", //   "Lebih dari Rp. 70.000"
      {
        name: "Low",
        value: "rendah",
      },
      {
        name: "Middle",
        value: "sedang",
      },
      {
        name: "Expensive",
        value: "tinggi",
      },
    ],
  },
  {
    name: "variasi_menu",
    metaName: 'Menu Variation',
    title: `You're Almost There`,
    question: "How much variant menu do you prefer?",
    option: [
      //   "A bit", //  Kurang dari 25
      //   "Enough", //  Lebih dari 25, tidak lebih dari 50
      //   "A lot / Complete", //  Lebih dari 50
      {
        name: "A bit",
        value: "sedikit",
      },
      {
        name: "Enough",
        value: "cukup",
      },
      {
        name: "A lot / Complete",
        value: "lengkap",
      },
    ],
  },
  {
    name: "jam_buka",
    metaName: 'Open Hours',
    title: `Let's Get Started`,
    question: "Which one do you prefer for open time?",
    option: [
      //   "8 Hours", //  7 - 8 jam
      //   "16 Hours", //  9 - 16 jam
      //   "24 Hours", //  17 - 24 jam
      {
        name: "8 Hours",
        value: "sedikit",
      },
      {
        name: "16 Hours",
        value: "cukup",
      },
      {
        name: "24 Hours",
        value: "lama",
      },
    ],
  },
];

export const apiKey = 'f9287e91-a6c7-11ed-a58d-0242ac110002'