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
import {useTranslation} from "react-i18next";
import CreateAvatarModal from "../../../components/modals/CreateAvatarModal";

const Content = () => {

    const { userData, token, setUserData, myLoras } = useAuth();
    const {t} = useTranslation();

    const {addHandler, deleteHandler, sendData, isConnected} = useWebSocket();

    const [uploadType, setUploadType] = useState(userData?.send_bot_media_type);
    const [photoFormat, setPhotoFormat] = useState(userData.aspect_ratio);
    const [autoUpload, setAutoUpload] = useState(userData.auto_upload_gallery);

    useEffect(() => {
        if(uploadType !== userData?.send_bot_media_type || photoFormat !== userData?.aspect_ratio || autoUpload !== userData?.auto_upload_gallery) {
            sendData({action: "user/update/upload_settings", data: {jwt: token, send_bot_media_type: uploadType, auto_upload_gallery: autoUpload }});
            setUserData({
                ...userData,
                send_bot_media_type: uploadType,
                auto_upload_gallery: autoUpload
            });
        }
    }, [uploadType, photoFormat, autoUpload, token]);

    return (
        <div className={"globalBlock"}>
            <div className={"center-content-block"}>
                <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                    {t('content_settings')}
                </Typography>

                <CreateAvatarModal />

                <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2, boxShadow: 0 }}>
                    <Table>
                        <TableBody>
                            {/* Выгрузка в бота */}
                            <TableRow>
                                <TableCell>{t('uploading_to_bot')}</TableCell>
                                <TableCell align="right">
                                    <FormControl>
                                        <Select
                                            value={uploadType}
                                            onChange={(e) => setUploadType(e.target.value)}
                                        >
                                            <MenuItem value="file">{t('file')}</MenuItem>
                                            <MenuItem value="media">{t('media')}</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                            </TableRow>


                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default Content;
