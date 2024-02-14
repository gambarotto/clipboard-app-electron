import * as React from 'react';
import type {Theme} from '@mui/material/styles';
import { useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import type {SelectChangeEvent} from '@mui/material/Select';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import type { TCategory } from '../../../models/CategoryModel';
import { useEffect, useState } from 'react';

interface Props {
  title: string;
  items: TCategory[];
  valueSelected: string[];
  handleCategoryChange: (data: string[]) => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({title, items, handleCategoryChange, valueSelected}: Props) {
  const theme = useTheme();
  const [categoryTitle, setcategoryTitle] = useState<string[]>(valueSelected);

  useEffect(() => {
    if (valueSelected.length === 0) {
      setcategoryTitle([]);
    }
  }, [valueSelected]);
  
  const handleChange = (event: SelectChangeEvent<typeof categoryTitle>) => {
    const {
      target: {value},
    } = event;
    setcategoryTitle(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );

    handleCategoryChange(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel
          id="demo-multiple-chip-label"
          sx={{
            color: 'grey.200',
            '&.Mui-focused': {
              color: 'grey.200', // Cor do texto quando focado
              borderColor: 'grey.200', // Cor da borda quando focado
            },
          }}
        >
          {title}
        </InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={categoryTitle}
          onChange={handleChange}
          input={
            <OutlinedInput
              id="select-multiple-chip"
              label={title}
            />
          }
          renderValue={selected => (
            <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
              {selected.map(value => (
                <Chip
                  key={value}
                  label={value}
                  sx={{
                    backgroundColor: 'background.paper',
                    color: 'white',
                  }}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
          sx={{
            backgroundColor: 'background.default',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'grey.200', // Cor da borda padrão
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main', // Cor da borda ao passar o mouse
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'grey.200', // Cor da borda quando focado
            },
          }}
        >
          {items.map(category => (
            <MenuItem
              key={category.id}
              value={category.title}
              style={getStyles(category.title, categoryTitle, theme)}
            >
              {category.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
