"use client";

import { ProductFilters, selectFilters, setFilters } from "../store/filters";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProductFiltering() {
  const productFilters = useSelector(selectFilters);
  const [currentFilters, setCurrentFilters] = useState<ProductFilters>({
    search: "",
    startDate: "",
    endDate: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentFilters(productFilters);
  }, [productFilters]);

  const setSearchFilter = () => {
    dispatch(setFilters(currentFilters));
  };

  const onChangeSearch = (keyword: string) => {
    setCurrentFilters((filters) => {
      return { ...filters, search: keyword };
    });
  };

  const onChangeStartDate = (startDate: string) => {
    const updatedFilters = {...currentFilters, startDate}
    setCurrentFilters((filters) => {
      return updatedFilters;
    });
    dispatch(setFilters(updatedFilters));
  };

  const onChangeEndDate = (endDate: string) => {
    const updatedFilters = {...currentFilters, endDate}
    setCurrentFilters((filters) => {
      return updatedFilters
    });
    dispatch(setFilters(updatedFilters))
  };
  return (
    <>
      <div className="md:mr-4">
        <label className="text-gray-900 font-semibold text-sm">Start Date</label>
        <input
          value={currentFilters.startDate}
          onChange={(e) => onChangeStartDate(e.target.value)}
          className="block p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
          type="date"
          placeholder="Start Date"
        />
      </div>
      <div className="md:mr-4">
        <label className="text-gray-900 font-semibold text-sm">End Date</label>
        <input
          value={currentFilters.endDate}
          onChange={(e) => onChangeEndDate(e.target.value)}
          className="block p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
          type="date"
          placeholder="Start Date"
        />
      </div>

      <div className="mb-4">
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        <div className="relative top-3 md:top-6">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            value={currentFilters?.search}
            onChange={(e) => onChangeSearch(e.target.value)}
            type="search"
            id="search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            required
          />
          <button
            onClick={setSearchFilter}
            type="button"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
}
