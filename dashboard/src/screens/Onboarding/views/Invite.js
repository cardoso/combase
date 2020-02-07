import React from 'react';
import styled from 'styled-components';

// Forms //
import InvitationForm from '../forms/InvitationForm';

// Components //
import Text from 'shared/Text';

const Root = styled.div`
    flex: 1;
    justify-content: center;
`;

const Header = styled.div`
    padding: 32px 0px;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const Invite = () => {
    return (
        <Root>
            <Header>
                <Text size={40} weight="700">
                    Invite your Team
                </Text>
            </Header>
            <InvitationForm />
        </Root>
    );
};

export default Invite;
