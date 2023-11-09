export const SearchBar = ({ searchFilter, setSearchFilter }) => {
  const handleSearchChange = (event) => {
    setSearchFilter(event.target.value);
  };

  return (
    <div className="search-bar">
      <div className="relative">
        <svg
          className="absolute top-[22%] left-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
        >
          <path d="M36.1,4.9C19,4.9,4.9,19,4.9,36.1c0,17.3,14,31.3,31.2,31.3c6.4,0,12.3-2,17.3-5.2c0,0,30.5,30.5,31,31  c2.4,2.4,6.3,2.4,8.8,0c2.4-2.5,2.4-6.4,0-8.8c-0.4-0.3-31-31-31-31c3.2-5,5.2-10.9,5.2-17.3C67.5,19,53.5,4.9,36.1,4.9L36.1,4.9z   M36.1,60c-13.1,0-23.6-10.7-23.6-23.8c0-13.1,10.6-23.6,23.6-23.6C49.3,12.5,60,23.1,60,36.1C60,49.3,49.3,60,36.1,60z"></path>
        </svg>
        <input
          className="py-1 border text-center border-slate-950"
          type="text"
          value={searchFilter}
          maxLength="20"
          spellCheck="false"
          onChange={handleSearchChange}
        />
      </div>
      <p className="pt-1 text-sm italic text-slate-700">
        Search by station name or address
      </p>
    </div>
  );
};

export default SearchBar;
