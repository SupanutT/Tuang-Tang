export { default } from 'next-auth/middleware';

export const config = {
    // Specify the routes where this middleware should be applied
    matcher: ['/mybill/:path*', '/otherbill/:path*']
}
