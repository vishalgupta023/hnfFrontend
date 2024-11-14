import React from 'react';

interface ItemsPerPageOptionsProps {
  perPage: number;
  setPerPage: (n: number) => void;
  setCurrentPage: (n: number) => void;
}

export default function ItemsPerPageOptions({
  perPage,
  setPerPage,
  setCurrentPage,
}: ItemsPerPageOptionsProps) {
  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reset to page 1 on change
  };

  return (
    <div className="mb-4 flex justify-end">
      <label htmlFor="perPage" className="mr-2">
        Rows per page:
      </label>
      <select
        id="perPage"
        value={perPage}
        onChange={handlePerPageChange}
        className="border px-2 py-1 rounded"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  );
}
