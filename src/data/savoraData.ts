import heroDiningImg from '../assets/images/hero_savora_dining_1794763110490.jpg';
import wagyuTruffleImg from '../assets/images/dish_wagyu_truffle_1794763111164.jpg';
import scallopSaffronImg from '../assets/images/dish_scallop_saffron_1794763111956.jpg';
import chocolateGoldImg from '../assets/images/dish_chocolate_gold_1794763112214.jpg';
import lobsterRisottoImg from '../assets/images/dish_risotto_lobster_1794763112980.jpg';
import privateDiningImg from '../assets/images/interior_private_dining_1794763113512.jpg';
import wineCellarImg from '../assets/images/wine_cellar_sommelier_1794763114475.jpg';
import terraceBarImg from '../assets/images/interior_terrace_bar_1794763114923.jpg';
import beetRicottaImg from '../assets/images/dish_beet_ricotta_1794763565319.jpg';
import foieBriocheImg from '../assets/images/dish_foie_brioche_1794763564459.jpg';
import truffleVelouteImg from '../assets/images/dish_truffle_veloute_1794763566490.jpg';
import oysterMignonetteImg from '../assets/images/dish_oyster_mignonette_1794763566792.jpg';
import turbotEmberImg from '../assets/images/dish_turbot_ember_1794763567028.jpg';
import duckCherryImg from '../assets/images/dish_duck_cherry_1794763567756.jpg';
import morelAgnolottiImg from '../assets/images/dish_morel_agnolotti_1794763567757.jpg';
import lambHerbImg from '../assets/images/dish_lamb_herb_1794763568441.jpg';
import pearMillefeuilleImg from '../assets/images/dish_pear_millefeuille_1794763568372.jpg';
import yuzuPavlovaImg from '../assets/images/dish_yuzu_pavlova_1794763567900.jpg';
import cheeseArtisanalImg from '../assets/images/dish_cheese_artisanal_1794763569396.jpg';
import champagneCocktailImg from '../assets/images/drink_champagne_cocktail_1794763569695.jpg';
import tastingCoastalImg from '../assets/images/tasting_coastal_cellar_1794763775242.jpg';
import heroSignatureDishImg from '../assets/images/hero_signature_dish_1794765428183.jpg';
import heroDishScallopImg from '../assets/images/hero_dish_scallop_1794765539737.jpg';
import heroDishLobsterImg from '../assets/images/hero_dish_lobster_clean_1794765576348.jpg';
import heroDishChocolateImg from '../assets/images/hero_dish_chocolate_1794765539847.jpg';
import chefJulianPortraitImg from '../assets/images/chef_julian_portrait_1794765888208.jpg';
import chefCamillePortraitImg from '../assets/images/chef_camille_portrait_1794765888317.jpg';
import sommelierMatteoPortraitImg from '../assets/images/sommelier_matteo_portrait_1794765889426.jpg';
import maitreClaraPortraitImg from '../assets/images/maitre_clara_portrait_1794765889412.jpg';
import dessertPistachioSouffleImg from '../assets/images/dessert_pistachio_souffle_1794766366544.jpg';
import dessertFigChocolateImg from '../assets/images/dessert_fig_chocolate_1794766367633.jpg';
import tastingAtelierTruffleImg from '../assets/images/tasting_atelier_truffle_1794846094179.jpg';
import tastingCellarVenisonImg from '../assets/images/tasting_cellar_venison_1794846088024.jpg';
import wineWhiteBurgundyImg from '../assets/images/wine_white_burgundy_1794846176967.jpg';
import wineSauternesDigestifImg from '../assets/images/wine_sauternes_digestif_1794846177053.jpg';
import galleryHeroMobileImg from '../assets/images/gallery_hero_mobile_1794846569718.jpg';
import contactCourtyardDesktopImg from '../assets/images/contact_courtyard_desktop_1794846678377.jpg';
import contactCourtyardMobileImg from '../assets/images/contact_courtyard_mobile_1794846679957.jpg';
import {
  ExperienceSpace,
  GalleryItem,
  MenuItem,
  TeamMember,
  Testimonial,
} from '../types';

