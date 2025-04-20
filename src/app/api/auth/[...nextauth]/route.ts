import { JWT } from "next-auth/jwt";
import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth as firebaseAuth } from "../../../../../firebase-config";

interface FirebaseUser {
  uid: string;
  email: string;
  displayName: string | null;
}

// Firebase Sign Up Function
const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User signed up:", user);
    return user;
  } catch (error) {
    console.error("Error signing up:", error);
    return null;
  }
};

// Firebase Sign In Function
const signInUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User signed in:", user);
    return user;
  } catch (error) {
    console.error("Error signing in:", error);
    return null;
  }
};

export const authOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials: Record<string, string>) {
        let user = null;

        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error("❌ Email and password are required !");
        }

        // check for the user in DB
        const user = await 

      },
    }),
  ],
  session: {
    strategy: "jwt", // Using JWT to manage sessions
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User | null }) {
      // Add Firebase User data to JWT token after sign-in/sign-up
      if (user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const firebaseUser = user as FirebaseUser;

        token.id = firebaseUser.uid;
        token.email = firebaseUser.email;
        token.displayName = firebaseUser.displayName || null;
      }
      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: { session: any; token: JWT }) {
      // Add token info to session object
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.displayName = token.displayName;
      return session;
    },
  },
};

export default NextAuth(authOptions);
