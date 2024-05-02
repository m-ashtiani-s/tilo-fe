import {NextAuthConfig} from 'next-auth';

export const authConfig={
    pages:{
    },
    callbacks:{
        
    },
    providers:[],
    secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig