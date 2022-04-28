import * as React from 'react';
import Container from '@mui/material/Container';

export default function Arena(props) {

  console.log("props",props) // Will receive an optional config
  return (
      <Container maxWidth="sm">
        <div
          style={styleType}
          ref={(me) => {
            this.gameCanvas = me;
          }}
        />
      </Container>
  );
}