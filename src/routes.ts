import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/multer';
import { CreateUserController } from "./controllers/user/CreateUserController";
import { valedateSchema } from './middlewares/validateSchema';
import { authUserSchema, createUserSchema } from './schemas/userSchema';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateCategoryController } from './controllers/user/category/CreateCategoryController';
import { ListCategoryController } from './controllers/user/category/ListCategoryController';
import { ListOcorrenciasByCategoryController } from './controllers/user/category/ListOcorrenciasByCategoryController';
import { isAdmin } from './middlewares/isAdmin';
import { createCategorySchema } from './schemas/categorySchema';
import { CreateOcorrenciasController } from './controllers/user/ocorrencia/CreateOcorrencias.Controller';
import { ListOcorrenciaController } from './controllers/user/ocorrencia/ListOcorrenciaController';
import { createOcorrenciaSchema, listOcorrenciasCategorySchema, listOcorrenciaSchema } from './schemas/ocorrenciaSchema';
import { CreateOrdemServicoController } from './controllers/user/ordemServico/CreateOrdemServicoController';
import { createOrdenServicoSchema } from './schemas/ordenServicoSchema';
import { DeleteOcorrenciasController } from './controllers/user/ocorrencia/DeleteOcorrenciasController';
import { ListOrdersController } from './controllers/user/ordemServico/ListOrdersController';
import { RemoveOcorrenciaFromOrdemController } from './controllers/user/ordemServico/RemoveOcorrenciaFromOrdemController';



const router = Router();
const upload = multer(uploadConfig);


router.post('/users', valedateSchema(createUserSchema),
      new CreateUserController().handle
);

// Login de usuário
router.post('/login', valedateSchema(authUserSchema),
      new AuthUserController().handle
);

router.get('/detail', isAuthenticated, new DetailUserController().handle
);

// Criar uma nova categoria
router.post("/category",
      isAuthenticated,
      isAdmin,
      valedateSchema(createCategorySchema),
      new CreateCategoryController().handle)

// Listar todas as categorias
router.get("/category", isAuthenticated, new ListCategoryController().handle);


// Listar ocorrências por categoria
router.get("/category/ocorrencias", isAuthenticated, valedateSchema(listOcorrenciasCategorySchema), new ListOcorrenciasByCategoryController().handle);


// Criar uma nova ocorrência
router.post
      ("/ocorrencias",
            isAuthenticated,
            isAdmin,
            upload.single('file'),
            valedateSchema(createOcorrenciaSchema),
            new CreateOcorrenciasController().handle);

// Listar ocorrências
router.get(
      "/ocorrencias",
      isAuthenticated,
      valedateSchema(listOcorrenciaSchema),
      new ListOcorrenciaController().handle);


// Deletar uma ocorrência
router.delete(
      "/ocorrencias/:id",
      isAuthenticated,
      isAdmin,
      new DeleteOcorrenciasController().handle
);



// Criar ordem de serviço
router.post(
      "/ordem-servico",      
      isAuthenticated,
      valedateSchema(createOrdenServicoSchema),
      new CreateOrdemServicoController().handle);


// Listar ordens de serviço
router.get(
      "/ordem-servico",
      isAuthenticated,
      new ListOrdersController().handle);



// Remover ocorrência de uma ordem de serviço por número
router.delete(
      "/ordem-servico",
      
      isAuthenticated,
      new RemoveOcorrenciaFromOrdemController().handle
);

export { router };
