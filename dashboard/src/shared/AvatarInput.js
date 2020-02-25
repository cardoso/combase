import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';

// Hooks //
import useAuth from 'hooks/useAuth';
import { useSnackbar } from 'contexts/Snackbar';

// Utils //
import upload from 'utils/upload';

// Components //
import Avatar from 'shared/Avatar';
import LoadingState from 'shared/LoadingState';
import { EditIcon } from 'shared/Icons';

const Root = styled.div`
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    border-radius: 50%;
    overflow: hidden;
   
    & input {
        display: none;
    }
`;

const Overlay = styled.div`
    background-color: ${({ theme }) => theme.colorUtils.fade(theme.color.true_black, 0.64)};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: ${({ show }) => show ? 1 : 0};
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: .3s opacity ${({ theme }) => theme.easing.css(theme.easing.standard)};
`;

const AvatarInput = ({ onChange, ...props }) => {
    const [{ user }] = useAuth();
    const { queueSnackbar } = useSnackbar();
    const [hovered, setHover] = useState(false);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);

    const inputRef = useRef();

    const onMouseEnter = useCallback(() => setHover(true), []);
    const onMouseLeave = useCallback(() => setHover(false), []);

    const onClick = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    }, []);

    const handleChange = useCallback(async ({ target: { files } }) => {
        try {
            setLoading(true);
            const data = await upload(files[0], user.tokens.api);
            console.log(data);
            if (data.error) {
                throw new Error(data.error);
            }
            setFile(data.url);
            if (onChange) {
                onChange(data.url);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            queueSnackbar({
                isError: true,
                text: 'Upload failed.'
            });
            console.error(error);
        }
    }, [onChange, user.tokens.api, queueSnackbar]);

    return <Root size={props.size} {...{ onClick, onMouseEnter, onMouseLeave }}>
        <input type="file" ref={inputRef} onChange={handleChange} />
        <Avatar {...props} src={file} />
        <Overlay show={loading || hovered}>
            {loading ? <LoadingState /> : <EditIcon size={props.size / 3} color="white" />}
        </Overlay>
    </Root>
};

export default AvatarInput;