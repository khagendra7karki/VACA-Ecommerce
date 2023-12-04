/**
 * TODO
 * 
 * Optimize this
 * 
 * Right now the frontend sends a lot of search queries to backend
 * 
 * First search from the available products then 
 * when the user presses the search button, send the
 * query to the backend
 */
import {  Select } from "@mantine/core"
import { IconSearch } from '@tabler/icons-react';
import { bindActionCreators } from "redux";
import { State, actionCreators } from "../../state";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const SearchBar = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { quickSearchProducts, getProduct } = bindActionCreators(actionCreators, dispatch);
    const { quickSearch } = useSelector((state: State) => state.quickSearch);

    const handlerSearch = (value: any) => {
        quickSearchProducts(value);
    };

    const handlerSearchSelect = (id: any) => {
        getProduct(id);
        navigate(`/product/${id}`);
    };


    return<>
            <Select
            style ={{ backgroundColor: 'var(--secondary-white)'}}
            my = '5px'
            mx = '20px'
            size="sm"
            placeholder="What are you looking for?"
            rightSection={<IconSearch style={{ width: '16px', height: '16px' }} stroke={1.5} />}
            onSearchChange={(e) => handlerSearch(e)}
            onChange={(e) => handlerSearchSelect(e)}
            data={quickSearch ? quickSearch : ["help" , " me"]}
            searchable
            nothingFoundMessage="Nothing found..."
            />
    </>
}

export default SearchBar