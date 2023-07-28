import { PageEnum } from '@/helpers/enums'

export const pageSkipHandler = (
  page = PageEnum.PAGE_DEFAULT,
  pageSize = PageEnum.PAGE_SIZE_DEFAULT,
) => (page - 1) * pageSize
