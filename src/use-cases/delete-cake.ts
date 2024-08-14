import { CakesRepository } from '../repositories/cakes-repository'

interface DeleteCakeUseCaseRequest {
  cakeId: string
}

export class DeleteCakeUseCase {
  constructor(public cakeRepository: CakesRepository) {}

  async execute({ cakeId }: DeleteCakeUseCaseRequest) {
    const cake = await this.cakeRepository.fetchById(cakeId)

    if (!cake) {
      throw new Error()
    }

    await this.cakeRepository.delete(cake)
  }
}
