import React, {useEffect, useRef, useState} from "react";
import styles from './css/CreateContent.module.css';
import {Link, useNavigate} from "react-router-dom";
import MyGeneratedPhotosList from "../../components/gallery/MyGeneratedPhotosList";
import MyModels from "../../components/models/MyModels";
import {useAuth} from "../../context/UserContext";
import {CiSettings} from "react-icons/ci";
import WebAppModal from "../../components/modal/WebAppModal";
import RightModal from "../../components/modal/RightModal";
import PaymentModal from "../../components/modals/PaymentModal";
import CreateAvatarModal from "../../components/modals/CreateAvatarModal";
import {useWebSocket} from "../../context/WebSocketContext";
import {useTranslation} from "react-i18next";
import animationStarGold from './../../assets/gif/gold_star.gif';
import {Button} from "@mui/material";
import FeaturesGrid from "../../components/grid/FeaturesGrid";

const CreateContent = () => {

    const navigate = useNavigate();

    const { userData, myModels, token } = useAuth();
    const { sendData, deleteHandler, addHandler } = useWebSocket();

    const {t} = useTranslation();

    const [value, setValue] = useState(0);
    const [photosPage, setPhotosPage] = useState(0);
    const [openPaymentModal, setOpenPaymentModal] = useState(false);
    const [availableModels, setAvailableModels] = useState([]);

    const isFetchingRef = useRef(false);
    const lastPageRef = useRef(1);
    const scrollTimeoutRef = useRef(null);

    const resetLastPageRef = () => {
        lastPageRef.current = 1;
    }

    const resetFetchingRef = () => {
        isFetchingRef.current = false;
    }

    const handleScroll = (e) => {
        if (value !== 0) return;

        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }

        scrollTimeoutRef.current = setTimeout(() => {

            const bottom = e.target.scrollHeight < e.target.scrollTop + e.target.clientHeight + 600;

            if (bottom && !isFetchingRef.current) {
                const nextPage = lastPageRef.current + 1;

                isFetchingRef.current = true;
                lastPageRef.current = nextPage;
                setPhotosPage(nextPage);
            }
        }, 100);
    };

    useEffect(() => {
        if(token) {
            sendData({
                action: "get/models",
                data: {
                    jwt: token,
                }
            });
        }
    }, [token]);

    useEffect(() => {
        const receiveAvailableModels = (msg) => {
            setAvailableModels(msg.models);
        }

        addHandler("receive_available_models", receiveAvailableModels);

        return () => deleteHandler("receive_available_models");
    }, [addHandler, deleteHandler, setAvailableModels]);

    return (
        <div className={"globalBlock"} id={"generatedPhotosList"} onScroll={handleScroll}>
            <PaymentModal openPaymentModal={openPaymentModal} setOpenPaymentModal={setOpenPaymentModal} isRubles={userData.language_code === 'ru'} />
            <div className="center-content-block">
                <div className={"w-100 d-flex align-items-center justify-content-between"}>
                    <div className={"p-2-phone d-flex"}>
                        <div>
                            <p>{t('Balance')}: {userData.photos_left} <img src={animationStarGold} width={14}/></p>
                            <p>{t('Educations')}: {userData.models_left} {t('pcs')}</p>
                        </div>
                        <div>
                            <button className={"publish-button"} style={{marginTop: 4, marginLeft: 8}} onClick={() => setOpenPaymentModal(true)}>
                                {t('Buy More Stars')}
                            </button>
                        </div>
                    </div>
                    <Link to={"/settings/content"}>
                        <CiSettings style={{width: 24, height: 24}} />
                    </Link>
                </div>
                <div className={styles.featuresList}>
                    <FeaturesGrid features={availableModels} />
                </div>

                {/*<div className={styles.tabContent} id={"scrollBlock"}>*/}
                {/*    {value === 0 && (*/}
                {/*        <MyGeneratedPhotosList*/}
                {/*            resetLastPageRef={resetLastPageRef}*/}
                {/*            resetFetchingRef={resetFetchingRef}*/}
                {/*            photosPage={photosPage}*/}
                {/*            setPhotosPage={setPhotosPage}*/}
                {/*            from={'createContent'}*/}
                {/*        />*/}
                {/*    )}*/}
                {/*    {value === 1 && (*/}
                {/*        <MyModels myModels={myModels}/>*/}
                {/*    )}*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default CreateContent;