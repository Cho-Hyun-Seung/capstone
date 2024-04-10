import { Pagination } from '@mui/material'

const Pagenation = (props: any) => {
  const handleChange = (event: any, pageNum: any) => {
    props.setPage(pageNum)
  }
  return (
    <Pagination
      page={props.page}
      onChange={handleChange}
      count={props.maxPage}
    />
  )
}

export default Pagenation
