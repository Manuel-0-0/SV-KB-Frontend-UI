import { lazy } from 'react';

export const Home = lazy(() => import('./pages/Home'))

export const Article = lazy(() => import('./pages/Article'))

export const Articles = lazy(() => import('./pages/Articles'))

export const Create = lazy(() => import('./pages/Create'))