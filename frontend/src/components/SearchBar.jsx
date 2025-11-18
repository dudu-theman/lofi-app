import { useState } from "react";

function SearchBar (props) {
    const [query, setQuery] = useState("");

    const handleInputChange = (e) => {
        setQuery(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSearch(query)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Give a prompt to generate a song."
            />
        </form>
    );
}

export default SearchBar