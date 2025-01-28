import { v4 as uuidv4 } from 'uuid';
const date: Date = new Date();


const categories = [
    {
        id: uuidv4(),
        name: 'Shoes',
    },
    {
        id: uuidv4(),
        name: 'Clothes',
    },
    {
        id: uuidv4(),
        name: 'Accessories',
    },
    {
        id: uuidv4(),
        name: 'Electronics',
    },
    {
        id: uuidv4(),
        name: 'Books',
    },
    {
        id: uuidv4(),
        name: 'Home',
    }
];

const products = [
    {
        id: uuidv4(),
        id_category: categories[0].id,
        name: 'Sandalias Casuales Footloose Mujeres Fch-Nz006 Marie Delux',
        image_url: `/products/SandaliasCasualesFootlooseMujeresFch-Nz006MarieDelux.png`,
        price: 20,
        date: date
    },
    {
        id: uuidv4(),
        id_category: categories[1].id,
        name: 'Sueter de punto TRAF Color Blanco',
        image_url: '/products/SueterdepuntoTRAFColorBlanco.png',
        price: '50',
        date: date
    },
    {
        id: uuidv4(),
        id_category: categories[2].id,
        name: 'Reloj Curren Krec57180303 Azul Hombre',
        image_url: '/products/RelojCurrenKrec57180303AzulHombre.png',
        price: 500,
        date: date
    },
    {
        id: uuidv4(),
        id_category: categories[3].id,
        name: 'Auriculares Bluetooth QCY H3 ANC 70Hrs con cancelacion de ruido Blanco',
        image_url: '/products/AuricularesBluetoothQCYH3ANC70HrsconcancelacionderuidoBlanco.png',
        price: 150,
        date: date
    },
    {
        id:uuidv4(),
        id_category: categories[4].id,
        name: 'Libro de Hechizos Harry Potter',
        image_url: '/products/LibrodeHechizosHarryPotter.png',
        price: 250,
        date: date
    },
    {
        id: uuidv4(),
        id_category: categories[5].id,
        name: 'Sofa 2 Cuerpos Moscu Hys',
        image_url: '/products/Sofa2CuerposMoscuHys.png',
        price: 2500,
        date: date
    }
];

const stock = [
    {
        id: uuidv4(),
        id_product: products[0].id,
        quantity: 10,
        date: date,
    },
    {
        id: uuidv4(),
        id_product: products[1].id,
        quantity: 10,
        date: date,
    }, {
        id: uuidv4(),
        id_product: products[2].id,
        quantity: 10,
        date: date,
    }, {
        id: uuidv4(),
        id_product: products[3].id,
        quantity: 10,
        date: date,
    }, {
        id: uuidv4(),
        id_product: products[4].id,
        quantity: 10,
        date: date,
    }, {
        id: uuidv4(),
        id_product: products[5].id,
        quantity: 10,
        date: date,
    }
]

const role = [
    {
        id: uuidv4(),
        name: 'admin'
    }
]

const people = [
    {
        id: uuidv4(),
        dni: 77149964,
        people_name: "blanca",
        lastname: 'blacido aparicio',
        date_register: date
    }
];

const users = [
    {
        id: uuidv4(),
        id_role: role[0].id,
        id_people: people[0].id,
        user_name: 'User',
        password: '123456',
        date_login: date,
    },
];

const sales = [
    {
        id: uuidv4(),
        id_user: users[0].id,
        method: 'card',
        date: date,
        total: 15795,
    },
    {
        id: uuidv4(),
        id_user: users[0].id,
        method: 'card',
        date: date,
        total: 20348,
    },
    {
        id: uuidv4(),
        id_user: users[0].id,
        method: 'cash',
        date: date,
        total: 3040,
    },
    {
        id: uuidv4(),
        id_user: users[0].id,
        method: 'cash',
        date: date,
        total: 4480,
    },
    {
        id: uuidv4(),
        id_user: users[0].id,
        method: 'card',
        date: date,
        total: 34577,
    },
    {
        id: uuidv4(),
        id_user: users[0].id,
        method: 'card',
        date: date,
        total: 54246,
    }
];

const detail_sale_products = [
    {
        id_sale:sales[0].id,
        id_product:products[0].id,
        quantity: 1,
    },
    {
        id_sale:sales[1].id,
        id_product:products[1].id,
        quantity: 1,
    },
    {
        id_sale:sales[2].id,
        id_product:products[2].id,
        quantity: 1,
    },
    {
        id_sale:sales[3].id,
        id_product:products[3].id,
        quantity: 1,
    },
    {
        id_sale:sales[4].id,
        id_product:products[4].id,
        quantity: 1,
    },
    {
        id_sale:sales[5].id,
        id_product:products[5].id,
        quantity: 1,
    }
];

export { categories, stock, products, detail_sale_products, sales, users, role, people };