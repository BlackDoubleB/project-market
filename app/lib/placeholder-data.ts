const users = [
    {
        id: '410544b2-4001-4271-9855-fec4b6a6442a',
        name: 'User',
        email: 'user@nextmail.com',
        password: '123456',
    },
];


const products = [
    {
        id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
        name: 'Sandalias Casuales Footloose Mujeres Fch-Nz006 Marie Delux',
        image_url: `/products/SandaliasCasualesFootlooseMujeresFch-Nz006MarieDelux.png`
    },
    {
        id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
        name: 'Sueter de punto TRAF Color Blanco',
        image_url: '/products/SueterdepuntoTRAFColorBlanco.png'
    },
    {
        id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
        name: 'Reloj Curren Krec57180303 Azul Hombre',
        image_url: '/products/RelojCurrenKrec57180303AzulHombre.png'
    },
    {
        id: '13D07535-C59E-4157-A011-J8H6EF8E0CBE',
        name: 'Auriculares Bluetooth QCY H3 ANC 70Hrs con cancelacion de ruido Blanco',
        image_url: '/products/AuricularesBluetoothQCYH3ANC70HrsconcancelacionderuidoBlanco.png'
    },
    {
        id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
        name: 'Libro de Hechizos Harry Potter',
        image_url: '/products/LibrodeHechizosHarryPotter.png'
    },
    {
        id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
        name: 'Sofa 2 Cuerpos Moscu Hys',
        image_url: '/products/Sofa2CuerposMoscuHys.png'
    },
    {
        id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
        name: 'Tocobo Cootton Barra Solar SPF 50 -Tocobo 19 Gramos',
        image_url: '/products/TocoboCoottonBarraSolarSPF50-Tocobo19Gramos.png'
    },
    {
        id: '13D07535-C59E-4157-A011-G8E3EF5E0CBA',
        name: 'Set De Maletin De Jueguete Disney Helados Frozen',
        image_url: '/products/SetDeMaletinDeJuegueteDisneyHeladosFrozen.png'
    },
    {
        id: '13D07535-C59E-4157-A011-H8F4EF6E0CBC',
        name: 'Zapatillas Nike Hombre WAFFLE TRAINER 2 SE DM0180-100',
        image_url: '/products/ZapatillasNikeHombreWAFFLETRAINER2SEDM0180-100.png'
    },
    {
        id: '13D07535-C59E-4157-A011-I8G5EF7E0CBD',
        name: 'Arroz Arabe Bandeja 500g',
        image_url: '/products/ArrozArabeBandeja500g.png'
    }
];

const categories = [{
    id: '1',
    name: 'Shoes',
},
{
    id: '2',
    name: 'Clothes',
},
{
    id: '3',
    name: 'Accessories',
},
{
    id: '4',
    name: 'Electronics',
},
{
    id: '5',
    name: 'Books',
},
{
    id: '6',
    name: 'Home',
},
{
    id: '7',
    name: 'Beauty',
},
{
    id: '8',
    name: 'Toys',
},
{
    id: '9',
    name: 'Sports',
},
{
    id: '10',
    name: 'Food',
}
];
const sales = [
    {
        product_id: products[0].id,
        category_id: categories[0].id,
        amount: 15795,
        method: 'card',
        date: '2022-12-06',
    },
    {
        product_id: products[1].id,
        category_id: categories[1].id,
        amount: 20348,
        method: 'card',
        date: '2022-11-14',
    },
    {
        product_id: products[4].id,
        category_id: categories[2].id,
        amount: 3040,
        method: 'cash',
        date: '2022-10-29',
    },
    {
        product_id: products[3].id,
        category_id: categories[3].id,
        amount: 44800,
        method: 'cash',
        date: '2023-09-10',
    },
    {
        product_id: products[4].id,
        category_id: categories[4].id,
        amount: 34577,
        method: 'card',
        date: '2023-08-05',
    },
    {
        product_id: products[5].id,
        category_id: categories[5].id,
        amount: 54246,
        method: 'card',
        date: '2023-07-16',
    },
    {
        product_id: products[6].id,
        category_id: categories[6].id,
        amount: 666,
        method: 'card',
        date: '2023-06-27',
    },
    {
        product_id: products[7].id,
        category_id: categories[7].id,
        amount: 32545,
        method: 'cash',
        date: '2023-06-09',
    },
    {
        product_id: products[8].id,
        category_id: categories[8].id,
        amount: 1250,
        method: 'cash',
        date: '2023-06-17',
    },
    {
        product_id: products[9].id,
        category_id: categories[9].id,
        amount: 8546,
        method: 'cash',
        date: '2023-06-07',
    }
];

const revenue = [
    { month: 'Jan', revenue: 2000 },
    { month: 'Feb', revenue: 1800 },
    { month: 'Mar', revenue: 2200 },
    { month: 'Apr', revenue: 2500 },
    { month: 'May', revenue: 2300 },
    { month: 'Jun', revenue: 3200 },
    { month: 'Jul', revenue: 3500 },
    { month: 'Aug', revenue: 3700 },
    { month: 'Sep', revenue: 2500 },
    { month: 'Oct', revenue: 2800 },
    { month: 'Nov', revenue: 3000 },
    { month: 'Dec', revenue: 4800 },
];

export { users, products, sales, revenue, categories };