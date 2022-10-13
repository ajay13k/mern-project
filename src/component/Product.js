import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Heading,
} from "@chakra-ui/react";
import Navbar from "./Navbar";
const Product = () => {
  const [result, setresult] = useState([]);
  const getProduct = async () => {
    const result = await axios.get("http://localhost:3600/api/product/get");
    setresult(result.data.data);
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <Navbar />
      <TableContainer >
        <Heading p={4}>Product Table</Heading>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>price</Th>
              <Th>Category</Th>
              <Th>description</Th>
            </Tr>
          </Thead>
          <Tbody>
            {result &&
              result.map((data) => {
                return (
                  <>
                    <Tr>
                      <Td>{data.name}</Td>
                      <Td>{data.price}</Td>
                      <Td>{data.category}</Td>
                      <Td>{data.description}</Td>
                    </Tr>
                  </>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Product;