export const SAVORA_IMAGES = {
  heroDining: heroDiningImg,
  wagyuTruffle: wagyuTruffleImg,
  scallopSaffron: scallopSaffronImg,
  chocolateGold: chocolateGoldImg,
  lobsterRisotto: lobsterRisottoImg,
  privateDining: privateDiningImg,
  wineCellar: wineCellarImg,
  terraceBar: terraceBarImg,
  beetRicotta: beetRicottaImg,
  foieBrioche: foieBriocheImg,
  truffleVeloute: truffleVelouteImg,
  oysterMignonette: oysterMignonetteImg,
  turbotEmber: turbotEmberImg,
  duckCherry: duckCherryImg,
  morelAgnolotti: morelAgnolottiImg,
  lambHerb: lambHerbImg,
  pearMillefeuille: pearMillefeuilleImg,
  yuzuPavlova: yuzuPavlovaImg,
  cheeseArtisanal: cheeseArtisanalImg,
  champagneCocktail: champagneCocktailImg,
  tastingCoastal: tastingCoastalImg,
  heroDish: heroSignatureDishImg,
  heroDishScallop: heroDishScallopImg,
  heroDishLobster: heroDishLobsterImg,
  heroDishChocolate: heroDishChocolateImg,
  chefJulianPortrait: chefJulianPortraitImg,
  chefCamillePortrait: chefCamillePortraitImg,
  sommelierMatteoPortrait: sommelierMatteoPortraitImg,
  maitreClaraPortrait: maitreClaraPortraitImg,
  dessertPistachioSouffle: dessertPistachioSouffleImg,
  dessertFigChocolate: dessertFigChocolateImg,
  tastingAtelierTruffle: tastingAtelierTruffleImg,
  tastingCellarVenison: tastingCellarVenisonImg,
  wineWhiteBurgundy: wineWhiteBurgundyImg,
  wineSauternesDigestif: wineSauternesDigestifImg,
  galleryHeroMobile: galleryHeroMobileImg,
  contactCourtyardDesktop: contactCourtyardDesktopImg,
  contactCourtyardMobile: contactCourtyardMobileImg,
} as const;

export interface HeroDishSlide {
  id: string;
  course: string;
  title: string;
  image: string;
  mobileImage: string;
  alt: string;
}

export const HERO_DISH_SLIDES: HeroDishSlide[] = [
  {
    id: 'hero-wagyu',
    course: 'Hearth Main',
    title: 'Miyazaki A5 Wagyu & Périgord Truffle',
    image: heroSignatureDishImg,
    mobileImage: wagyuTruffleImg,
    alt: 'Seared Miyazaki A5 Wagyu and shaved winter black truffle tasting plate beside candlelight at SAVORA',
  },
  {
    id: 'hero-scallop',
    course: 'First Course',
    title: 'Hokkaido Scallop & Saffron Velouté',
    image: heroDishScallopImg,
    mobileImage: scallopSaffronImg,
    alt: 'Caramelized Hokkaido sea scallops with Champagne saffron velouté and Royal Oscietra caviar by candlelight',
  },
  {
    id: 'hero-lobster',
    course: 'Second Course',
    title: 'Butter-Poached Maine Lobster Risotto',
    image: heroDishLobsterImg,
    mobileImage: lobsterRisottoImg,
    alt: 'Butter-poached Maine lobster tail over saffron carnaroli risotto with tarragon oil on dark stoneware',
  },
  {
    id: 'hero-chocolate',
    course: 'Finale',
    title: '70% Valrhona Dark Chocolate Tartlet',
    image: heroDishChocolateImg,
    mobileImage: chocolateGoldImg,
    alt: 'Valrhona dark chocolate ganache tartlet accented with 24k gold leaf and espresso cremeux on dark linen',
  },
];

export const RESTAURANT_INFO = {
  name: 'SAVORA',
  tagline: 'Where Every Bite Becomes a Memory.',
  addressLine1: '418 Mercer Courtyard',
  addressLine2: 'Heritage District, San Francisco, CA 94107',
  phone: '+1 (415) 890-4210',
  conciergeEmail: 'concierge@savoradining.com',
  eventsEmail: 'salons@savoradining.com',
  coordinates: '37.7819° N, 122.3988° W',
  hours: [
    { days: 'Tuesday – Thursday', service: 'Evening Tasting & À La Carte', time: '5:30 PM – 10:30 PM' },
    { days: 'Friday – Saturday', service: 'Matinee Lunch', time: '12:00 PM – 2:30 PM' },
    { days: 'Friday – Saturday', service: 'Evening Tasting & À La Carte', time: '5:30 PM – 11:30 PM' },
    { days: 'Sunday', service: 'Sunday Supper & Cellar Pourings', time: '5:00 PM – 9:30 PM' },
    { days: 'Monday', service: 'Closed for Market & Cellar Prep', time: 'Closed' },
  ],
};

