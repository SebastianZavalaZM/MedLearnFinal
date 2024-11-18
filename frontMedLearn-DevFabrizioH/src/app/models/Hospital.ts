import { Users } from "./Users"

export class Hospital {
  idHospital: number=0 //input
  nameHospital: string="" //input
  latitudeHospital: number=0 //input
  longitudeHospital: number=0 //input
  addressHospital: string="" //select
  contactHospital: string="" //input
  counterViewsHospital: number=0 //input
  user: Users = new Users()
}
