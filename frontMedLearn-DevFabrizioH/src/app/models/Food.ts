import { Diet } from "./Diet"

export class Food
{
  idFood: number=0
  nameFood: string=""
  portionFood: number=0
  typeQuantityFood: string=""
  proteinsFood: number=0
  fatsFood: number=0
  carbohydratesFood: number=0
  fiberFood: number=0
  cholesterolFood: number=0
  sodiumFood: number=0
  diet:Diet=new Diet()
}