export const SIGNATURE_DISHES = [
  {
    id: 'sig-wagyu',
    course: 'Hearth Main · Signature',
    title: 'Miyazaki A5 Wagyu & Périgord Truffle',
    price: 118,
    dietary: ['Gluten-Free'],
    description:
      'Oak-ember seared A5 striploin glazed in roasted bone marrow jus, shaved winter black truffle, charred maitake, and whipped celeriac.',
    image: SAVORA_IMAGES.wagyuTruffle,
    pairing: '2016 Château Léoville Barton, Saint-Julien',
  },
  {
    id: 'sig-scallop',
    course: 'First Course · Coastal',
    title: 'Hokkaido Scallop & Saffron Velouté',
    price: 46,
    dietary: ['Gluten-Free'],
    description:
      'Caramelized diver scallops resting in Champagne-saffron beurre blanc, topped with Royal Oscietra caviar and sea fennel.',
    image: SAVORA_IMAGES.scallopSaffron,
    pairing: '2019 Domaine Leflaive Puligny-Montrachet',
  },
  {
    id: 'sig-lobster',
    course: 'Second Course · Artisanal Grain',
    title: 'Butter-Poached Maine Lobster Risotto',
    price: 68,
    dietary: ['Gluten-Free'],
    description:
      'Seven-year aged Acquerello carnaroli risotto steeped in roasted shell reduction, saffron threads, and cold-pressed chive oil.',
    image: SAVORA_IMAGES.lobsterRisotto,
    pairing: '2018 Billecart-Salmon Cuvée Nicolas François',
  },
];

