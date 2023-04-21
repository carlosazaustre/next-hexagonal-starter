interface PaginationProps {
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

export function Pagination({ currentPage, setCurrentPage }: PaginationProps): JSX.Element {
	const startPage = currentPage - 1;
	const endPage = currentPage + 2;
	const pages = Array.from({
		length: endPage - startPage
	}, (_, i) => i + startPage);

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
				{pages.map(page => (
					<button
						key={page}
						className={`btn btn-primary${currentPage === page ? ' btn-outline' : ''}`}
						onClick={() => setCurrentPage(page)}
					>
						{page}
					</button>
				))}
				<button
					className="btn btn-primary"
					onClick={() => setCurrentPage(currentPage + 1)}
				>
                Siguiente
				</button>
			</div>
		</div>
	);
}