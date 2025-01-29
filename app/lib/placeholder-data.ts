import { v4 as uuidv4 } from 'uuid';
const date: Date = new Date();


const categories = [
    {
        category_id: uuidv4(),
        category_name: 'Shoes',
    },
    {
        category_id: uuidv4(),
        category_name: 'Clothes',
    },
    {
        category_id: uuidv4(),
        category_name: 'Accessories',
    },
    {
        category_id: uuidv4(),
        category_name: 'Electronics',
    },
    {
        category_id: uuidv4(),
        category_name: 'Books',
    },
    {
        category_id: uuidv4(),
        category_name: 'Home',
    }
];

const products = [
    {
        product_id: uuidv4(),
        category_id: categories[0].category_id,
        product_name: 'Sandalias Casuales Footloose Mujeres Fch-Nz006 Marie Delux',
        image_url: `/products/SandaliasCasualesFootlooseMujeresFch-Nz006MarieDelux.png`,
        price: 20,
        date: date
    },
    {
        product_id: uuidv4(),
        category_id: categories[1].category_id,
        product_name: 'Sueter de punto TRAF Color Blanco',
        image_url: '/products/SueterdepuntoTRAFColorBlanco.png',
        price: '50',
        date: date
    },
    {
        product_id: uuidv4(),
        category_id: categories[2].category_id,
        product_name: 'Reloj Curren Krec57180303 Azul Hombre',
        image_url: '/products/RelojCurrenKrec57180303AzulHombre.png',
        price: 500,
        date: date
    },
    {
        product_id: uuidv4(),
        category_id: categories[3].category_id,
        product_name: 'Auriculares Bluetooth QCY H3 ANC 70Hrs con cancelacion de ruido Blanco',
        image_url: '/products/AuricularesBluetoothQCYH3ANC70HrsconcancelacionderuidoBlanco.png',
        price: 150,
        date: date
    },
    {
        product_id:uuidv4(),
        category_id: categories[4].category_id,
        product_name: 'Libro de Hechizos Harry Potter',
        image_url: '/products/LibrodeHechizosHarryPotter.png',
        price: 250,
        date: date
    },
    {
        product_id: uuidv4(),
        category_id: categories[5].category_id,
        product_name: 'Sofa 2 Cuerpos Moscu Hys',
        image_url: '/products/Sofa2CuerposMoscuHys.png',
        price: 2500,
        date: date
    }
];

const stock = [
    {
        stock_id: uuidv4(),
        product_id: products[0].product_id,
        quantity: 10,
        date_register: date,
    },
    {
        stock_id: uuidv4(),
        product_id: products[1].product_id,
        quantity: 10,
        date_register: date,
    }, {
        stock_id: uuidv4(),
        product_id: products[2].product_id,
        quantity: 10,
        date_register: date,
    }, {
        stock_id: uuidv4(),
        product_id: products[3].product_id,
        quantity: 10,
        date_register: date,
    }, {
        stock_id: uuidv4(),
        product_id: products[4].product_id,
        quantity: 10,
        date_register: date,
    }, {
        stock_id: uuidv4(),
        product_id: products[5].product_id,
        quantity: 10,
        date_register: date,
    }
]

const roles = [
    {
        role_id: uuidv4(),
        role_name: 'admin'
    }
]

const people = [
    {
        person_id: uuidv4(),
        dni: 77149964,
        person_name: "blanca",
        lastname: 'blacido aparicio'
    }
];

const users = [
    {
        user_id: uuidv4(),
        role_id: roles[0].role_id,
        person_id: people[0].person_id,
        user_name: 'User',
        password: '123456',
        date_register: date
    },
];

const sales = [
    {
        sale_id: uuidv4(),
        user_id: users[0].user_id,
        method: 'card',
        date_register: date,
        total: 15795,
    },
    {
        sale_id: uuidv4(),
        user_id: users[0].user_id,
        method: 'card',
        date_register: date,
        total: 20348,
    },
    {
        sale_id: uuidv4(),
        user_id: users[0].user_id,
        method: 'cash',
        date_register: date,
        total: 3040,
    },
    {
        sale_id: uuidv4(),
        user_id: users[0].user_id,
        method: 'cash',
        date_register: date,
        total: 4480,
    },
    {
        sale_id: uuidv4(),
        user_id: users[0].user_id,
        method: 'card',
        date_register: date,
        total: 34577,
    },
    {
        sale_id: uuidv4(),
        user_id: users[0].user_id,
        method: 'card',
        date_register: date,
        total: 54246,
    }
];

const detail_sale_products = [
    {
        sale_id:sales[0].sale_id,
        product_id:products[0].product_id,
        quantity: 1,
    },
    {
        sale_id:sales[1].sale_id,
        product_id:products[1].product_id,
        quantity: 1,
    },
    {
        sale_id:sales[2].sale_id,
        product_id:products[2].product_id,
        quantity: 1,
    },
    {
        sale_id:sales[3].sale_id,
        product_id:products[3].product_id,
        quantity: 1,
    },
    {
        sale_id:sales[4].sale_id,
        product_id:products[4].product_id,
        quantity: 1,
    },
    {
        sale_id:sales[5].sale_id,
        product_id:products[5].product_id,
        quantity: 1,
    }
];

export { categories, stock, products, detail_sale_products, sales, users, roles, people };