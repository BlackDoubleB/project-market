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
        id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
        name: 'Auriculares Bluetooth QCY H3 ANC 70Hrs con cancelacion de ruido Blanco',
        image_url: '/products/AuricularesBluetoothQCYH3ANC70HrsconcancelacionderuidoBlanco.png'
    },
    {
        id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
        name: 'Libro de Hechizos Harry Potter',
        image_url: '/products/LibrodeHechizosHarryPotter.png'
    },
    {
        id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
        name: 'Sofa 2 Cuerpos Moscu Hys',
        image_url: '/products/Sofa2CuerposMoscuHys.png'
    }
];

const categories = [
{
    id: 'b995425f-cebb-4f68-b505-08d2168e7e72',
    name: 'Shoes',
},
{
    id: '3533c876-4494-444d-b3cd-ac91e723e89d',
    name: 'Clothes',
},
{
    id: '59475b1d-35bd-4369-8cde-5419e4e8edf9',
    name: 'Accessories',
},
{
    id: 'f0638f0e-6196-468c-b957-2e9f4332c2e0',
    name: 'Electronics',
},
{
    id: '340ad912-456d-41a3-9fc7-6475662b468a',
    name: 'Books',
},
{
    id: 'f145a9f4-65d8-4061-a513-d3bab3727d54',
    name: 'Home',
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
        product_id: products[2].id,
        category_id: categories[2].id,
        amount: 3040,
        method: 'cash',
        date: '2022-10-29',
    },
    {
        product_id: products[3].id,
        category_id: categories[3].id,
        amount: 4480,
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