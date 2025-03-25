import React, {useEffect} from 'react';
import {useAuth} from "../../context/UserContext";
import {useWebSocket} from "../../context/WebSocketContext";
import {Button} from "@mui/material";

const SubscribeButton = ({ sub, setSub, userId, setFollowersCount = (count) => {} }) => {

    const { token } = useAuth();
    const {addHandler, deleteHandler, sendData} = useWebSocket();

    const handleSub = () => {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
        sendData({ action: 'subscribe', data: { jwt: token, toUserId: userId } })
    }

    useEffect(() => {
        const handleInviteSub = (msg) => {
            setSub(msg.sub);
            setFollowersCount(msg.followersCount);
        }

        addHandler('to_subscribe', handleInviteSub);

        return () => deleteHandler('to_subscribe');

    }, []);

    return (
        <Button variant={sub ? "contained" : "outlined"}
                sx={{ bgcolor: sub ? 'var(--button-color)' : 'var(--bg-color)', fontSize: '12px', borderRadius: "8px" }}
                onClick={handleSub}>
            {sub ? "Отписаться" : "Подписаться"}
        </Button>
    );
};

export default SubscribeButton;