export const MENU_ITEMS: MenuItem[] = [
  // Amuse & Starters (6 items)
  {
    id: 'm-scallop',
    name: 'Hokkaido Sea Scallop & Royal Oscietra',
    category: 'Amuse & Starters',
    price: 46,
    description:
      'Pan-seared diver scallops, saffron Champagne velouté, finger lime pearls, and coastal sea herbs.',
    dietary: ['Gluten-Free'],
    signature: true,
    pairing: 'Puligny-Montrachet 1er Cru, Burgundy',
    allergens: 'Shellfish, Dairy',
    image: SAVORA_IMAGES.scallopSaffron,
  },
  {
    id: 'm-oysters',
    name: 'Pacific Coast Oysters & Champagne Mignonette',
    category: 'Amuse & Starters',
    price: 34,
    description:
      'Half-dozen Miyagi and Kumamoto oysters served over crushed ice with pink shallot Champagne mignonette and finger lime.',
    dietary: ['Gluten-Free', 'Dairy-Free'],
    pairing: 'Billecart-Salmon Brut Sous Bois, Champagne',
    allergens: 'Shellfish',
    image: SAVORA_IMAGES.oysterMignonette,
  },
  {
    id: 'm-beet-tartare',
    name: 'Ember-Roasted Golden Beet & Smoked Ricotta',
    category: 'Amuse & Starters',
    price: 28,
    description:
      'Salt-baked heirloom beets aged in juniper vinegar, whipped sheep’s milk ricotta, toasted buckwheat crunch, and blood orange oil.',
    dietary: ['Vegetarian', 'Gluten-Free'],
    pairing: 'Sancerre Blanc, Loire Valley',
    allergens: 'Dairy',
    image: SAVORA_IMAGES.beetRicotta,
  },
  {
    id: 'm-foie-brioche',
    name: 'Hudson Valley Foie Gras Torchon',
    category: 'Amuse & Starters',
    price: 38,
    description:
      'Sauternes-cured torchon, spiced mission fig compote, toasted brioche points, and flaky Maldon sea salt.',
    dietary: [],
    pairing: 'Château Rieussec 1er Cru Classé, Sauternes',
    allergens: 'Gluten, Dairy',
    image: SAVORA_IMAGES.foieBrioche,
  },
  {
    id: 'm-artichoke-veloute',
    name: 'Jerusalem Artichoke & Black Truffle Velouté',
    category: 'Amuse & Starters',
    price: 29,
    description:
      'Silky sunchoke broth finished with cold-pressed hazelnut oil, roasted chanterelles, and shaved winter black truffle.',
    dietary: ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free'],
    pairing: 'Savennières Chenin Blanc, Loire',
    allergens: 'Tree Nuts',
    image: SAVORA_IMAGES.truffleVeloute,
  },
  {
    id: 'm-cheese-starter',
    name: 'Artisanal Cave-Aged Cheese & Honeycomb',
    category: 'Amuse & Starters',
    price: 32,
    description:
      'Twenty-four-month Comté, triple-crème Brillat-Savarin, wildflower honeycomb, walnut sourdough crisps, and ruby poached quince.',
    dietary: ['Vegetarian'],
    pairing: '2014 Château-Chalon Vin Jaune, Jura',
    allergens: 'Dairy, Gluten, Tree Nuts',
    image: SAVORA_IMAGES.cheeseArtisanal,
  },

  // Mains (6 items)
  {
    id: 'm-wagyu',
    name: 'Miyazaki A5 Wagyu Striploin',
    category: 'Mains',
    price: 118,
    description:
      'Hearth-seared A5 Wagyu, black winter truffle jus, roasted maitake cluster, and velvety celeriac mousseline.',
    dietary: ['Gluten-Free'],
    signature: true,
    pairing: 'Château Léoville Barton, Saint-Julien',
    allergens: 'Dairy',
    image: SAVORA_IMAGES.wagyuTruffle,
  },
  {
    id: 'm-lobster-risotto',
    name: 'Butter-Poached Maine Lobster Risotto',
    category: 'Mains',
    price: 68,
    description:
      'Aged Acquerello carnaroli rice simmered in shellfish saffron fumet, poached tail medallion, and emerald chive oil.',
    dietary: ['Gluten-Free'],
    signature: true,
    pairing: 'Meursault Les Narvaux, Burgundy',
    allergens: 'Shellfish, Dairy',
    image: SAVORA_IMAGES.lobsterRisotto,
  },
  {
    id: 'm-lamb-rack',
    name: 'Herb-Crusted Colorado Rack of Lamb',
    category: 'Mains',
    price: 78,
    description:
      'Pasture-raised lamb roasted with fines herbes crust, rosemary-garlic jus, smoked heirloom eggplant purée, and glazed young carrots.',
    dietary: ['Gluten-Free'],
    signature: true,
    pairing: '2015 Côte-Rôtie Jamet, Northern Rhône',
    allergens: 'Dairy',
    image: SAVORA_IMAGES.lambHerb,
  },
  {
    id: 'm-turbot',
    name: 'Wild Brittany Turbot on the Bone',
    category: 'Mains',
    price: 74,
    description:
      'Roasted over white oak embers with sea lettuce butter, braised baby fennel bulb, and charred Meyer lemon.',
    dietary: ['Gluten-Free'],
    pairing: 'Chablis Grand Cru Les Clos',
    allergens: 'Fish, Dairy',
    image: SAVORA_IMAGES.turbotEmber,
  },
  {
    id: 'm-duck-cherry',
    name: 'Dry-Aged Liberty Duck Breast',
    category: 'Mains',
    price: 62,
    description:
      'Fourteen-day crown-aged duck glazed in bitter honey, Bing cherry gastrique, charred radicchio, and parsnip mille-feuille.',
    dietary: ['Gluten-Free', 'Dairy-Free'],
    pairing: 'Gevrey-Chambertin Vieilles Vignes',
    image: SAVORA_IMAGES.duckCherry,
  },
  {
    id: 'm-morel-gnocchi',
    name: 'Foraged Morel & Pine Nut Agnolotti',
    category: 'Mains',
    price: 54,
    description:
      'Hand-folded saffron pasta parcels filled with roasted wild mushrooms, charred leek consommé, and toasted pine nuts.',
    dietary: ['Vegan', 'Vegetarian', 'Dairy-Free'],
    pairing: 'Barolo DOCG Serralunga, Piedmont',
    allergens: 'Gluten, Tree Nuts',
    image: SAVORA_IMAGES.morelAgnolotti,
  },

  // Tasting Menu (6 items)
  {
    id: 'm-grand-tasting',
    name: 'The Autumnal Grand Tasting (Nine Courses)',
    category: 'Tasting Menu',
    price: 235,
    description:
      'Chef Julian Vance’s signature progression celebrating coastal shellfish, hearth-roasted game, aged grains, and two architectural pastry finales.',
    dietary: ['Gluten-Free'],
    signature: true,
    pairing: 'Optional Reserve Cellar Pairing (+$145)',
    image: SAVORA_IMAGES.wagyuTruffle,
  },
  {
    id: 'm-coastal-cellar-tasting',
    name: 'Sommelier’s Coastal & Caviar Tasting (Eight Courses)',
    category: 'Tasting Menu',
    price: 255,
    description:
      'Cold-smoked king salmon and sea urchin tartlets crowned with Royal Oscietra caviar, line-caught turbot, and aged Champagne pairings.',
    dietary: ['Gluten-Free'],
    signature: true,
    pairing: 'Includes Vintage Grower Champagne Flight',
    allergens: 'Fish, Shellfish, Dairy',
    image: SAVORA_IMAGES.tastingCoastal,
  },
  {
    id: 'm-botanical-tasting',
    name: 'The Botanical Terroir Tasting (Seven Courses)',
    category: 'Tasting Menu',
    price: 185,
    description:
      'A dedicated plant-forward tasting showcasing Sonoma heirloom roots, wild fungi, fermented citrus broths, and stone-milled grains.',
    dietary: ['Vegan', 'Vegetarian', 'Dairy-Free'],
    pairing: 'Optional Biodynamic Pairing (+$120)',
    image: SAVORA_IMAGES.beetRicotta,
  },
  {
    id: 'm-chefs-counter',
    name: 'Hearth Counter Experience (Ten Courses)',
    category: 'Tasting Menu',
    price: 275,
    description:
      'Seated directly along our brass-trimmed open kitchen pass with direct dialogue with our culinary directors and rare cellar library pours.',
    dietary: [],
    signature: true,
    pairing: 'Includes Krug Grande Cuvée Welcome Pour',
    image: SAVORA_IMAGES.scallopSaffron,
  },
  {
    id: 'm-truffle-uni-tasting',
    name: 'Winter Périgord Truffle & Hokkaido Uni Tasting (Seven Courses)',
    category: 'Tasting Menu',
    price: 245,
    description:
      'Seasonal homage to black winter truffles and wild Santa Barbara & Hokkaido sea urchin woven across delicate tartlets, custards, and handmade pasta.',
    dietary: [],
    signature: true,
    pairing: 'Optional White Burgundy Flight (+$155)',
    allergens: 'Shellfish, Dairy, Gluten, Eggs',
    image: SAVORA_IMAGES.tastingAtelierTruffle,
  },
  {
    id: 'm-burgundy-game-tasting',
    name: 'The Burgundy Vault & Hearth Game Tasting (Eight Courses)',
    category: 'Tasting Menu',
    price: 265,
    description:
      'Ember-roasted highland venison, dry-aged Liberty duck, and forest mushrooms curated specifically alongside library Côte de Nuits vintages.',
    dietary: ['Gluten-Free'],
    signature: true,
    pairing: 'Includes Sommelier Côte de Nuits Pairing',
    allergens: 'Dairy',
    image: SAVORA_IMAGES.tastingCellarVenison,
  },

  // Desserts (6 items)
  {
    id: 'm-valrhona-tart',
    name: '70% Valrhona Guanaja Tart & Espresso Quenelle',
    category: 'Desserts',
    price: 26,
    description:
      'Crisp cacao sablé, Piedmont hazelnut praline feuilletine, single-origin espresso gelato, and 24-karat gold leaf.',
    dietary: ['Vegetarian'],
    signature: true,
    pairing: '1998 Toro Albalá Don PX Convento Selección',
    allergens: 'Dairy, Gluten, Tree Nuts',
    image: SAVORA_IMAGES.chocolateGold,
  },
  {
    id: 'm-pear-cardamom',
    name: 'Poached Comice Pear & Smoked Vanilla Mille-Feuille',
    category: 'Desserts',
    price: 24,
    description:
      'Sauternes-poached pear ribbons, caramelized puff pastry, Tahitian vanilla bean diplomat, and toasted oat praline.',
    dietary: ['Vegetarian'],
    pairing: '2015 Royal Tokaji Aszú 5 Puttonyos',
    allergens: 'Dairy, Gluten',
    image: SAVORA_IMAGES.pearMillefeuille,
  },
  {
    id: 'm-citrus-pavlova',
    name: 'Yuzu & Bergamot Crisp Cloud',
    category: 'Desserts',
    price: 22,
    description:
      'Aquafaba meringue shell, roasted mandarin sorbet, olive oil yuzu curd, and fresh lemon verbena leaves.',
    dietary: ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free'],
    pairing: 'Moscato d’Asti Vignaioli di Santo Stefano',
    image: SAVORA_IMAGES.yuzuPavlova,
  },
  {
    id: 'm-cheese-dessert',
    name: 'After-Dinner Cave Cheese & Quince Board',
    category: 'Desserts',
    price: 30,
    description:
      'Curated selection of aged Alpine cheeses accompanied by wild honeycomb, quince paste, and toasted walnut pain de campagne.',
    dietary: ['Vegetarian'],
    pairing: '1985 Taylor Fladgate Vintage Port',
    allergens: 'Dairy, Gluten, Tree Nuts',
    image: SAVORA_IMAGES.cheeseArtisanal,
  },
  {
    id: 'm-hazelnut-parfait',
    name: 'Caramelized Fig & Dark Chocolate Mille-Crêpe',
    category: 'Desserts',
    price: 25,
    description:
      'Warm roasted black mission figs glazed with aged balsamic, dark ganache, and toasted Piedmont hazelnut crunch.',
    dietary: ['Vegetarian'],
    pairing: 'Banyuls Rimage Château de Jau',
    allergens: 'Dairy, Gluten, Tree Nuts',
    image: SAVORA_IMAGES.dessertFigChocolate,
  },
  {
    id: 'm-pistachio-souffle',
    name: 'Roasted Pistachio & Saffron Grand Marnier Soufflé',
    category: 'Desserts',
    price: 27,
    description:
      'Airy Bronte pistachio soufflé baked to order, poured tableside with saffron-infused Grand Marnier crème anglaise.',
    dietary: ['Vegetarian', 'Gluten-Free'],
    signature: true,
    pairing: '2009 Château Suduiraut Sauternes',
    allergens: 'Dairy, Eggs, Tree Nuts',
    image: SAVORA_IMAGES.dessertPistachioSouffle,
  },

  // Wine & Pairings (6 items)
  {
    id: 'm-krug-glass',
    name: 'Krug Grande Cuvée 171ème Édition (By the Glass)',
    category: 'Wine & Pairings',
    price: 65,
    description:
      'A mosaic of 131 wines across 12 vintages; notes of toasted brioche, candied citrus, hazelnut, and electric minerality.',
    dietary: ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free'],
    signature: true,
    image: SAVORA_IMAGES.champagneCocktail,
  },
  {
    id: 'm-burgundy-flight',
    name: 'Grand Cru Côte de Nuits Flight (Three 3oz Pours)',
    category: 'Wine & Pairings',
    price: 165,
    description:
      'Guided cellar comparison spanning Chambolle-Musigny, Vosne-Romanée, and Gevrey-Chambertin vintages 2014–2018.',
    dietary: ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free'],
    signature: true,
    image: SAVORA_IMAGES.wineCellar,
  },
  {
    id: 'm-mercer-old-fashioned',
    name: 'Smoked Rosemary & Reserve Cognac Aperitif',
    category: 'Wine & Pairings',
    price: 28,
    description:
      'XO Grande Champagne cognac stirred with charred rosemary honey, saffron bitters, and hand-carved crystal ice.',
    dietary: ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free'],
    image: SAVORA_IMAGES.champagneCocktail,
  },
  {
    id: 'm-zero-proof',
    name: 'Botanical Zero-Proof Sommelier Pairing (Five Pours)',
    category: 'Wine & Pairings',
    price: 85,
    description:
      'House-distilled smoked oolong infusions, verjus reductions, toasted fig leaf tonic, and fermented blackberry shrub.',
    dietary: ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free'],
    image: SAVORA_IMAGES.terraceBar,
  },
  {
    id: 'm-white-burgundy-carafe',
    name: 'Domaine Leflaive Puligny-Montrachet 1er Cru (Carafe)',
    category: 'Wine & Pairings',
    price: 135,
    description:
      'Chalky minerality, toasted almond, and orchard pear decanted tableside for coastal shellfish and saffron reductions.',
    dietary: ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free'],
    signature: true,
    image: SAVORA_IMAGES.wineWhiteBurgundy,
  },
  {
    id: 'm-sauternes-armagnac-flight',
    name: 'Library Sauternes & Bas-Armagnac Digestif Flight',
    category: 'Wine & Pairings',
    price: 95,
    description:
      'Rare cellar duo of golden botrytized Sauternes and cask-strength 1974 Bas-Armagnac poured alongside pastry finales.',
    dietary: ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free'],
    image: SAVORA_IMAGES.wineSauternesDigestif,
  },
];

