import { useState, useEffect } from "react";

import { Formik, Form } from "formik";

import Textfield from "../formsUI/Textfield";

import * as Yup from "yup";
import { BootstrapDialog, BootstrapDialogTitle, Transition } from "../modals/dialogs";

import { DialogContent, Grid, Button } from "@mui/material";

import toast from "react-hot-toast";

import axios from "axios";

export const BrandModal = (props) => {
  const { brand, setOpenModal, refetch, setRefetch } = props;

  const [open, setOpen] = useState(false);

  const [formValues, setFormValues] = useState({
    description: "",
  });

  const formValidation = Yup.object().shape({
    description: Yup.string().max(100).required("Campo obrigatório"),
  });

  useEffect(() => {
    if (brand) {
      edit();
    }
    setOpen(true);
  }, [setOpenModal]);

  const handleClose = async () => {
    await setOpen(false);
    setTimeout(() => {
      props.setOpenModal(false);
    }, 1000);
  };
  const onSubmit = async (values, { resetForm }) => {
    if (brand) {
      update(values, { resetForm });
    } else {
      create(values, { resetForm });
    }
  };

  const create = async (values, { resetForm }) => {
    try {
      axios
        .post("http://localhost:8081/brand", {
          description: values.description,
        })
        .then((response) => {
          setRefetch(true);
          toast.success("Operação realizada com sucesso!");
          handleClose();
          resetForm();
        });
    } catch (e) {
      console.error(e);
      toast.error("Algo deu errado!");
    }
  };

  const update = async (values, { resetForm }) => {
    try {
      axios
        .put("http://localhost:8081/brand", { id: values.id, description: values.description })
        .then((response) => {
          setRefetch(true);
          toast.success("Operação realizada com sucesso!");
          handleClose();
          resetForm();
        });
    } catch (e) {
      console.error(e);
      toast.error("Algo deu errado!");
    }
  };

  const edit = () => {
    setFormValues(brand);
  };

  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        open={open}
        TransitionComponent={Transition}
        fullWidth={true}
        maxWidth="md"
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {brand?.id ? "Atualização" : "Cadastro "} de Marca {brand?.id ? `[${brand.id}]` : ""}
        </BootstrapDialogTitle>
        <DialogContent>
          <>
            <Formik
              initialValues={{ ...formValues }}
              validationSchema={formValidation}
              enableReinitialize
              onSubmit={onSubmit}
            >
              {({ values }) => (
                <Form>
                  <Grid container spacing={2} sx={{ pt: 2 }}>
                    <Grid item xs={12} sx={{ mt: 0.5 }}>
                      <Textfield autoFocus label="Descrição" name="description" type="text" />
                    </Grid>
                    <Grid item xs={12}>
                      <Button type="submit" size="large" fullWidth variant="contained">
                        {brand != null ? "Atualziar" : "Salvar"}
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};
