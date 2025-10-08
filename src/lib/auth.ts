import { betterAuth } from 'better-auth';
import { Pool } from 'pg';
import { customSession } from 'better-auth/plugins';
import { sendEmail } from './utils/email';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // Maximum number of connections in the pool
  min: 5, // Minimum number of connections in the pool
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  connectionTimeoutMillis: 5000 // Timeout when trying to connect
});

export const auth = betterAuth({
  database: pool,
  emailVerification: {
    sendOnSignUp: true,
    requireEmailVerification: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await sendEmail({
        purpose: 'verify-email',
        email: user.email,
        url: `${url}?token=${token}`
      });
    },
    async afterEmailVerification(user, request) {
      // Your custom logic here, e.g., grant access to premium features
      console.log(`${user.email} has been successfully verified!`);
    }
  },
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      await sendEmail({
        purpose: 'reset-password',
        email: user.email,
        url: `${url}?token=${token}`
      });
    },
    onPasswordReset: async ({ user }, request) => {
      // your logic here
      console.log(`Password for user ${user.email} has been reset.`);
    }
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      getUserInfo: async (token) => {
        // Custom implementation to get user info
        const response = await fetch(
          'https://www.googleapis.com/oauth2/v2/userinfo',
          {
            headers: {
              Authorization: `Bearer ${token.accessToken}`
            }
          }
        );
        const profile = await response.json();
        console.log(profile);
        return {
          user: {
            id: profile.id,
            name: profile.name,
            email: profile.email,
            image: profile.picture,
            emailVerified: profile.verified_email
          },
          data: profile
        };
      }
    }
  },
  plugins: [
    customSession(async ({ user, session }) => {
      // const roles = findUserRoles(session.session.userId);
      return {
        // roles,
        user: {
          ...user,
          newField: 'newField'
        },
        session
      };
    })
  ]
});

export type Session = typeof auth.$Infer.Session;
