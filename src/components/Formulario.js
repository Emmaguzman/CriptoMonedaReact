import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled'

import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import Error from './Error';


const Boton = styled.input`
margin-top:20px;
font-weight:bold;
font-size:20px;
padding:10px;
background-color:#66a2fe;
border:none;
width:100%;
border-radius:10px;
color:#FFF;
transition:background-color .3s ease;

&:hover{
    background-color:#326ac0;
    cursor:pointer;
}
`;


const Formulario = ({setMoneda,setCriptomoneda}) => {

    //state listado criptomonedas

    const [listaCripto, setListaCripto] = useState([]);
    const [error, setError] = useState(false);
    const MONEDAS = [
        { codigo: 'USD', nombre: "Dolar Estados Unidos" },
        { codigo: 'ARG', nombre: "Pesos Argentinos" },
        { codigo: 'MXN', nombre: "Pesos Mexicanos" },
        { codigo: 'EUR', nombre: "Euro" }
    ]
    //utilizar useMoneda
    const [moneda, SelectMoneda] = useMoneda('Elige tu moneda', '', MONEDAS);
    //utilizar useCriptomoneda
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu criptomoneda', '', listaCripto)

    //llamado a api
    useEffect(() => {
        const consultarAPI = async () => {
            const URL = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const res = await axios.get(URL);
            setListaCripto(res.data.Data);
        }
        consultarAPI();
    }, [])

    const _cotizarMoneda = e => {
        e.preventDefault();
        //validar que ambos campos estan llenos
        if (moneda === '' || criptomoneda === '') {
            setError(true)
            return;
        }
        setError(false);
        //pasar a componente principal
        setMoneda(moneda);
        setCriptomoneda(criptomoneda)

    }
    return (
        <form
            onSubmit={_cotizarMoneda}
        >
            {error ? <Error mensaje="Todos los campos son obligatorios"/> : null}
            <SelectMoneda />
            <SelectCripto />
            <Boton
                type='submit'
                value="Calcular"
            />
        </form>
    );
}

export default Formulario;