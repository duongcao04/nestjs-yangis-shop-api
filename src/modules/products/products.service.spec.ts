import { Test, TestingModule } from '@nestjs/testing'
import { ProductsService } from './services/products.service'

describe('ProductsService', () => {
    let service: ProductsService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ProductsService],
        }).compile()

        service = module.get(ProductsService) as ProductsService
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
