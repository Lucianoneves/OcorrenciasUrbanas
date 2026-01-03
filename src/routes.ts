import { Router } from 'express';
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



const router = Router();


router.post('/users', valedateSchema(createUserSchema), 
 new CreateUserController().handle
);

router.post('/login', valedateSchema(authUserSchema),
 new AuthUserController().handle
);

router.get('/detail', isAuthenticated,  new DetailUserController().handle
);

router.post ("/category",
     isAuthenticated,
      isAdmin,
      valedateSchema(createCategorySchema),
      new CreateCategoryController().handle)
      
  
router.get("/category", isAuthenticated, new ListCategoryController().handle);
  
    

export  {router};
