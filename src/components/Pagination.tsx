interface PaginationProps {
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

export function Pagination({ currentPage, setCurrentPage }: PaginationProps): JSX.Element {
    return (
        <div className="mx-auto text-center">
            <div className="btn-group">
            <button
                className="btn btn-primary"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
            >
                Anterior
            </button>
            <button className="btn btn-primary btn-outline">{currentPage}</button>
            <button
                className="btn btn-primary"
                onClick={() => setCurrentPage(currentPage + 1)}
            >
                Siguiente
            </button>
            </div>
      </div>
    )
}