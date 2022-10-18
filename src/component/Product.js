import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
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
  Button,
  Spacer,
  HStack,
  Text,
  Input,
  Center,
  Grid,
  GridItem,
  Box,
  Select,
} from "@chakra-ui/react";
import Navbar from "./Navbar";
import { NavLink } from "react-router-dom";
import { API } from "./config";
const Product = () => {
  const [data, setdata] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [itemperPage, setitemperPage] = useState(5);
  const indexoflastitem = currentPage * itemperPage;
  console.log(indexoflastitem);
  const indexoffirstitem = indexoflastitem - itemperPage;
  console.log(indexoffirstitem);
  const currentItems = data.slice(indexoffirstitem, indexoflastitem);
  console.log(currentItems);

  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemperPage); i++) {
    pages.push(i);
  }

  const getProduct = async () => {
    const data = await axios.get(`${API.getproduct}`);
    setdata(data.data.data);
    console.log(data);
  };
  useEffect(() => {
    getProduct();
  }, []);

  const handelDelete = async (id) => {
    const response = await axios.delete(`${API.deleteproduct}${id}`);
    if (response) {
      getProduct();
    }
  };
  const handelSearch = async (item) => {
    if (item) {
      const result = await axios.get(`${API.searchproduct}/${item}`);
      if (result) {
        setdata(result.data);
      }
    } else {
      getProduct();
    }
  };

  const handleClick = (id) => {
    setcurrentPage(id);
  };

  const handelsubmit = (item) => {
   const post =  data.filter((e)=>{
      return(
       e.category === item

      )

    })
    setdata(post)
    console.log(post)

  };

  return (
    <>
      <Navbar />
      <TableContainer>
        <HStack>
          {" "}
          <Heading p={4}>Product Table</Heading>
          <Spacer />
          <Center pr={300}>
            {" "}
            <Input
              placeholder="search products"
              onChange={(e) => {
                handelSearch(e.target.value);
              }}
              w={400}
            ></Input>
          </Center>
          <Text pr={30}>
            {" "}
            <NavLink to="/addproduct">Add Product</NavLink>
          </Text>
          <Select
            placeholder="Select option"
            onChange={(e) => {
              handelsubmit(e.target.value);
            }}
          >
            <option value="mobile">mobile</option>
            <option value="data">data</option>

          </Select>
        </HStack>

        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>price</Th>
              <Th>Category</Th>
              <Th>description</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentItems.length > 0 ? (
              currentItems.map((data, index) => {
                return (
                  <>
                    <Tr key={index}>
                      <Td>{data.name}</Td>
                      <Td>{data.price}</Td>data
                      <Td>{data.category}</Td>
                      <Td>{data.description}</Td>
                      <Td>
                        <Button
                          onClick={() => {
                            handelDelete(data._id);
                          }}
                        >
                          Delete
                        </Button>
                        <NavLink to={"/update/" + data._id}>
                          <Button>Edit</Button>
                        </NavLink>
                      </Td>
                    </Tr>
                  </>
                );
              })
            ) : (
              <Heading ml="500px" pt="80px">
                product not found
              </Heading>
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <Box mt={50} ml="500px">
        {pages.map((number) => {
          return (
            <>
              <ul className="pageNumbers">
                <li
                  className={currentPage == number ? "active" : null}
                  key={number}
                  id={number}
                  onClick={(e) => {
                    handleClick(e.target.id);
                  }}
                >
                  {number}
                </li>
              </ul>
            </>
          );
        })}
      </Box>
    </>
  );
};

export default Product;
