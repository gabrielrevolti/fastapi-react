import React from 'react'
import Field from './Field'

const AerialStructure = ({info}) => {
  return (
    <>
        <Field title={'Master'} description={info.MASTER}/>
        <Field title={'House'} description={info.HOUSE}/>
        <Field title={'Cliente'} description={info.CLIENTE}/>
        <Field title={'Referência'} description={info.REF_CLIENT}/>
        <Field title={'Exportador'} description={info.SHIPPER}/>
        <Field title={'Importador'} description={info.CNEE}/>
        <Field title={'ETD'} description={info.ETD}/>
        <Field title={'ETA'} description={info.ETA}/>
        <Field title={'Carrier'} description={info.CARRIER}/>
        <Field title={'Mercadoria'} description={info.MERCADORIA}/>
        <Field title={'Volumes'} description={info.VOLUMES}/>
        <Field title={'Gross'} description={info.PESO_BRUTO}/>
        <Field title={'Origem'} description={info.ORIGIN}/>
        <Field title={'Destino'} description={info.DESTINATION}/>
        <Field title={'M3'} description={info.M3}/>
        <Field title={'Peso a cobrar'} description={info.PESO_COBRAR}/>
        <Field title={'Incoterm'} description={info.INCOTERM}/>
        <Field title={'Viagem'} description={info.VIAGEM}/>
        {/* <Field title={'Documentos'} description={info.DOCUMENTOSANEXADOS}/> */}
    </>
  )
}

export default AerialStructure