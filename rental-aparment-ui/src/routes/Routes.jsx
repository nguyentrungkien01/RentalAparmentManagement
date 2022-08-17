// pages
import Home from '../pages/Home';
import Motel from '../pages/Motel';
import Contact from '../pages/Contact';
import Location from '../pages/Location';
import Policy from '../pages/Policy';

// public Routes
const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/nha-tro',
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
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
