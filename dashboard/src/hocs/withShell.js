import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { ChatContext, useInitClient } from "stream-chat-hooks";

// Hooks //
import useAuth from "hooks/useAuth";
import useConfig from "hooks/useConfig";
import useMedia from "hooks/useMedia";

// Context //
import ShellContext from "contexts/Shell";

// Components //
import Helmet from "components/Shell/Helmet";
import Drawer from "components/Shell/Drawer";
import Sidenav from "components/Shell/Sidenav";
import LoadingState from "shared/LoadingState";

const Root = styled.div`
  flex: 1;
  overflow: hidden;
`;

export default (WrappedComponent, routes = []) => props => {
  const [drawerOpen, toggleDrawer] = useState(false);
  const isMobile = useMedia("sm");

  const [config, { loading, error }] = useConfig();
  const [{ user }] = useAuth();

  const chatClient = useInitClient(user, config.stream);

  const value = useMemo(
    () => ({
      config,
      drawer: {
        open: drawerOpen,
        toggle: () => toggleDrawer(!drawerOpen)
      }
    }),
    [config, drawerOpen, toggleDrawer]
  );

  if (loading || !chatClient) {
    return <LoadingState key="loading" />;
  }

  if (error) {
    // TODO: Show error screen here
    return "Something went wrong!";
  }

  console.log(config);

  return (
    <ShellContext.Provider {...{ value }}>
      <ChatContext.Provider value={chatClient}>
        <Root>
          {isMobile ? (
            <Drawer
              {...props}
              {...{ routes }}
              open={drawerOpen}
              onClose={value.drawer.toggle}
            />
          ) : (
            <Sidenav {...props} {...{ routes }} />
          )}
          <WrappedComponent {...props} />
          <Helmet />
        </Root>
      </ChatContext.Provider>
    </ShellContext.Provider>
  );
};
