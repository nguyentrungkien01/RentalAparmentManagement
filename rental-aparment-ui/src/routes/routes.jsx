// pages
import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Motel from '../pages/Motel';
import Cart from '../pages/Cart';
import Contact from '../pages/Contact';
import Location from '../pages/Location';
import Policy from '../pages/Policy';

import Signup from '../pages/Auth/Signup';
import Signin from '../pages/Auth/Signin';

import AdminHome from '../pages/Admin/AdminHome';
import Customers from '../pages/Admin/Customer/Customers';
import Posts from '../pages/Admin/Posts';

// public Routes
const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/nha-tro',
        component: Catalog,
    },
    {
        path: '/nha-tro/:slug',
        component: Motel,
    },
    {
        path: '/dia-diem',
        component: Location,
    },
    {
        path: '/lien-he',
        component: Contact,
    },
    {
        path: '/chinh-sach',
        component: Policy,
    },
    {
        path: '/gio-hang',
        component: Cart,
    },
];

// admin Routes
const privateRoutes = [
    {
        path: '/admin',
        component: AdminHome,
    },
    {
        path: '/admin/nguoi-dung',
        component: Customers,
    },{
        path: '/admin/bai-viet',
        component: Posts,
    },
];

// auth Routes
const authRoutes = [
    {
        path: '/auth/dang-nhap',
        component: Signin,
    },
    {
        path: '/auth/dang-ky',
        component: Signup,
    },
];

export { publicRoutes, privateRoutes, authRoutes };
