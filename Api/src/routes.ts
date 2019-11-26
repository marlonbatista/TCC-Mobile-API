import {UserController} from "./controller/UserController";
import { MercadoController } from "./controller/MercadoController";
import { ImgsController } from "./controller/ImgController";
import { ProdutosController } from "./controller/ProdutosController";
import { CarrinhoController } from "./controller/ShoppingCartController";
import { CarrinhoProdutoController } from "./controller/CarrinhoProdutoController";
import { StorageController } from "./controller/StorageController";
import { CompraFinalizadaController } from "./controller/FinishingShoppingController";

export const Routes = [

//Route to users
{ method: "get",route: "/users",controller: UserController,action: "all" },
{ method: "get",route: "/users/:id",controller: UserController,action: "one" }, 
{ method: "post",route: "/users",controller: UserController,action: "save" },
{ method: "post",route: "/users/create",controller: UserController,action: "createUser" },
{ method: "post",route: "/users/auth",controller: UserController,action: "auth" },
{ method: "delete",route: "/users/:id",controller: UserController,action: "remove" },


//Route to Pictures
{ method: "get",route: "/imgs",controller: ImgsController,action: "all" },
{ method: "get",route: "/imgs/:id",controller: ImgsController,action: "one" }, 
{ method: "post",route: "/imgs",controller: ImgsController,action: "save" },
{ method: "delete",route: "/imgs/:id",controller: ImgsController,action: "remove" },


//Route to Products
{ method: "get",route: "/produtos",controller: ProdutosController,action: "all" },
{ method: "get",route: "/produtos/:id",controller: ProdutosController,action: "one" }, 
{ method: "get",route: "/prodMercado/:id",controller: ProdutosController,action: "pegaMercado" }, 
{ method: "post",route: "/produtos",controller: ProdutosController,action: "save" },
{ method: "delete",route: "/produtos/:id",controller: ProdutosController,action: "remove" },



//Route to Store
{ method: "get",route: "/mercado",controller: MercadoController,action: "all" },
{ method: "get",route: "/mercado/:id",controller: MercadoController,action: "one" }, 
{ method: "post",route: "/mercado",controller: MercadoController,action: "save" },
{ method: "post",route: "/mercado/create",controller: MercadoController,action: "createMercado" },
{ method: "post",route: "/mercado/auth2",controller: MercadoController,action: "auth" },
{ method: "delete",route: "/mercado/:id",controller: MercadoController,action: "remove" },

//Route to carrinho
{ method: "get",route: "/carrinho",controller: CarrinhoController,action: "all" },
{ method: "get",route: "/carrinho/:id",controller: CarrinhoController,action: "one" }, 
{ method: "get",route: "/pegaCarrinho/:id",controller: CarrinhoController,action: "pegaCarrinho" }, 
{ method: "post",route: "/carrinho",controller: CarrinhoController,action: "save" },    
{ method: "delete",route: "/carrinho/:id",controller: CarrinhoController,action: "remove" },
{ method: "get",route: "/carrinho/verifica/:id",controller: CarrinhoController,action: "verifica" },


//Route to carrinho
{ method: "get",route: "/Carrinho_Cod_Produto_Produtos",controller: CarrinhoProdutoController,action: "all" },
{ method: "get",route: "/Carrinho_Cod_Produto_Produtos/:id",controller: CarrinhoProdutoController,action: "one" }, 
{ method: "get",route: "/pegaCarrinho_Cod_Produto_Produtos/aqui/:id",controller: CarrinhoProdutoController,action: "pegaTudo" }, 
{ method: "get",route: "/pegaCarrinho_Cod_Produto_Produtos/teste/:id",controller: CarrinhoProdutoController,action: "pegaProduto" }, 
{ method: "post",route: "/Carrinho_Cod_Produto_Produtos",controller: CarrinhoProdutoController,action: "save" },    
{ method: "delete",route: "/Carrinho_Cod_Produto_Produtos/:id",controller: CarrinhoProdutoController,action: "remove" },

//Route to Finalizar Carrinho
{ method: "get", route: "/CompraFinalizada/:id", controller: CompraFinalizadaController, action:"pagaConta"},
{ method: "get", route: "/CompraFinalizada/user/:id", controller: CompraFinalizadaController, action:"pegaCompra"},
{ method: "get", route: "/CompraFinalizada/produtos/:id", controller: CompraFinalizadaController, action:"pegaCarrinhoProdutos"},
{ method: "get", route: "/CompraFinalizada/clientes/:id", controller: CompraFinalizadaController, action:"clienteMercado"},
{ method: "post", route: "/CompraFinalizada", controller: CompraFinalizadaController, action:"save"},
{ method: "delete", route: "/CompraFinalizada/:id", controller: CompraFinalizadaController, action:"remove"},
//Rota da Storage
{ method: "get", route: "/storage/:filename", controller: StorageController, action: "getFile" },
];