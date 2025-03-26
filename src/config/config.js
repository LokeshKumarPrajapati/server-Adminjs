import "dotenv/config";
import fastifySession from "@fastify/session";
import ConnectMongoDBSession from "connect-mongodb-session";
import { Admin, Vendor } from "../models/index.js";
import bcrypt from 'bcrypt';

export const PORT = process.env.PORT || 3000;
export const COOKIE_PASSWORD = process.env.COOKIE_SECRET || 'some-secret-password-used-to-secure-cookie';

const MongoDBStore = ConnectMongoDBSession(fastifySession);

export const sessionStore = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: "sessions"
});

sessionStore.on('error', (error) => {
    console.error("Session store error:", error);
});

export const authenticate = async (email, password) => {
    try {
        // Check both Admin and Vendor collections
        const [adminUser, vendorUser] = await Promise.all([
            Admin.findOne({ email }),
            Vendor.findOne({ email })
        ]);

        const user = adminUser || vendorUser;
        
        // No user found
        if (!user) {
            return null;
        }

        // Verify password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return null;
        }

        // Check account activation
        if (!user.isActivated) {
            throw new Error('Account is not activated. Please contact support.');
        }

        // Determine user type
        const role = adminUser ? 'admin' : 'vendor';
        const title = role === 'admin' 
            ? 'Administrator' 
            : user.businessName || 'Vendor';

        return {
            email: user.email,
            role: role,
            id: user._id,
            title: title
        };
    } catch (error) {
        console.error('Authentication error:', error);
        throw new Error('Login failed. Please try again.');
    }
};