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

interface Props {
  title: string;
  items: string[];
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

export default function MultipleSelectChip({title, items}: Props) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);
 
  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: {value},
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
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
          value={personName}
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
          {items.map(name => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