export const STORY_MILESTONES = [
  {
    index: '01.',
    year: '2018',
    title: 'The Hearth & First Table',
    description:
      'Founded inside a restored 1924 brick carriage house in Mercer Courtyard with thirty-six seats, an open white-oak hearth, and a single aspiration: unhurried elegance.',
  },
  {
    index: '02.',
    year: '2021',
    title: 'The Subterranean Wine Vault',
    description:
      'Expanded beneath the courtyard flagstones to house 4,200 bottles of Old World grower Champagnes, Burgundy library vintages, and artisanal Californian estates.',
  },
  {
    index: '03.',
    year: '2024',
    title: 'Two-Star Distinction & Farm Collective',
    description:
      'Recognized internationally for seasonal precision and zero-waste maritime sourcing, establishing direct partnerships with seventeen coastal fisheries and micro-farms.',
  },
  {
    index: '04.',
    year: '2026',
    title: 'The Burgundy Salon & Tasting Atelier',
    description:
      'Unveiled our glass-walled private dining salon and ten-seat Hearth Counter, uniting architectural intimacy with live culinary theatre.',
  },
];

export const PHILOSOPHY_PILLARS = [
  {
    index: '01.',
    title: 'Provenance Before Technique',
    summary:
      'Every plate begins at dawn with line-caught Pacific shellfish, heritage grains, and single-estate olive oils—allowing pristine ingredients to speak without excess.',
  },
  {
    index: '02.',
    title: 'The Discipline of Live Fire',
    summary:
      'Seasoned California white oak and aged applewood embers impart quiet depth to proteins and winter roots alike, balancing classical French sauces with primal warmth.',
  },
  {
    index: '03.',
    title: 'Hospitality Without Pretense',
    summary:
      'True luxury is effortless ease. Our dining room cadence adapts to your evening—attentive when desired, invisible during private conversation.',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'julian-vance',
    name: 'Julian Vance',
    role: 'Chef-Patron & Culinary Director',
    tenure: '18 Years in Michelin Kitchens · Paris, Tokyo & San Francisco',
    bio: 'Trained under classical brigade discipline in Lyon before spending four transformative years studying kaiseki seasonality in Kyoto, Julian founded SAVORA to bridge disciplined French saucier craft with Californian terroir.',
    philosophy: '“A dish is remembered not for how many elements touch the porcelain, but for the silence at the table after the first bite.”',
    image: chefJulianPortraitImg,
  },
  {
    id: 'camille-laurent',
    name: 'Camille Laurent',
    role: 'Executive Pastry Director',
    tenure: '12 Years · Formerly of Plaza Athénée',
    bio: 'Camille approaches pastry as architectural temperance—replacing heavy sweetness with roasted cacao nibs, smoked stone fruits, bitter herbs, and warm-from-the-oven laminated tarts.',
    philosophy: '“The final course should linger like a great Burgundy finish: crisp, warm, and never cloying.”',
    image: chefCamillePortraitImg,
  },
  {
    id: 'matteo-bellini',
    name: 'Matteo Bellini',
    role: 'Head Sommelier & Cellar Master',
    tenure: 'Master Sommelier · 4,200-Bottle Vault Curator',
    bio: 'Born into a Piedmontese winemaking family, Matteo curates SAVORA’s cellar around small-production grower Champagnes, library Barolos, and bespoke zero-proof botanical infusions.',
    philosophy: '“The right pour does not compete with the chef’s reduction; it unlocks a flavor neither could reach alone.”',
    image: sommelierMatteoPortraitImg,
  },
  {
    id: 'clara-chen',
    name: 'Clara Chen',
    role: 'Maître d’ & General Manager',
    tenure: '14 Years in Luxury Hospitality',
    bio: 'Clara orchestrates the nightly rhythm of the dining room and private salons, ensuring anniversaries, diplomatic dinners, and quiet Tuesday evenings unfold with seamless grace.',
    philosophy: '“We remember how you take your espresso and which corner table catches the last golden light.”',
    image: maitreClaraPortraitImg,
  },
];

