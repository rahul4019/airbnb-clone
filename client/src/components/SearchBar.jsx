import React from 'react';

const SearchBar = () => {
  return (
    <>
      <div className="flex w-3/5 md:w-1/2 bg-gray-300 border border-gray-400 rounded-full overflow-hidden shadow-sm hover:shadow-lg">
        <div className="grow">
          <input
            type="search"
            placeholder="Where you want to go?"
            className="w-full py-2 px-4 border-none focus:outline-none font-semibold text-sm md:text-lg"
          />
        </div>
        <div className="flex  bg-blue text-white cursor-pointer">
          <button className="flex py-2 px-4 md:p-2 bg-primary rounded-r-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-4 h-4 mt-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <span className="hidden md:block ml-1">Search</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
