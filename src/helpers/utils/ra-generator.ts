import { RaRangeEnum } from '@/helpers/enums'
import { generateRandomNumber } from './random-number-generator'

export const generateRA = (raArray: number[]) => {
  const ra = generateRandomNumber(RaRangeEnum.MIN, RaRangeEnum.MAX)

  if (raArray.includes(ra)) generateRA(raArray)

  return ra
}
