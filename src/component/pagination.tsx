import * as React from "react";

interface PaginationProps {
  indexOfFirstUser: number;
  indexOfLastUser: number;
  processedUsersLength: number;
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  indexOfFirstUser,
  indexOfLastUser,
  processedUsersLength,
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  // Function to generate page buttons based on the current page and total pages
  const generateButton = () => {
    const pageButtons: React.JSX.Element[] = [];
    const maxPagesToShow = 5;
    const ellipsis = <span className="px-2 py-1">...</span>;

    // Simplified logic for mobile: Only show Previous, Current Page, and Next
    const isMobile = window.innerWidth < 640; // Adjust this breakpoint (sm: 640px)

    if (isMobile) {
      // On mobile, only show the current page
      pageButtons.push(
        <button
          key={currentPage}
          className="bg-blue-500 px-2 py-1 border rounded text-white"
        >
          {currentPage}
        </button>
      );
    } else if (totalPages <= maxPagesToShow) {
      // If total pages are less than maxPagesToShow, show all
      for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-2 py-1 border rounded ${
              currentPage === i ? "bg-blue-500 text-white" : ""
            }`}
          >
            {i}
          </button>
        );
      }
    } else {
      // First page
      pageButtons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`px-2 py-1 border rounded ${
            currentPage === 1 ? "bg-blue-500 text-white" : ""
          }`}
        >
          1
        </button>
      );

      // Add ... if currentPage > 3
      if (currentPage > 3) {
        pageButtons.push(ellipsis);
      }

      // Show pages near currentPage
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-2 py-1 border rounded ${
              currentPage === i ? "bg-blue-500 text-white" : ""
            }`}
          >
            {i}
          </button>
        );
      }

      // Add ... if currentPage < totalPages - 2
      if (currentPage < totalPages - 2) {
        pageButtons.push(ellipsis);
      }

      // Final page
      pageButtons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`px-2 py-1 border rounded ${
            currentPage === totalPages ? "bg-blue-500 text-white" : ""
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <div className="flex sm:flex-row flex-col sm:justify-between items-center gap-2 mt-4">
      <div className="dark:text-gray-200 sm:text-left text-center">
        Showing {indexOfFirstUser + 1} to{" "}
        {Math.min(indexOfLastUser, processedUsersLength)} of{" "}
        {processedUsersLength} entries
      </div>
      <div className="flex gap-1 sm:gap-2 dark:text-gray-200">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="disabled:opacity-50 px-2 py-1 border rounded"
        >
          Previous
        </button>
        {generateButton()}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="disabled:opacity-50 px-2 py-1 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
