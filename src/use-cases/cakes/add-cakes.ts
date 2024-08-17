import { CakesRepository } from '../../repositories/cakes-repository'

interface AddCakeUseCaseRequest {
  cakeId: string
  quantity: number
}

interface AddCakeUseCaseResponse {
  count: number
}

export class AddCakeUseCase {
  constructor(public cakeRepository: CakesRepository) {}

  async execute({
    cakeId,
    quantity,
  }: AddCakeUseCaseRequest): Promise<AddCakeUseCaseResponse> {
    const cake = await this.cakeRepository.fetchById(cakeId)

    if (!cake) {
      throw new Error()
    }

    if (cake) {
      cake.quantity = quantity
    }

    const count = (await this.cakeRepository.addCakeById(cake))! ?? 1

    return { count }
  }
}
