import Head from "next/head";
import { useEffect, useState } from "react";
// import { Box, Container } from '@mui/material';
import { CustomerListResults } from "../components/customer/customer-list-results";
import { CustomerListToolbar } from "../components/customer/customer-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { customers } from "../__mocks__/customers";

import {
  Box,
  Container,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  setRef,
} from "@mui/material";

import { Search as SearchIcon } from "../icons/search";
import { BrandTable } from "../components/brand/table";
import { BrandModal } from "../components/brand/modal";

const Page = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [refetch, setRefetch] = useState(false);

  return (
    <>
      <Head>
        <title>Marcas | Gerenciador de Marcas</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              m: -1,
            }}
          >
            <Typography sx={{ m: 1 }} variant="h4">
              Marcas
            </Typography>
            <Box sx={{ m: 1 }}>
              <Button color="primary" variant="contained" onClick={() => setModalOpen(true)}>
                Adicionar
              </Button>
            </Box>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Card>
              <CardContent>
                <Box sx={{ maxWidth: "100em" }}>
                  <TextField
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon color="action" fontSize="small">
                            <SearchIcon />
                          </SvgIcon>
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Descrição"
                    variant="outlined"
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ mt: 3 }}>
            <BrandTable  refetch={refetch} setRefetch={setRefetch} />
          </Box>
        </Container>
      </Box>

      {modalOpen ? <BrandModal setOpenModal={setModalOpen} refetch={refetch} setRefetch={setRefetch} /> : null}
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
