import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/multer';
import { CreateUserController } from "./controllers/user/CreateUserController";
import { valedateSchema } from './middlewares/validateSchema';
import { authUserSchema, createUserSchema } from './schemas/userSchema';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { ListOcorrenciasByCategoryController } from './controllers/category/ListOcorrenciasByCategoryController';
import { isAdmin } from './middlewares/isAdmin';
import { createCategorySchema } from './schemas/categorySchema';
import { CreateOcorrenciasController } from './controllers/ocorrencia/CreateOcorrencias.Controller';
import { ListOcorrenciaController } from './controllers/ocorrencia/ListOcorrenciaController';
import { createOcorrenciaSchema, listOcorrenciasCategorySchema, listOcorrenciaSchema } from './schemas/ocorrenciaSchema';
import { CreateOrdemServicoController } from './controllers/ordemServico/CreateOrdemServicoController';
import { createOrdenServicoSchema, detailOrdenServicoSchema, finishOrdenServicoSchema, sendOrdenServicoSchema } from './schemas/ordenServicoSchema';
import { DeleteOcorrenciasController } from './controllers/ocorrencia/DeleteOcorrenciasController';
import { ListOrdersController } from './controllers/ordemServico/ListOrdersController';
import { RemoveOcorrenciaFromOrdemController } from './controllers/ordemServico/RemoveOcorrenciaFromOrdemController';
import { DetailOrdemServicoController } from './controllers/ordemServico/DetailOrdemServicoController';
import { SendOrdemController } from './controllers/ordemServico/SendOrdemController';
import { FinishOrdemServicoController } from './controllers/ordemServico/FinishOrdemServicoController';





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


// Detalhar ordem de serviço
router.get(
      "/ordem-servico/detail",
      isAuthenticated,
      valedateSchema(detailOrdenServicoSchema),
      new DetailOrdemServicoController().handle
);



// Remover ocorrência de uma ordem de serviço por número
router.delete(
      "/ordem-servico",
      
      isAuthenticated,
      new RemoveOcorrenciaFromOrdemController().handle
);


// Enviar ordem de serviço
router.put(
      "/ordem-servico",
      isAuthenticated,
      valedateSchema(sendOrdenServicoSchema),
      new SendOrdemController().handle
);


  router.put(
      "/ordem-servico/finish",
      isAuthenticated,
      valedateSchema(finishOrdenServicoSchema),
      new FinishOrdemServicoController().handle
  );

export { router };
