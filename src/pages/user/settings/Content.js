import React, {useEffect, useState} from "react";
import {
    Container,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
} from "@mui/material";
import {useAuth} from "../../../context/UserContext";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import {useWebSocket} from "../../../context/WebSocketContext";

const Content = () => {

    const { userData, token, setUserData } = useAuth();

    const {addHandler, deleteHandler, sendData, isConnected} = useWebSocket();

    const [uploadType, setUploadType] = useState(userData?.send_bot_media_type);
    const [photoFormat, setPhotoFormat] = useState(userData.aspect_ratio);
    const [autoUpload, setAutoUpload] = useState(userData.auto_upload_gallery);

    useEffect(() => {
        if(uploadType !== userData?.send_bot_media_type || photoFormat !== userData?.aspect_ratio || autoUpload !== userData?.auto_upload_gallery) {
            sendData({action: "update_content_settings", data: {jwt: token, uploadType, photoFormat, autoUpload }});
            setUserData({
                ...userData,
                send_bot_media_type: uploadType,
                aspect_ratio: photoFormat,
                auto_upload_gallery: autoUpload
            });
        }
    }, [uploadType, photoFormat, autoUpload, token]);

    return (
        <Container maxWidth="sm">
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                Настройки контента
            </Typography>

            <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2, boxShadow: 0 }}>
                <Table>
                    <TableBody>
                        {/* Выгрузка в бота */}
                        <TableRow>
                            <TableCell>Выгрузка в бота</TableCell>
                            <TableCell align="right">
                                <FormControl>
                                    <Select
                                        value={uploadType}
                                        onChange={(e) => setUploadType(e.target.value)}
                                    >
                                        <MenuItem value="file">Файл</MenuItem>
                                        <MenuItem value="media">Медиа</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                        </TableRow>

                        {/* Формат фото */}
                        <TableRow>
                            <TableCell>Формат фото</TableCell>
                            <TableCell align="right">
                                <FormControl>
                                    <Select
                                        value={photoFormat}
                                        onChange={(e) => setPhotoFormat(e.target.value)}
                                    >
                                        <MenuItem value="1:1">1:1</MenuItem>
                                        <MenuItem value="3:4">3:4</MenuItem>
                                        <MenuItem value="9:16">9:16</MenuItem>
                                        <MenuItem value="16:9">16:9</MenuItem>
                                        <MenuItem value="4:5">4:5</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                        </TableRow>

                        {/* Автовыгрузка */}
                        <TableRow>
                            <TableCell>Автоматическая публикация в профиль</TableCell>
                            <TableCell align="right">
                                <Switch
                                    checked={autoUpload}
                                    onChange={() => setAutoUpload(!autoUpload)}
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default Content;
