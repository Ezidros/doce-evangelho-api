import { Cake } from '@prisma/client'
import { CakesRepository } from '../../repositories/cakes-repository'

interface CreateCakeUseCaseRequest {
  flavor: string
  filling: string
  description: string
  price: number
  isSpecialFlavor?: boolean
  isSolded?: boolean
}

interface CreateCakeUseCaseResponse {
  cake: Cake
}

export class CreateCakeUseCase {
  constructor(public cakeRepository: CakesRepository) {}

  async execute({
    flavor,
    filling,
    description,
    price,
    isSolded,
    isSpecialFlavor,
  }: CreateCakeUseCaseRequest): Promise<CreateCakeUseCaseResponse> {
    const cake = await this.cakeRepository.create({
      flavor,
      filling,
      description,
      price,
      isSolded: isSolded ?? false,
      isSpecialFlavor: isSpecialFlavor ?? false,
    })

    return { cake }
  }
}
