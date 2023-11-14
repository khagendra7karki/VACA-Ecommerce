import React, {  useState } from 'react'
import { Group, Pagination, Space } from '@mantine/core'
import Products from '../components/Products'

export default function Shop() {
  const [activePage, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  
  const pageFunction = (data: number) => {
    setTotalPages(data);
  };

  return (
    <div >
      <Products page = {activePage} pages = {pageFunction} />
    <Space/>
    <Space/>
    <Space/>
    <Group justify="center" my = '20px'><Pagination value={activePage} onChange={setPage} total={totalPages} /></Group>
    </div>
    
  )
}
