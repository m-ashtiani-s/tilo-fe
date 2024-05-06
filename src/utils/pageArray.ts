export function getPageNumbers(totalPages: number) {
	var pageNumbers = [];
	for (var i = 1; i <= totalPages; i++) {
		pageNumbers.push(i);
	}
	return pageNumbers;
}
export function getPageNumbersB(totalPages: number, page: number) {
	let pages = [];

	if (page == 1 || page == 2) {
		pages = [1, 2, 3, 4, 5];
	} else if (page == totalPages || page == totalPages - 1) {
		pages = [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
	} else {
		pages = [page - 2, page - 1, page, page + 1, page + 2];
	}

	return pages;
}
