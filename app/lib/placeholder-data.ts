import { v4 as uuidv4 } from 'uuid';
// eslint-disable-next-line prefer-const
let myuuid = uuidv4();
const date: Date = new Date();

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

const products = [
    {
        id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
        id_category: categories[0].id,
        name: 'Sandalias Casuales Footloose Mujeres Fch-Nz006 Marie Delux',
        image_url: `/products/SandaliasCasualesFootlooseMujeresFch-Nz006MarieDelux.png`,
        price: '20',
        date: date
    },
    {
        id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
        id_category: categories[1].id,
        name: 'Sueter de punto TRAF Color Blanco',
        image_url: '/products/SueterdepuntoTRAFColorBlanco.png',
        price: '50',
        date: date
    },
    {
        id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
        id_category: categories[2].id,
        name: 'Reloj Curren Krec57180303 Azul Hombre',
        image_url: '/products/RelojCurrenKrec57180303AzulHombre.png',
        price: '500',
        date: date
    },
    {
        id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
        id_category: categories[3].id,
        name: 'Auriculares Bluetooth QCY H3 ANC 70Hrs con cancelacion de ruido Blanco',
        image_url: '/products/AuricularesBluetoothQCYH3ANC70HrsconcancelacionderuidoBlanco.png',
        price: '150',
        date: date
    },
    {
        id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
        id_category: categories[4].id,
        name: 'Libro de Hechizos Harry Potter',
        image_url: '/products/LibrodeHechizosHarryPotter.png',
        price: '250',
        date: date
    },
    {
        id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
        id_category: categories[5].id,
        name: 'Sofa 2 Cuerpos Moscu Hys',
        image_url: '/products/Sofa2CuerposMoscuHys.png',
        price: '2500',
        date: date
    }
];

const stock = [
    {
        id: myuuid,
        id_product: products[0].id,
        quantity: 10,
        date: date,
    },
    {
        id: myuuid,
        id_product: products[1].id,
        quantity: 10,
        date: date,
    }, {
        id: myuuid,
        id_product: products[2].id,
        quantity: 10,
        date: date,
    }, {
        id: myuuid,
        id_product: products[3].id,
        quantity: 10,
        date: date,
    }, {
        id: myuuid,
        id_product: products[4].id,
        quantity: 10,
        date: date,
    }, {
        id: myuuid,
        id_product: products[5].id,
        quantity: 10,
        date: date,
    }
]

const role = [
    {
        id: myuuid,
        name: 'admin'
    }
]

const people = [
    {
        id: myuuid,
        dni: 77149964,
        name: "blanca",
        lastname: 'blacido aparicio',
        date_register: date
    }
];

const users = [
    {
        id: myuuid,
        id_role: role[0].id,
        id_people: people[0].id,
        user: 'User',
        password: '123456',
        date_login: date,
    },
];

const sales = [
    {
        id: myuuid,
        id_user: users[0].id,
        method: 'card',
        date: '2022-12-06',
        total: 15795,
    },
    {
        id: myuuid,
        id_user: users[0].id,
        method: 'card',
        date: '2022-11-14',
        total: 20348,
    },
    {
        id: myuuid,
        id_user: users[0].id,
        method: 'cash',
        date: '2022-10-29',
        total: 3040,
    },
    {
        id: myuuid,
        id_user: users[0].id,
        method: 'cash',
        date: '2023-09-10',
        total: 4480,
    },
    {
        id: myuuid,
        id_user: users[0].id,
        method: 'card',
        date: '2023-08-05',
        total: 34577,
    },
    {
        id: myuuid,
        id_user: users[0].id,
        method: 'card',
        date: '2023-07-16',
        total: 54246,
    }
];

const detail_sale_product = [
    {
        id_sale:sales[0].id,
        id_product:products[0].id,
        cantidad: 1,
    },
    {
        id_sale:sales[1].id,
        id_product:products[1].id,
        cantidad: 1,
    },
    {
        id_sale:sales[2].id,
        id_product:products[2].id,
        cantidad: 1,
    },
    {
        id_sale:sales[3].id,
        id_product:products[3].id,
        cantidad: 1,
    },
    {
        id_sale:sales[4].id,
        id_product:products[4].id,
        cantidad: 1,
    },
    {
        id_sale:sales[5].id,
        id_product:products[5].id,
        cantidad: 1,
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

export { categories, stock, products, detail_sale_product, sales, users, role, people, revenue };