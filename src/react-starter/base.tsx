import * as React from 'react';

export const Html = (props: React.Props<{}>) => {
  return (
    <html>
      <head>
        <title>App</title>
      </head>
      <body>
        <div id="app">{props.children}</div>
        <script src="/lib/react-starter/client.js" />
      </body>
    </html>
  );
};
