export default {
    port:process.env.PORT || 3000,
    secretyKey: process.env.SECRETYKEY || '48d51971-d9e9-4e81-97fe-b0867fdfffea',
    publicRoutes: process.env.PUBLICROUTES || [
        //aqui vem todas as rotas que seram publicas
        'users/create',
        'users/auth',
        'mercado/create',
        'mercado/auth2'
    ]
}