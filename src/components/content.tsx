/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-has-content */
import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Grow,
    Theme,
} from '@material-ui/core';
import { GetApp } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useRef, useState } from 'react';
import { savePDF } from '@progress/kendo-react-pdf';
import { useLocation } from 'react-router-dom';

import { stripService } from '../services/firestore';
import Header from './header';
import Strip from './strip';
import { IStripComponentData } from '../interfaces/Strip';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: theme.spacing(5),
    },
    divider: {
        [theme.breakpoints.up('md')]: {
            width: '130%',
            marginLeft: '-15% !important',
        },
        margin: `${theme.spacing(3)} 0 ${theme.spacing(5)} 0 !important`,
    },
    downloadButton: {
        borderRadius: '50px !important',
        backgroundColor: 'white !important',
        color: `${theme.palette.primary.main} !important`,
        width: '100%',
        marginTop: `${theme.spacing(3)} !important`,
        height: 42,
    },
}));

const useQuery = () => new URLSearchParams(useLocation().search);

const Content = () => {
    const [strip, setStrip] = useState<IStripComponentData>({ loading: true });
    const [downloadUrl, setDownloadUrl] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

    const linkRef = useRef<HTMLAnchorElement | null>(null);
    const pdfRef = useRef<HTMLDivElement | null>(null);
    const query = useQuery();

    const classes = useStyles();

    const downloadStripe = (type: 'pdf' | 'txt') => {
        switch (type) {
        case 'pdf':
            savePDF(
                pdfRef.current,
                {
                    paperSize: 'A4',
                    margin: {
                        bottom: 50,
                        left: 100,
                        right: 100,
                        top: 50,
                    },
                    author: 'Coordinadora Mercantil',
                    fileName: `Tirilla Digital - ${strip.strip?.idLlamada} - ${strip.strip?.fechaLlamada}.pdf`,
                },
            );
            break;
        case 'txt':
            linkRef.current.click();
            break;
        default:
            break;
        }
        setOpenDialog(false);
    };

    useEffect(() => {
        if (strip.strip?.tiquete) {
            document.title = `Relación de despachos - ${strip.strip?.idLlamada} - ${strip.strip?.fechaLlamada}`;
            const data = new Blob([strip.strip.tiquete], { type: 'text/plain' });
            if (downloadUrl) window.URL.revokeObjectURL(downloadUrl);
            setDownloadUrl(window.URL.createObjectURL(data));
        }
    }, [strip.strip]);

    useEffect(() => {
        const stripID = query.get('at');
        let unsubscribe;
        if (stripID) {
            setStrip({ loading: true });
            unsubscribe = stripService
                .doc(stripID)
                .onSnapshot({
                    next: (resStrip) => {
                        const data = resStrip.data();
                        setStrip({
                            loading: false,
                            strip: data,
                            exists: resStrip.exists,
                        });
                    },
                });
            if (window?.location) {
                setTimeout(() => {
                    setStrip((current) => {
                        if (current.loading) {
                            window.location.reload();
                        }
                        return current;
                    });
                }, 5000);
            }
        } else {
            setStrip({
                loading: false,
                strip: undefined,
                exists: false,
            });
        }

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);

    return (
        <>
            <Container maxWidth="xs" className={classes.root}>
                <div ref={pdfRef}>
                    <Header normalText={openDialog} />
                    <Divider className={classes.divider} />
                    <Strip data={strip} />
                </div>
                <Grow in={strip.exists && !strip.loading}>
                    <Button
                        variant="contained"
                        startIcon={<GetApp />}
                        className={classes.downloadButton}
                        onClick={() => setOpenDialog(true)}
                        disabled={!strip.exists || strip.loading}
                    >
                        Descargar
                    </Button>
                </Grow>
                <a
                    download={`Relación de despachos - ${strip.strip?.idLlamada} - ${strip.strip?.fechaLlamada}.txt`}
                    ref={linkRef}
                    href={downloadUrl}
                    hidden
                />
            </Container>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="xs">
                <DialogTitle>
                    Descargar Tirilla
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Tienes 2 formatos disponibles para descargar tu
                        tirilla, elige alguna para comenzar la descarga.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => downloadStripe('txt')} variant="contained">Archivo de Texto</Button>
                    <Button onClick={() => downloadStripe('pdf')} variant="contained">PDF</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Content;
