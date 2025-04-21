# PvvMVC | Framework
Dependências:
- ✅ Express
- ✅ TypeScript
- ✅ Logger (Pino)
- ✅ TypeORM
- ✅ Sqlite3

## @ApiController
Registro automático de rotas no express.
Devem herdar de `GenericController`.
```typescript
@ApiController
export default class HelloWorldController extends GenericController<HelloWorldEntity> {

    @Get('/testando')
    async testando(req: Request,res: Response){
        res.send('Olha aí a rota aí, óh.');
    }
}
```

## @RegisterEntity
Registro automático da entidade no TypeORM
```typescript
@RegisterEntity
@Entity()
export class User extends ModelEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number
}
```

## @InjectService
Injeta automaticamente o service no InversifyJS.
Deve herdar de `GenericService`.

## @InjectRepository
Injeta automaticamente o repository no InversifyJS.
Deve herdar de `GenericRepository`.