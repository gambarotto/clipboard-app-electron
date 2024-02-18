import { Accordion, AccordionActions, AccordionSummary, IconButton, Stack, Typography } from '@mui/material';

import { useUser } from '../../context/user-context';
import { useCallback, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import type { TCategory } from '../../../../models/CategoryModel';
import { ModalNewCategory } from '../../components/ModalNewCategory';
import palette from '../../theme/palette';

export function CategoryTab() {
   const {
     palette: {grey},
   } = palette;
  const [selectedCategory, setSelectedCategory] = useState<TCategory>();
  const [openModalCategory, setOpenModalCategory] = useState(false);
  const { categories, deleteCategory, getCategories } = useUser();

  const [expanded, setExpanded] = useState<string | false>('');
  const handleChangeAccordion =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const handleDeleteCategory = useCallback(
    async (categoryId: number) => {
      await deleteCategory(categoryId);
    },
    [deleteCategory, getCategories],
  );
  const handleOpenModalCategory = useCallback(
    (category: TCategory) => {
      setSelectedCategory(category);
      setOpenModalCategory(true);
    },
    [selectedCategory],
  );

  return (
    <>
      {categories.length > 0 &&
        categories.map(category => (
          <Accordion
            key={category.id}
            expanded={expanded === category.id.toString()}
            onChange={handleChangeAccordion(category.id.toString())}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{color: grey[200]}} />}
              aria-controls="content"
              id="header"
            >
              <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                gap={2}
              >
                <Stack sx={{width: 10, height: 10, borderRadius: 10, bgcolor: category.color}} />
                <Typography sx={{color: 'grey.200'}}>{category.title}</Typography>
              </Stack>
            </AccordionSummary>
            <AccordionActions>
              <IconButton onClick={() => handleDeleteCategory(category.id)}>
                <DeleteIcon
                  fontSize="small"
                  sx={{
                    color: grey[200],
                  }}
                />
              </IconButton>
              <IconButton onClick={() => handleOpenModalCategory(category)}>
                <EditNoteIcon
                  sx={{
                    color: 'primary.main',
                  }}
                />
              </IconButton>
            </AccordionActions>
          </Accordion>
        ))}
      <ModalNewCategory
        open={openModalCategory}
        handleClose={() => setOpenModalCategory(false)}
        category={selectedCategory}
      />
    </>
  );
}