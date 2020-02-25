import React, { useContext } from "react";
import styled from "styled-components";

// Hooks //
import useMedia from 'hooks/useMedia';

// Contexts //
import ThemeSwitcherContext from "contexts/Theme";
import ShellContext from "contexts/Shell";

// Components //
import ListHeader from 'shared/ListHeader';
import { AppSettingsIcon, SoundsIcon, ThemeIcon } from "shared/Icons";
import Container from "shared/Container";
import Switch from "components/Switch";
import SettingsListItem from "components/SettingsListItem";

const Root = styled.div`
  flex: 1;
`;

const AppSettings = () => {
  const isMobile = useMedia('sm');
  const { isDarkMode, toggleTheme } = useContext(ThemeSwitcherContext);
  const { sounds } = useContext(ShellContext);
  return (
    <Root>
      <Container maxWidth={640}>
        {!isMobile ? <ListHeader bgColor="surface" showSearch={false} icon={AppSettingsIcon} title="App Settings" /> : null}
        <SettingsListItem
          icon={ThemeIcon}
          color="text"
          title="Dark Mode"
          text="Toggle the UI theme of Combase."
        >
          <Switch checked={isDarkMode} onChange={toggleTheme} />
        </SettingsListItem>
        <SettingsListItem
          icon={SoundsIcon}
          color="yellow"
          title="App Sounds"
          text="Toggle the Notification & UI sounds."
        >
          <Switch checked={sounds.enabled} onChange={sounds.toggle} />
        </SettingsListItem>
      </Container>
    </Root>
  );
};

export default AppSettings;
