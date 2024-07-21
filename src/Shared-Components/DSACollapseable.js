import React, {useState, useRef} from 'react';
import Box from '@mui/material/Box';
import Portal from '@mui/material/Portal';
import DSACustomizedCheckbox from './DSACheckBox';
import theme from '../../theme';

const DSACollapseable =(props)=> {
  const [show, setShow] = useState(false);
  const container = useRef(null);

  return (
    <div style={{
      background: theme.palette.primary.white,
      padding: '10px 13px 10px 3px',
      borderRadius: theme.shapes.primaryBtnBorderRadius,
      width: '90%',
      fontSize: theme.typography.fontSize
    }}>
      <DSACustomizedCheckbox onChange={(e) => {
        setShow(!show)
      }}>
        {show ? 'Unmount children' : 'Mount children'}
      </DSACustomizedCheckbox>
      {props.text}

      {show ? (
        <Portal container={container.current}>
          {props.children}
        </Portal>
      ) : null}
      <Box sx={{}} ref={container} />
    </div>
  );
}

export default DSACollapseable