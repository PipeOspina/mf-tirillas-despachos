/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
import {
    Card, CircularProgress, Theme, Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Error } from '@material-ui/icons';

import { IStripComponentData } from '../interfaces/Strip';

interface Props {
    data: IStripComponentData;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: '65vh',
    },
    topBorder: {
        backgroundColor: theme.palette.primary.main,
        width: '100%',
        height: theme.spacing(1.5),
    },
    topBorderError: {
        backgroundColor: theme.palette.error.main,
    },
    textContainer: {
        display: 'flex',
        justifyContent: 'center',
        overflowY: 'auto !important' as any,
        height: `calc(100% - ${theme.spacing(1.5)})`,
        margin: 0,
    },
    text: {
        margin: `${theme.spacing(1)} 0`,
        whiteSpace: 'break-spaces',
        [theme.breakpoints.up('md')]: {
            fontSize: 14,
        },
        [theme.breakpoints.between('sm', 'md')]: {
            fontSize: 12,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 10,
        },
    },
    center: {
        alignItems: 'center',
    },
    errorContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    error: {
        maxWidth: '60%',
        whiteSpace: 'break-spaces',
    },
}));

const Strip = ({ data }: Props) => {
    const [substrings, setSubstrings] = useState<{
        str: { before: string, after: string }, pos: { start: number, end: number }
    }[]>([]);

    const classes = useStyles();

    useEffect(() => {
        if (data.strip?.tiquete) {
            const subs: { str: string, pos: { start: number, end: number }}[] = [];
            let pos = data.strip?.tiquete.indexOf('www.');
            while (pos !== -1) {
                const end = data.strip?.tiquete.indexOf(' ', pos + 1);
                if (end !== -1) {
                    subs.push({
                        str: data.strip?.tiquete.substring(pos, end),
                        pos: { start: pos, end },
                    });
                    pos = data.strip?.tiquete.indexOf('www.', end + 1);
                } else {
                    pos = data.strip?.tiquete.indexOf('www.', pos + 1);
                }
            }

            setSubstrings(subs.map((sub, i) => ({
                ...sub,
                str: {
                    after: sub.str,
                    before: data
                        .strip
                        ?.tiquete
                        .substring(i === 0 ? 0 : subs[i - 1].pos.end, sub.pos.start),
                },
            })));
        }
    }, [data.strip]);

    return (
        <>
            <Card elevation={3} className={classes.root}>
                <div
                    className={`
                        ${classes.topBorder}
                        ${!data.exists && !data.loading ? classes.topBorderError : ''}
                    `}
                />
                <pre
                    className={`
                        ${classes.textContainer}
                        ${!data.exists || data.loading ? classes.center : ''}
                    `}
                >
                    {
                        data.exists && !data.loading && data.strip?.tiquete && (
                            <code className={classes.text}>
                                {
                                    substrings.length
                                        ? substrings.map((substring, i) => (
                                            <span key={`BLANK_LINK_${substring.str.after.toUpperCase()}`}>
                                                {substring.str.before}
                                                <a
                                                    href={`https://${substring.str.after.replace(',', '')}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    {substring.str.after}
                                                </a>
                                                {
                                                    substrings.length === (i + 1)
                                                    && data
                                                        .strip
                                                        ?.tiquete
                                                        .substring(
                                                            substring.pos.end,
                                                            data.strip?.tiquete.length,
                                                        )
                                                }
                                            </span>
                                        ))
                                        : data.strip.tiquete
                                }
                                <div />
                            </code>
                        )
                    }
                    {
                        data.loading && (
                            <CircularProgress />
                        )
                    }
                    {
                        !data.loading && !data.exists && (
                            <div className={classes.errorContainer}>
                                <Error color="error" fontSize="large" />
                                <br />
                                <br />
                                <br />
                                <Typography className={classes.error} align="center" color="error">
                                    No encontramos la tirilla que intentas visualizar.
                                    <br />
                                    <br />
                                    Intenta de nuevo más tarde o contacta a soporte técnico.
                                </Typography>
                            </div>
                        )
                    }
                </pre>
            </Card>
        </>
    );
};

export default Strip;
