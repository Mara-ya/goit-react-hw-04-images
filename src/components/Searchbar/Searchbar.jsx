import { useState } from "react";
import { Searcher, SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput } from "./Searchbar.slyled";

export function Searchbar({onSubmit}) {
    const [searchQuery, setSearchQuery] = useState('');
    
    function handleChange (e) {
        setSearchQuery(e.target.value);
    }

    function handleSubmit (e) {
        e.preventDefault();
        onSubmit(searchQuery);
        reset();
    }

    function reset () {
        setSearchQuery('');
    };

    return (
        <Searcher>
            <SearchForm onSubmit={handleSubmit}>
                <SearchFormButton type="submit">
                    <SearchFormButtonLabel>Search</SearchFormButtonLabel>
                </SearchFormButton>

                <SearchFormInput
                    className="input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={searchQuery}
                    onChange={handleChange}
                />
            </SearchForm>
        </Searcher>
    )
}
