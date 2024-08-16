import { Cake, Prisma } from '@prisma/client'

export interface CakesRepository {
  fetchAllCakes(): Promise<Cake[]>
  fetchById(cakeId: string): Promise<Cake | null>
  countCakes(cakeId: string): Promise<number>
  addCakeById(cakeId: string): Promise<number>

  create(data: Prisma.CakeCreateInput): Promise<Cake>
  update(cake: Cake): Promise<Cake>
  delete(cake: Cake): Promise<void>
}
