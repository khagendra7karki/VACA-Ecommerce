import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { Group, Pagination, Space } from "@mantine/core";
import Products from "../components/Products";
export default function Shop() {
  const [activePage, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const pageFunction = (data: number) => {
    setTotalPages(data);
  };
  useEffect(() => {
    // Update the document title using the browser API
    console.log(activePage);
  });
  return (
    <Layout>
      <div>
        <Products page={activePage} pages={pageFunction} />
      </div>
      <Space />
      <Space />
      <Space />
      <Group justify="center" my="20px">
        <Pagination value={activePage} onChange={setPage} total={totalPages} />
      </Group>
    </Layout>
  );
}
