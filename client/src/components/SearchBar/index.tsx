import {  Select } from "@mantine/core"
import { IconSearch } from '@tabler/icons-react'
import { useNavigate } from "react-router-dom";
import quickSearchAPI from "./api";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../state";
import { bindActionCreators } from "redux";

const SearchBar = () =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { getProducts } = bindActionCreators( actionCreators, dispatch )

    const [ quickSearch, setQuickSearch ] = useState([])
    const [ query , setQuery ] = useState('')
    
    const handlerSearch = (value: any) => {
        setQuery(value )
        const values = quickSearchAPI(value)
        setQuickSearch(values)
    };

    const handlerSearchSelect = (id: any) => {
        navigate(`/product/${id}`);
    };

    const handleSubmit = () =>{
        getProducts(1, query )
        navigate(`/search`)
    }

    return<>
        <form onSubmit = { handleSubmit }>
            <Select
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
            onKeyDown={event => {
                if (event.key === 'Enter') {
                  handleSubmit()
                }
              }}
            />
        </form>
    </>
}

export default SearchBar