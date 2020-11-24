import React, {useMemo} from 'react';
import queryString from 'query-string';
import { heroes } from '../../data/heroes';
import { HeroCard } from '../heroes/HeroCard';
import { useForm } from '../../hooks/useForm';
import { useLocation } from 'react-router-dom';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({history}) => {

    const location = useLocation();
    const { q = '' } = queryString.parse(location.search);

    
    const [{searchText}, setValues] = useForm({
        searchText: q
    });
    
    const heroesFiltered = useMemo(() => getHeroesByName(q), [q]); // si se hace sobre el searchText se va a ejecutar con cada letra que escribamos. Y queremos que se ejecute con el enter o con el botón

    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`?q=${searchText}`);
    };

    return (
        <div>
            <h1>Search Screen</h1>
            <hr />
            
            <div className="row">
                <div className="col-5">
                    <h4> Search Form </h4>
                    <hr />

                    <form onSubmit={handleSearch}>
                        <input type="text" placeholder="Find your hero" className="form-control" name="searchText" autoComplete="off" value={searchText} onChange={setValues} />
                    </form>

                    <button type="submit" className="btn m-1 btn-block btn-outline-primary" onClick={handleSearch}>
                        Search...
                    </button>

                </div>

                <div className="col-7">

                    <h4> Results </h4>
                    <hr />

                    {
                        heroesFiltered.map(hero => (
                            <HeroCard key={hero.id} {...hero} />
                        ))
                    }

                </div>
            </div>
        </div>
    )
}
