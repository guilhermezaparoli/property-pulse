
interface PaginationProps {
    page: number,
    pageSize: number,
    totalItems: number,
    onPageChange: (newValue: number) => void
}

const Pagination = ({page, pageSize, totalItems, onPageChange}: PaginationProps) => {
    const totalPages = Math.ceil(totalItems / pageSize);

    function handlePageChange(newPage: number){
        if(newPage >= 1 && newPage <= totalPages){
            onPageChange(newPage)
        }
    }
  return (
    <section className="container mx-auto flex justify-center items-center my-8">
    <button className="mr-2 px-2 py-1 border border-gray-300 rounded" disabled={page === 1} onClick={() => handlePageChange(page - 1)}>
      Voltar
    </button>
    <span className='mx-2'>
      Page {page} of {totalPages}
    </span>
    <button
      className='ml-2 px-2 py-1 border border-gray-300 rounded' disabled={page === totalPages} onClick={() => handlePageChange(page + 1)}>
      Avançar
    </button>
  </section>
  )
}

export default Pagination
