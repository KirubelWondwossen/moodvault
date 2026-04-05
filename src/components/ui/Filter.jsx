export default function Filter({
  filterBy,
  filterOptions,
  selected,
  onChange,
  filterKey,
}) {
  return (
    <div className="flex flex-col mt-3">
      <h3 className="font-heading px-4 col-span-2 text-sm sm:text-base">
        {filterBy === "Sort" ? "Sort By Date" : `Filter by ${filterBy}`}
      </h3>

      <div className="flex flex-wrap items-start w-full gap-1 sm:gap-2 px-2 sm:px-0">
        {filterOptions.map((filter) => (
          <FilterOptions
            key={filter}
            filter={filter}
            selected={selected}
            onSelect={(value) => onChange(filterKey, value)}
          />
        ))}
      </div>
    </div>
  );
}

function FilterOptions({ filter, selected, onSelect }) {
  const isActive = selected === filter.toLowerCase();

  return (
    <label
      className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 w-full sm:w-auto`}
    >
      <input
        type="radio"
        name="filter"
        value={filter}
        checked={isActive}
        onChange={() => onSelect(filter.toLowerCase())}
        className="hidden"
      />

      <div
        className={`w-5 h-5 flex items-center justify-center rounded-full border-2 transition-all duration-200
        ${isActive ? "border-primary" : "border-gray-400"}`}
      >
        <div
          className={`w-2.5 h-2.5 rounded-full bg-primary transition-all duration-200
          ${isActive ? "scale-100" : "scale-0"}`}
        />
      </div>

      <span className="font-heading text-sm truncate">{filter}</span>
    </label>
  );
}
