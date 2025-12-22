import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "boxsa",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        sessionToken: { label: "Session Token", type: "text" },
      },
      async authorize(credentials) {
        // IMPORTANT:
        // We trust backend, not frontend
        if (!credentials?.sessionToken) return null;

        return {
          id: credentials.email,
          email: credentials.email,
          sessionToken: credentials.sessionToken,
        };
      },
    }),

    // Keep Google for later
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt" as const,
  },

  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.sessionToken = user.sessionToken;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      session.user.email = token.email;
      session.user.sessionToken = token.sessionToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };