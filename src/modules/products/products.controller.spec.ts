import { Test, TestingModule } from '@nestjs/testing'
import { ProductsController } from './controllers/products.controller'
import { ProductsService } from './services/products.service'

describe('ProductsController', () => {
    let controller: ProductsController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductsController],
            providers: [ProductsService],
        }).compile()

        controller = module.get(ProductsController) as ProductsController
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
