import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Route, Link } from 'react-router-dom';
import moment from 'moment';

// Context //
import AuthContext from 'contexts/Auth';

// Styles //
import listItemInteractions from 'styles/css/listItemInteractions';

// Components //
import Avatar from 'shared/Avatar';
import Fill from 'shared/Fill';
import Text from 'shared/Text';

const Root = styled(Link)`
    padding: 4px 8px;
    position: relative;
    display: flex;
    align-items: stretch;
`;

const Wrapper = styled.div`
    flex: 1;
    flex-direction: row;
    align-items: center;
    padding: 12px 16px;
    border-radius: ${({ theme }) => theme.borderRadius}px;
    cursor: pointer;
    ${listItemInteractions}
`;

const Content = styled.div`
    margin-left: 16px;
    flex: 1;
`;

const Row = styled.div`
    flex-direction: row;
    align-items: center;
`;

const renderItem = ({ data, id, match: active, statusBorder }) => {
    const { partner } = data;
    const { messages } = data.state;
    return (
        <Root to={`/inbox/${id}`}>
            <Wrapper {...{ active }}>
                <Avatar
                    name={partner.name}
                    src={partner.image}
                    size={48}
                    {...{ statusBorder }}
                />
                <Content>
                    <Row>
                        <Text weight="500">{partner.name}</Text>
                        <Fill />
                        <Text color="gray" size={12}>
                            {moment(data.data.updated_at).calendar()}
                        </Text>
                    </Row>
                    <Row>
                        <Text
                            faded={!messages.length}
                            color="slate"
                            size={12}
                            weight="500"
                        >
                            {messages.length ? messages[0].text : 'No Messags'}
                        </Text>
                    </Row>
                </Content>
            </Wrapper>
        </Root>
    );
};

const ThreadItem = props => {
    return (
        <Route
            path={`/inbox/${props.id}`}
            children={routeProps => renderItem({ ...props, ...routeProps })}
        />
    );
};

export default ThreadItem;
