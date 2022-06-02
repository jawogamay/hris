import Group from '@/icons/Group';
import Category from '@/icons/Category';
import Calendar from '@/icons/Calendar';
import Cart from '@/icons/Cart';
import Connect from '@/icons/Connect';
import People from '@/icons/People';
import Bookmark from '@/icons/Bookmark';
import Calculator from '@/icons/Calculator';
import Help from '@/icons/Help';

export const NAV_ITEMS = [
  {
    href: ['/dashboard'],
    tag: 'category',
    Component: Category,
  },
  {
    href: [
      '/recipes',
      '/meal-plans',
      '/meal-plan-store',
      '/recipes/[id]',
      '/recipes/new',
      '/recipes/import',
    ],
    tag: 'group',
    Component: Group,
  },
  {
    href: ['#'],
    tag: 'calendar',
    Component: Calendar,
  },
  {
    href: ['#'],
    tag: 'cart',
    Component: Cart,
  },
  {
    href: ['#'],
    tag: 'connect',
    Component: Connect,
  },
  {
    href: ['#'],
    tag: 'people',
    Component: People,
  },
  {
    href: ['#'],
    tag: 'bookmark',
    Component: Bookmark,
  },
  {
    href: ['#'],
    tag: 'calculator',
    Component: Calculator,
  },
  {
    href: ['#'],
    tag: 'help',
    Component: Help,
  },
];
