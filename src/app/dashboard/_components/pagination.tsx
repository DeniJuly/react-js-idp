import { Button } from "@/components/ui/button";
import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  loading: boolean;
  totalData: number;
}

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  loading,
  totalData,
}: PaginationProps) => {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <p className="text-sm text-gray-500">Total Data {totalData}</p>
      <Button
        variant="outline"
        size="sm"
        disabled={loading || currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        disabled={loading || currentPage === totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
