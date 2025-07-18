import React, {useEffect, useState} from 'react';
import { Container, Box, Paper, Typography, TextField, Button } from '@mui/material';
import {useWebSocket} from "../../../context/WebSocketContext";

const Auth = () => {

    const {sendData, addHandler, deleteHandler} = useWebSocket();

    const [page, setPage] = useState('enterEmail');
    const [email, setEmail] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');

    const handleSendEmailAuthorization = () => {
        sendData({
            action: "oauth/email",
            data: {
                email: email
            }
        });
    }

    const handleSendConfirmationCode = () => {
        sendData({
            action: "oauth/confirm",
            data: {
                code: confirmationCode,
                email: email
            }
        });
    }

    useEffect(() => {

        const handleConfirmEmailCode = async() => {
            setPage("enterConfirmationCode");
        }

        addHandler("confirm_email_code", handleConfirmEmailCode);

        return () => deleteHandler("confirm_email_code");

    }, [addHandler, deleteHandler]);

    useEffect(() => {

        const handleConfirmEmailCode = async(msg) => {

        }

        addHandler("answere_confirmation_code", handleConfirmEmailCode);

        return () => deleteHandler("answere_confirmation_code");

    }, [addHandler, deleteHandler]);

    return (
        <Container
            maxWidth="xs"
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    width: '100%',
                    borderRadius: 2,
                }}
            >
                <Box display="flex" flexDirection="column" gap={2}>

                    {
                        page === "enterEmail" ? (
                            <>
                                <Typography variant="h5" component="h1" align="center" gutterBottom>
                                    Signing in
                                </Typography>

                                <TextField
                                    label="Email"
                                    type="email"
                                    variant="outlined"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    fullWidth
                                />

                                <Button variant="contained" color="primary" onClick={handleSendEmailAuthorization} fullWidth>
                                    Sign in
                                </Button>
                            </>
                        ) : page === "enterConfirmationCode" ? (
                            <>
                                <Typography variant="h5" component="h1" align="center" gutterBottom>
                                    Confirmation code
                                </Typography>

                                <TextField
                                    label="Code"
                                    type="email"
                                    variant="outlined"
                                    value={confirmationCode}
                                    onChange={(e) => setConfirmationCode(e.target.value)}
                                    fullWidth
                                />

                                <Button variant="contained" color="primary" onClick={handleSendConfirmationCode} fullWidth>
                                    Confirm
                                </Button>
                            </>
                        ) : null
                    }

                </Box>
            </Paper>
        </Container>
    );
};

export default Auth;
