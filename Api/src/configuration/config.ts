export default {
    port: process.env.PORT || 3000,
    folderStorage: process.env.URL_STORAGE ||"./storage",
    pictureQuality: process.env.PICTURE_QUALITY || 80,
    secretyKey: process.env.SECRETYKEY || '48d51971-d9e9-4e81-97fe-b0867fdfffea',
    publicRoutes: process.env.PUBLICROUTES || [
        //aqui vem todas as rotas que seram publicas
        'users/create',
        'users/auth',
        'storage', 
        'mercado/create',
        'mercado/auth2',
    ]
}