import AdminJS from "adminjs";
import AdminJSFastify from "@adminjs/fastify";
import * as AdminJSMongoose from "@adminjs/mongoose";
import * as Models from "../models/index.js";
import { authenticate, COOKIE_PASSWORD, sessionStore } from "./config.js";
import { dark, light, noSidebar } from "@adminjs/themes";
import path from 'path';
import { fileURLToPath } from 'url';
import { ComponentLoader } from 'adminjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize AdminJS and register adapter
AdminJS.registerAdapter(AdminJSMongoose);

// Initialize component loader
const componentLoader = new ComponentLoader();

// Component paths
const loginPath = path.join(__dirname, 'components', 'login-component.js');
const dashboardPath = path.join(__dirname, 'components', 'dashboard-component.js');

console.log('Login component path:', loginPath);
console.log('Dashboard component path:', dashboardPath);

// Register components
componentLoader.add('Dashboard', dashboardPath);
componentLoader.override('Login', loginPath);

export const admin = new AdminJS({
  resources: [
    {
      resource: Models.Customer,
      options: {
        listProperties: ["phone", "role", "isActivated"],
        filterProperties: ["phone", "role"],
      },
    },
    {
      resource: Models.DeliveryPartner,
      options: {
        listProperties: ["email", "role", "isActivated"],
        filterProperties: ["email", "role"],
      },
    },
    {
      resource: Models.Admin,
      options: {
        listProperties: ["email", "role", "isActivated"],
        filterProperties: ["email", "role"],
        actions: {
          list: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
          edit: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
          delete: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
        },
      },
    },
    {
      resource: Models.Vendor,
      options: {
        listProperties: ["email", "businessName", "isActivated"],
        filterProperties: ["email", "businessName", "isActivated"],
        actions: {
          list: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
          edit: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
          delete: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
        },
      },
    },
    {
      resource: Models.Branch,
      options: {
        actions: {
          list: { isAccessible: ({ currentAdmin }) => true },
          edit: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
          delete: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
        },
      },
    },
    {
      resource: Models.Product,
      options: {
        actions: {
          list: { isAccessible: ({ currentAdmin }) => true },
          edit: { isAccessible: ({ currentAdmin }) => true },
          delete: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
        },
      },
    },
    {
      resource: Models.Category,
      options: {
        actions: {
          list: { isAccessible: ({ currentAdmin }) => true },
          edit: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
          delete: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
        },
      },
    },
    {
      resource: Models.Order,
      options: {
        actions: {
          list: { isAccessible: ({ currentAdmin }) => true },
          edit: { isAccessible: ({ currentAdmin }) => true },
          delete: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
        },
      },
    },
    { resource: Models.Counter },
  ],
  branding: {
    companyName: "ZAVE",
    withMadeWithLove: false,
    logo: false,
  },
  dashboard: {
    component: 'Dashboard'
  },
  defaultTheme: dark.id,
  availableThemes: [dark, light, noSidebar],
  rootPath: '/admin',
  loginPath: '/admin/login',
  logoutPath: '/admin/logout',
  componentLoader,
  assets: {
    styles: ['/styles/admin.css'],
  },
});

export const buildAdminRouter = async (app) => {
  await AdminJSFastify.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookiePassword: COOKIE_PASSWORD,
      cookieName: 'adminjs',
      loginPath: '/admin/login',
      logoutPath: '/admin/logout',
    },
    app,
    {
      store: sessionStore,
      saveUninitialized: true, 
      secret: COOKIE_PASSWORD,
      cookie: {
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
      },
    }
  );
};