// components/SearchInput.tsx

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'

const SearchInput: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>('');
  

  const handleSearch = () => {
    router.push(`/search=${searchTerm}`);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search Pokemon"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchInput;
