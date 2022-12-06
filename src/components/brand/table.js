import { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";

import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

import { CustomTableEditIcon, CustomTableTrashIcon } from "../../icons/table";

import axios from "axios";
import { BrandModal } from "./modal";
import toast from "react-hot-toast";

export const BrandTable = (props) => {
  const { refetch, setRefetch } = props;

  const [brands, setBrands] = useState([]);
  const [brandsPaginated, setBrandsPaginated] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);

  const [brandData, setBrandData] = useState(null);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    paginationItems(brands, page, limit);
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  useEffect(() => {
    console.log('query', refetch)
    // if (refetch == true) {
      fetchBrands();
    // }
  }, [refetch]);

  const fetchBrands = () => {
    axios.get(`http://localhost:8081/brand`).then((res) => {
      //   paginationItems(res.data, page, limit)
      setBrands(res.data);
    });
  };

  useEffect(() => {
    console.log("running");

    console.log(brands)
  }, [brands]);

  const paginationItems = (brands, page, limit) => {
    page = page + 1;

    let result = [];
    let totalPage = Math.ceil(brands.length / limit);
    let count = page * limit - limit;

    let delimiter = count + limit;

    if (page <= totalPage) {
      for (let i = count; i < delimiter; i++) {
        result.push(brands[i]);
        count++;
      }
    }

    setBrandsPaginated(result);
  };

  const edit = (brand) => {
    console.log(brand);
    setBrandData(brand);
    setModalOpen(true);
  };

  const deleteBrand = (id) => {
    axios
      .delete(`http://localhost:8081/brand/${id}`)
      .then((response) => {
        setRefetch(true);
        toast.success("Operação realizada com sucesso!");
        console.log(response)
      });
  };

  return (
    <>
      <Card>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell align="right">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {brands.map((brand) => (
                  <TableRow hover key={brand?.id}>
                    <TableCell>{brand?.id}</TableCell>
                    <TableCell>{brand?.description}</TableCell>
                    <TableCell
                      sx={{
                        p: 1,
                        backgroundColor: "background.paper",
                      }}
                      align="right"
                    >
                      <Box>
                        <CustomTableEditIcon onClick={() => edit(brand)} />
                        <CustomTableTrashIcon onClick={() => deleteBrand(brand.id)} />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={brands.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage="Linhas por Página"
        />
      </Card>

      {modalOpen == true ? (
        <BrandModal
          setOpenModal={setModalOpen}
          brand={brandData}
          refetch={refetch}
          setRefetch={setRefetch}
        />
      ) : null}
    </>
  );
};
