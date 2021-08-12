/* eslint-disable react/require-default-props */
import { Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

interface Props {
    normalText?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: `${theme.spacing(5)} 0 0 0`,
    },
    logoLink: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        maxWidth: '60%',
        marginBottom: theme.spacing(3),
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        '& > *': {
            color: theme.palette.primary.main,
            '&:not(:last-child)': {
                marginBottom: `${theme.spacing(1)} !important`,
            },
        },
    },
    text: {
        [theme.breakpoints.up('md')]: {
            whiteSpace: 'nowrap',
        },
    },
}));

const Header = ({ normalText }: Props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <a className={classes.logoLink} href="https://www.coordinadora.com">
                <svg className={classes.logo} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 229.539 21.198">
                    <g id="Logo_Coordinadora" transform="translate(-432.971 -101.107)">
                        <path id="Trazado_3860" d="M449.41,109.767a5.585,5.585,0,0,0-4.062-2.065,4.893,4.893,0,0,0-4.692,4,3.414,3.414,0,0,0,3.541,4,7.023,7.023,0,0,0,4.575-1.9l-1.437,7.677a17.649,17.649,0,0,1-5.434.822c-5.862,0-9.721-4.56-8.793-10.41a13,13,0,0,1,12.447-10.787,14.211,14.211,0,0,1,4.877.85Z" transform="translate(0 0)" fill="#161615" />
                        <path id="Trazado_3861" d="M514.981,101.574H524c4.637,0,8.248,1.954,7.431,7.131-.494,3.109-1.9,4.415-4.824,5.34l-.026.173a3.974,3.974,0,0,1,1.053,1.221l3.417,6.673h-8.61l-2.222-6.59h-.143l-1.045,6.59h-7.295Zm5.859,9.09h.519c1.23,0,2.482-.183,2.728-1.714.25-1.577-.835-1.774-2.119-1.774H521.4Z" transform="translate(-22.953 -0.136)" fill="#161615" />
                        <path id="Trazado_3862" d="M541.09,101.574H548.7c6.893,0,11.7,3.021,10.5,10.568a11.632,11.632,0,0,1-11.9,9.969h-9.454Zm5.185,14.371h.464c2.481,0,4.572-1.133,5-3.834.461-2.889-1-4.109-3.724-4.109h-.468Z" transform="translate(-30.561 -0.136)" fill="#161615" />
                        <path id="Trazado_3863" d="M570.584,101.574h7.471l-3.26,20.537h-7.462Z" transform="translate(-39.157 -0.136)" fill="#161615" />
                        <path id="Trazado_3864" d="M583.546,101.574h7.164l4.9,11.388h.222c-.035-.1,1.176-11.388,1.176-11.388h7.134l-3.257,20.537h-7.133L588.9,111.323h-.218s-1.249,10.788-1.249,10.788h-7.141Z" transform="translate(-42.933 -0.136)" fill="#161615" />
                        <path id="Trazado_3865" d="M616.954,122.111h-7.9l10.393-20.537h8.256l4.071,20.537h-7.9l-.269-2.56h-5.645Zm6.116-7.437s-.375-5.394-.368-6.263h-.274l-2.35,6.263Z" transform="translate(-51.317 -0.136)" fill="#161615" />
                        <path id="Trazado_3866" d="M644.354,101.574h7.6c6.9,0,11.7,3.021,10.5,10.568a11.627,11.627,0,0,1-11.9,9.969h-9.454Zm5.182,14.371H650c2.474,0,4.562-1.133,4.993-3.834.454-2.889-1.009-4.109-3.739-4.109H650.8Z" transform="translate(-60.654 -0.136)" fill="#161615" />
                        <path id="Trazado_3867" d="M693.651,111.76c-1.039,6.591-6.761,10.544-13.035,10.544s-10.726-3.953-9.683-10.544c1.018-6.46,6.8-10.653,13.041-10.653s10.7,4.193,9.677,10.653m-15.22.108c-.366,2.345.953,3.94,3.214,3.94a4.5,4.5,0,0,0,4.47-3.94c.342-2.18-.84-4-3.21-4a4.6,4.6,0,0,0-4.475,4" transform="translate(-69.305 0)" fill="#161615" />
                        <path id="Trazado_3868" d="M704.69,101.574h9.019c4.626,0,8.244,1.954,7.425,7.131-.5,3.109-1.9,4.415-4.824,5.34l-.03.173a4.057,4.057,0,0,1,1.058,1.221l3.416,6.673h-8.6l-2.231-6.59h-.137l-1.044,6.59h-7.3Zm5.861,9.09h.517c1.214,0,2.479-.183,2.719-1.714.254-1.577-.837-1.774-2.117-1.774h-.57Z" transform="translate(-78.238 -0.136)" fill="#161615" />
                        <path id="Trazado_3869" d="M732.754,122.111h-7.9l10.388-20.537H743.5l4.073,20.537h-7.907l-.265-2.56h-5.648Zm6.11-7.437s-.378-5.394-.37-6.263h-.274l-2.348,6.263Z" transform="translate(-85.064 -0.136)" fill="#161615" />
                        <path id="Trazado_3870" d="M494.4,101.729a15.288,15.288,0,0,0-7.653,1.927c.21.3.443.519.661.813a7.748,7.748,0,0,1,1.623,4.929v.5a4.9,4.9,0,0,1,3.685-1.679,2.911,2.911,0,0,1,2.956,3.883,5.049,5.049,0,0,1-4.871,3.847,3.076,3.076,0,0,1-2.867-1.611,14.127,14.127,0,0,1-5.225,5.961,11.6,11.6,0,0,0,6.483,1.9c6.412-.008,12.586-3.767,14.207-10.108,1.533-6.252-2.675-10.3-9-10.369" transform="translate(-14.495 -0.18)" fill="#00519f" fillRule="evenodd" />
                        <path id="Trazado_3871" d="M471.4,101.556a17.608,17.608,0,0,0-2.647.224c-5.367.884-10.231,4.583-11.552,9.948-1.6,6.418,2.679,10.246,9.073,10.308a15.728,15.728,0,0,0,2.5-.227c5.445-.813,10.23-4.353,11.624-9.888,1.614-6.253-2.6-10.3-9-10.364m1.343,10.379a5.038,5.038,0,0,1-3.968,3.761,5.609,5.609,0,0,1-.968.07,2.886,2.886,0,0,1-2.95-3.906,5.12,5.12,0,0,1,3.9-3.666,4.49,4.49,0,0,1,1.041-.147,2.929,2.929,0,0,1,2.941,3.889" transform="translate(-6.963 -0.131)" fill="#00519f" fillRule="evenodd" />
                    </g>
                </svg>
            </a>
            <div className={classes.title}>
                <Typography variant="h5"><b>Relación de despachos</b></Typography>
                <Typography align="center" className={normalText ? '' : classes.text}>
                    ¡Hola! Te presentamos tu relación de despachos
                    para la revisión y descarga de ella
                </Typography>
            </div>
        </div>
    );
};

export default Header;
