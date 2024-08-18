import { Cake } from '@prisma/client'
import { CakesRepository } from '../../repositories/cakes-repository'

interface AddCakeUseCaseRequest {
  cakeId: string
  quantity: number
}

interface AddCakeUseCaseResponse {
  cake: Cake
}

export class AddCakeUseCase {
  constructor(public cakeRepository: CakesRepository) {}

  async execute({
    cakeId,
    quantity,
  }: AddCakeUseCaseRequest): Promise<AddCakeUseCaseResponse> {
    const cakeById = await this.cakeRepository.fetchById(cakeId)

    if (!cakeById) {
      throw new Error()
    }

    cakeById.quantity = quantity

    const cake = (await this.cakeRepository.addCakeById(cakeById))!

    return { cake }
  }
}
