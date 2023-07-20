import { RA_RANGE_ENUM } from '@/helpers/enums'
import { generateRandomNumber } from './random-number-generator'

export const generateRA = (raArray: number[]) => {
  const ra = generateRandomNumber(RA_RANGE_ENUM.min, RA_RANGE_ENUM.max)

  if (raArray.includes(ra)) generateRA(raArray)

  return ra
}
