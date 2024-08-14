import { Cake } from '@prisma/client'
import { CakesRepository } from '../repositories/cakes-repository'

interface UpdateCakeUseCaseRequest {
  cakeId: string
  flavor: string
  filling: string
  description: string
  price: string
  isSpecialFlavor?: boolean
  isSolded?: boolean
}

interface UpdateCakeUseCaseResponse {
  cake: Cake
}

export class UpdateCakeUseCase {
  constructor(public cakeRepository: CakesRepository) {}

  async execute({
    cakeId,
    flavor,
    filling,
    description,
    price,
    isSolded,
    isSpecialFlavor,
  }: UpdateCakeUseCaseRequest): Promise<UpdateCakeUseCaseResponse> {
    const cake = await this.cakeRepository.fetchById(cakeId)

    if (!cake) {
      throw new Error()
    }

    cake.flavor = flavor
    cake.filling = filling
    cake.description = description
    cake.price = price
    cake.isSolded = isSolded ?? false
    cake.isSpecialFlavor = isSpecialFlavor ?? false

    await this.cakeRepository.update(cake)

    return { cake }
  }
}
