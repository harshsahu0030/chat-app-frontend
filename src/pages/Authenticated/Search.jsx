import React, { useState } from "react";
import SearchInput from "../../components/inputs/SearchInput";
import UserButton from "../../components/buttons/UserButton";

const Search = () => {
  const [search, setSearch] = useState("");
  return (
    <section className="h-full w-full rounded-md flex flex-col gap-4">
      <SearchInput
        id="search-input"
        name={"search"}
        placeholder={"Search Rista"}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex flex-col gap-2">
        <UserButton />
        <UserButton />
        <UserButton />
        <UserButton />
        <UserButton />
        <UserButton />
        <UserButton />
        <UserButton />
        <UserButton />
        <UserButton />
        <UserButton />
        <UserButton />
        <UserButton />
        <UserButton />
        <UserButton />
        <UserButton />
        <UserButton />
      </div>
    </section>
  );
};

export default Search;
