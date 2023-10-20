import React from 'react';
import { Button } from './ui/button';

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="p-2 flex">
      <Button variant="link" className="ml-auto">
        Update Log
      </Button>
    </div>
  );
};

export default Header;

import React from 'react';
import UpdateLog from './UpdateLog';

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="p-2 flex">
      <div className="ml-auto">
        <UpdateLog />
      </div>
    </div>
  );
};

export default Header;
