import { styled } from "@mui/material";

import { PencilAlt as PencilAltIcon } from "../icons/pencil-alt";
import { Trash as DeleteIcon } from "../icons/trash";

export const CustomTableEditIcon = styled(PencilAltIcon)`
  cursor: pointer;
  width: 0.9em;
  height: 0.9em;
  /* color: #385898; */
  &:hover {
    color: #20c997;
  }
`;

export const CustomTableTrashIcon = styled(DeleteIcon)`
  cursor: pointer;
  width: 0.9em;
  height: 0.9em;
  /* color: #385898; */
  margin-left: 0.25em;
  &:hover {
    color: #dc3545;
  }
`;
