export default () => ({
    appUrl: process.env.APP_URL,
    port: parseInt(process.env.PORT, 10) || 3000,
})
