import { Pagination } from '@mui/material'

const Pagenation = (props: any) => {
  const handleChange = (_event: any, pageNum: any) => {
    props.setPage(pageNum)
  }
  return (
    <Pagination
      style={{
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'center',
      }}
      size='large'
      page={props.page}
      onChange={handleChange}
      count={props.maxPage}
    />
  )
}

export default Pagenation