export const EXPERIENCE_SPACES: ExperienceSpace[] = [
  {
    id: 'main-dining',
    name: 'The Main Dining Room',
    capacity: 'Up to 48 Seated Guests',
    setting: 'Candlelit Walnut · Burgundy Velvet Banquettes',
    description:
      'Anchored by coffered espresso beams, hand-troweled limestone walls, and views into the warm glow of the open pass, the Main Dining Room balances architectural grandeur with acoustic serenity.',
    highlights: [
      'Custom brass candleholders & handmade stoneware',
      'Direct sightlines to the wood-hearth pass',
      'Intimate table spacing for unhurried conversation',
    ],
    image: SAVORA_IMAGES.heroDining,
  },
  {
    id: 'burgundy-salon',
    name: 'The Burgundy Salon',
    capacity: '8 to 16 Guests · Private Table',
    setting: 'Glass-Enclosed Wine Vault · Walnut Boardroom Table',
    description:
      'Enclosed by floor-to-ceiling illuminated vintage wine racks and deep burgundy drapery, The Burgundy Salon hosts milestone celebrations, executive dinners, and sommelier-led tastings.',
    highlights: [
      'Dedicated sommelier & two service captains',
      'Bespoke calligraphy printed tasting menus',
      'Acoustic privacy with integrated discreet AV',
    ],
    image: SAVORA_IMAGES.privateDining,
  },
  {
    id: 'cellar-vault',
    name: 'The Subterranean Cellar Table',
    capacity: '2 to 8 Guests · Rare Tasting Vault',
    setting: 'Stone Archways · Marble Decanting Pedestal',
    description:
      'Tucked beneath the courtyard flagstones amidst 4,200 cellar selections, this intimate marble table offers rare vertical wine tastings paired with bespoke canapés and multi-course dinners.',
    highlights: [
      'Access to library vintages dating back to 1982',
      'Guided cellar walk with Head Sommelier Matteo Bellini',
      'Ideal for proposals and collector tastings',
    ],
    image: SAVORA_IMAGES.wineCellar,
  },
  {
    id: 'amber-lounge',
    name: 'The Mercer Bar & Lounge',
    capacity: '24 Guests · Cocktails & Late Supper',
    setting: 'Black Veined Marble · Espresso Leather Seating',
    description:
      'Arrive early for an aperitif or linger past midnight over single-cask cognacs, rare amari, and our shortened lounge tasting menu.',
    highlights: [
      'House-clarified seasonal cocktails & Champagne by the glass',
      'Walk-in friendly seating reserved nightly',
      'Late-evening dessert & digestif service',
    ],
    image: SAVORA_IMAGES.terraceBar,
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Evening Service in the Main Room',
    category: 'Interiors',
    image: SAVORA_IMAGES.heroDining,
    caption: 'Candlelight, hand-woven ivory linen, and espresso walnut beams set the cadence for evening service.',
    detail: 'Main Dining Room · Mercer Courtyard',
  },
  {
    id: 'gal-2',
    title: 'Miyazaki A5 Wagyu & Winter Truffle',
    category: 'Culinary Art',
    image: SAVORA_IMAGES.wagyuTruffle,
    caption: 'Seared over seasoned white oak embers and finished with shaved Périgord truffle and bone marrow jus.',
    detail: 'Autumn Tasting · Seventh Course',
  },
  {
    id: 'gal-3',
    title: 'Hokkaido Scallop & Royal Oscietra',
    category: 'Culinary Art',
    image: SAVORA_IMAGES.scallopSaffron,
    caption: 'Golden saffron Champagne velouté cradles seared diver scallops crowned with oscietra caviar.',
    detail: 'Coastal Prelude · Second Course',
  },
  {
    id: 'gal-4',
    title: 'The Burgundy Salon',
    category: 'Private Dining',
    image: SAVORA_IMAGES.privateDining,
    caption: 'Our signature private dining table framed by the glass-enclosed Grand Cru wine collection.',
    detail: 'Private Events · Seats up to 16',
  },
  {
    id: 'gal-5',
    title: 'Butter-Poached Maine Lobster Risotto',
    category: 'Culinary Art',
    image: SAVORA_IMAGES.lobsterRisotto,
    caption: 'Aged Acquerello carnaroli infused with saffron threads, lobster reduction, and cold-pressed chive oil.',
    detail: 'Signature Artisanal Grain Course',
  },
  {
    id: 'gal-6',
    title: 'The Subterranean Cellar Vault',
    category: 'Wine Cellar',
    image: SAVORA_IMAGES.wineCellar,
    caption: 'Stone archways housing 4,200 bottles across Burgundy, Piedmont, Champagne, and Napa Valley.',
    detail: '4,200 Bottles · Library Vintages',
  },
  {
    id: 'gal-7',
    title: '70% Valrhona Guanaja & Gold Leaf',
    category: 'Culinary Art',
    image: SAVORA_IMAGES.chocolateGold,
    caption: 'Dark chocolate tartlet paired with hazelnut praline, single-origin espresso quenelle, and gold leaf.',
    detail: 'Pastry Finale · Chef Camille Laurent',
  },
  {
    id: 'gal-8',
    title: 'The Mercer Marble Bar',
    category: 'Interiors',
    image: SAVORA_IMAGES.terraceBar,
    caption: 'Black veined marble bar and amber-lit spirits library overlooking Mercer Courtyard at twilight.',
    detail: 'Aperitif & Digestif Lounge',
  },
  {
    id: 'gal-9',
    title: 'Herb-Crusted Colorado Rack of Lamb',
    category: 'Culinary Art',
    image: SAVORA_IMAGES.lambHerb,
    caption: 'Rosy roasted rack of lamb finished with rosemary jus, smoked eggplant purée, and glazed young carrots.',
    detail: 'Hearth Main · Winter Carte',
  },
  {
    id: 'gal-10',
    title: 'Poached Comice Pear Mille-Feuille',
    category: 'Culinary Art',
    image: SAVORA_IMAGES.pearMillefeuille,
    caption: 'Caramelized puff pastry ribbons layered with Sauternes-poached pear and Tahitian vanilla cream.',
    detail: 'Pastry Atelier · Chef Camille Laurent',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote:
      'From the first pour of Krug in the marble lounge to the final Valrhona tartlet, SAVORA delivered the most composed, emotionally resonant dinner we have experienced in five years of culinary travel.',
    author: 'Eleanor Whitfield',
    role: 'Senior Dining Critic, The Coastal Review',
    occasion: 'Nine-Course Autumn Grand Tasting',
  },
  {
    id: 'test-2',
    quote:
      'We hosted fourteen international partners in The Burgundy Salon. Matteo’s 2014 Côte de Nuits flight paired with the A5 Wagyu left every guest speechless—quietly impeccable from arrival to farewell.',
    author: 'Henrik Lindqvist',
    role: 'Managing Partner, Lindqvist & Co. Architecture',
    occasion: 'Private Dining · The Burgundy Salon',
  },
  {
    id: 'test-3',
    quote:
      'Few kitchens treat plant-forward fine dining with the same reverence as prime proteins. Their Botanical Terroir tasting had depth, smoke, and brightness I am still thinking about weeks later.',
    author: 'Dr. Priya Nair',
    role: 'Culinary Historian & Author',
    occasion: 'Botanical Terroir Tasting Menu',
  },
  {
    id: 'test-4',
    quote:
      'Sitting along the brass Hearth Counter for our anniversary felt like watching an orchestra at close range—every reduction glazed to order, unhurried warmth, and a 1998 Sauternes pairing we will never forget.',
    author: 'Julian & Claire Beaumont',
    role: 'Cellar Society Patrons, Pacific Heights',
    occasion: 'Ten-Course Hearth Counter Experience',
  },
];
