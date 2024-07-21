import * as React from 'react';
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import theme from '../../theme';

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 20,
  height: 20,
  backgroundColor: theme.palette.primary.checkBoxColor,
  backgroundImage:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
      : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background:
      theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: theme.palette.primary.green_dark,
  'input:hover ~ &': {
    backgroundColor: theme.palette.primary.green_dark,
  },
});

// Inspired by blueprintjs
function BpRadio(props) {
  return (
    <Radio
      sx={{
        '&:hover': {
          bgcolor: 'transparent',
        },
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props.data}
    />
  );
}

export default function CustomizedRadios(props) {
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
    props.getSelectedItem(event.target.value)
  };

  return (
    <FormControl >
      {props.radioLAbel && <FormLabel id="demo-customized-radios">{props.radioLAbel}</FormLabel>}
      <RadioGroup
        aria-labelledby="demo-customized-radios"
        name="customized-radios"
        value={value}
        onChange={handleChange}
        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}
      >
        {props.data.map(item => (<FormControlLabel value={props.item} control={<BpRadio data={item} />} label={item.radioText} />))}
      </RadioGroup>
    </FormControl>
  );
}
