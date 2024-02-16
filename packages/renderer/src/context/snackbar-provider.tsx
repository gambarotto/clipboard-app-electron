import {
  Alert,
  Snackbar,
} from '@mui/material';
import { createContext, useCallback, useContext, useState } from 'react';

export enum SNACKBAR_TYPE {
  ERROR = 'error',
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
}
export enum SNACKBAR_ID {
  CLOSED = 'closed',
  CATEGORY = 'category',
  ANNOTATION = 'annotation',
}
export enum SNACKBAR_MESSAGE {
  // Category
  CATEGORY_CREATED = 'Categoria criada com sucesso',
  CATEGORY_UPDATED = 'Categoria atualizada!',
  CATEGORY_DELETED = 'Categoria excluida com sucesso!',
  CATEGORY_CREATED_ERROR = 'Erro ao criar categoria',
  CATEGORY_CREATED_ERROR_TITLE_ALREADY_EXISTS = 'Já existe uma categoria com esse nome',
  CATEGORY_UPDATED_ERROR = 'Erro ao atualizar categoria',
  CATEGORY_DELETED_ERROR = 'Erro ao excluir categoria',
  // Annotation
  ANNOTATION_CREATED = 'Annotation created',
  ANNOTATION_UPDATED = 'Annotation updated',
  ANNOTATION_DELETED = 'Annotation deleted',
  ANNOTATION_CREATED_ERROR = 'Erro ao criar anotação',
  ANNOTATION_CREATED_ERROR_NAME_ALREADY_EXISTS = 'Já existe uma anotação com esse nome',
  ANNOTATION_UPDATED_ERROR = 'Erro ao atualizar anotação',
  ANNOTATION_DELETED_ERROR = 'Erro ao excluir anotação',
}
type TCustomSnackbar = {
  snackbarId: SNACKBAR_ID;
};
type THandleModal = {
  snackbarId: SNACKBAR_ID;
  message: SNACKBAR_MESSAGE;
  type: SNACKBAR_TYPE;
};
type TSnackbarContext = {
  handleModal: ({snackbarId, message, type}: THandleModal) => void;
  CustomSnackBar: ({snackbarId}: TCustomSnackbar) => JSX.Element;
};

export const SnackbarContext = createContext<TSnackbarContext>({} as TSnackbarContext);

export const SnackbarProvider = ({ children }: { children: React.ReactNode }) => {
  const [openModalId, setOpenModalId] = useState<SNACKBAR_ID>(SNACKBAR_ID.CLOSED);
  const [messageModal, setMessageModal] = useState<SNACKBAR_MESSAGE>();
  const [typeModal, setTypeModal] = useState<SNACKBAR_TYPE>();

  const handleModal = useCallback(({ snackbarId, message, type }: THandleModal) => {
    setOpenModalId(snackbarId);
    setMessageModal(message);
    setTypeModal(type);
  }, []);

  const handleClose = () => {
    setOpenModalId(SNACKBAR_ID.CLOSED);
    setMessageModal(undefined);
    setTypeModal(undefined);
  };

  const CustomSnackBar = ({snackbarId}: TCustomSnackbar) => {
    return (
      <Snackbar
        open={openModalId === snackbarId}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={typeModal}
          variant="filled"
          sx={{width: '100%'}}
        >
          {messageModal}
        </Alert>
      </Snackbar>
    );
  };
  return (
    <SnackbarContext.Provider value={{handleModal, CustomSnackBar}}>
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  return context;
};