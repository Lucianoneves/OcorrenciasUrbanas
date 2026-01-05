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
import { isAdmin } from './middlewares/isAdmin';
import { createCategorySchema } from './schemas/categorySchema';
import { CreateOcorrenciasController } from './controllers/user/ocorrencia/CreateOcorrencias.Controller';



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


// Criar uma nova ocorrência
router.post
      ("/ocorrencias",
            isAuthenticated,
            isAdmin,           
            upload.single('file'),
            new CreateOcorrenciasController().handle);



export { router };
