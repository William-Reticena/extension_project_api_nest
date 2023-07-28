import { PageEnum } from '@/helpers/enums'

export const pageInfosHandler = (
  itemCount: number,
  page = PageEnum.PAGE_DEFAULT,
  pageSize = PageEnum.PAGE_SIZE_DEFAULT,
) => {
  const pageInfos = {
    currentPage: Number(page),
    totalPages: Math.ceil(itemCount / pageSize),
    totalItems: itemCount,
    itemsPerPage: Number(pageSize),
  }

  return pageInfos
}
