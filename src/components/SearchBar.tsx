import { useState } from 'react';
import { AiOutlineGoogle, AiOutlineSearch } from 'react-icons/ai';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query === '') return;
    // 全角半角スペースがある場合+に置換する
    if (query.match(/\s/)) {
      setQuery(query.replaceAll(/\s+/g, '+'));
    }
    window.location.href = `https://www.google.com/search?q=${query}`;
  };

  return (
    <form
      className="absolute bottom-[150px] left-1/2 -translate-x-1/2 flex items-center  rounded-full w-[600px] h-[60px] px-4 overflow-hidden"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="absolute inset-0 -z-20 bg-black/20 backdrop-blur-md " />
      <AiOutlineGoogle className="flex-none w-9 h-9 " />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-auto bg-transparent outline-none h-[60px] px-4 text-3xl"
      />
      <AiOutlineSearch className="flex-none w-9 h-9" />
    </form>
  );
};

export default SearchBar;
