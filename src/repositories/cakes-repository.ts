import { Cake, Prisma } from '@prisma/client'

export interface CakesRepository {
  fetchAllCakes(): Promise<Cake[]>
  fetchById(cakeId: string): Promise<Cake | null>
  addCakeById(cake: Cake): Promise<number | null>

  create(data: Prisma.CakeCreateInput): Promise<Cake>
  update(cake: Cake): Promise<Cake>
  delete(cake: Cake): Promise<void>
}
