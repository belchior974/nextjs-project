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
import { BrandModal, ModelModal } from "./modal";
import toast from "react-hot-toast";

export const ModelTable = (props) => {
  const { refetch, setRefetch } = props;

  const [models, setModels] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);

  const [modelData, setModelData] = useState(null);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    paginationItems(models, page, limit);
  };

  // useEffect(() => {
  //   fetchModels();
  // }, []);

  useEffect(() => {
    // if (refetch == true) {
      return fetchModels();
    // }
    console.log(refetch)
  }, [refetch]);

  const fetchModels = () => {
    axios.get(`http://localhost:8081/model`).then((res) => {
      //   paginationItems(res.data, page, limit)
      // setModels(res.data);
      console.log(res);
      setModels(res.data._embedded.modelModelList)
    });
  };

  const edit = (model) => {
    console.log(model);
    setModelData(model);
    setModalOpen(true);
  };

  const deleteModel = (id) => {
    axios
      .delete(`http://localhost:8081/model/${id}`)
      .then((response) => {
        fetchModels();
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
                  <TableCell>MARCA</TableCell>
                  <TableCell align="right">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {models?.map((model) => (
                  <TableRow hover key={model?.id}>
                    <TableCell>{model?.id}</TableCell>
                    <TableCell>{model?.description}</TableCell>
                    <TableCell>{model?.brand.description}</TableCell>
                    <TableCell
                      sx={{
                        p: 1,
                        backgroundColor: "background.paper",
                      }}
                      align="right"
                    >
                      <Box>
                        <CustomTableEditIcon onClick={() => edit(model)} />
                        <CustomTableTrashIcon onClick={() => deleteModel(model.id)} />
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
          count={models.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage="Linhas por Página"
        />
      </Card>

      {modalOpen == true ? (
        <ModelModal
          setOpenModal={setModalOpen}
          model={modelData}
          refetch={refetch}
          setRefetch={setRefetch}
        />
      ) : null}
    </>
  );
};
