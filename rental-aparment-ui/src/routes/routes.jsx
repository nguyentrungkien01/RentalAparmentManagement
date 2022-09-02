// pages
import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Motel from '../pages/Motel';
import Cart from '../pages/Cart';
import Contact from '../pages/Contact';
import Location from '../pages/Location';
import Policy from '../pages/Policy';
import PostCreate from '../pages/PostCreate';

import Signup from '../pages/Auth/Signup';
import Signin from '../pages/Auth/Signin';

import AdminHome from '../pages/Admin/AdminHome';
import Customers from '../pages/Admin/Customers';
import AddCustomer from '../components/Admin/customer/AddCustomer';
import EditCustomer from '../components/Admin/customer/EditCustomer';
import Posts from '../pages/Admin/Posts';
import Statistic from '../pages/Admin/Statistic';
import AccountInfoItem from '../components/AccountInfoItem';

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
    {
        path: '/tao-bai-viet',
        component: PostCreate,
    },
    {
        path: '/thong-tin-ca-nhan',
        component: AccountInfoItem,
    },
];

// admin Routes
const privateRoutes = [
    {
        path: '/admin',
        component: AdminHome,
    },
    {
        path: '/admin/thong-tin-ca-nhan',
        component: AccountInfoItem,
    },
    {
        path: '/admin/nguoi-dung',
        component: Customers,
    },
    {
        path: '/admin/nguoi-dung/them',
        component: AddCustomer,
    },
    {
        path: '/admin/nguoi-dung/chinh-sua/:id',
        component: EditCustomer,
    },
    {
        path: '/admin/bai-viet',
        component: Posts,
    },
    {
        path: '/admin/thong-ke',
        component: Statistic,
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
