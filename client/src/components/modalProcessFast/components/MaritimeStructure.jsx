import React from 'react'
import Field from './Field'

const MaritimeStructure = ({info}) => {
  return (
    <>
        <Field title={'House'} description={info.HOUSE}/>
        <Field title={'Cliente'} description={info.CLIENTE}/>
        <Field title={'Referência'} description={info.REF_CLIENT}/>
        <Field title={'Exportador'} description={info.SHIPPER}/>
        <Field title={'Importador'} description={info.CNEE}/>
        <Field title={'CE'} description={info.CE}/>
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
        <Field title={'Navio'} description={info.NAVIO}/>
        <Field title={'Viagem'} description={info.VIAGEM}/>
        {/* <div>
            <p><strong>Conteiners: </strong></p>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <span><strong>Tipo:</strong>{info.CONTAINERS[0].TIPO}</span>
                <span><strong>Num:</strong>{info.CONTAINERS[0].NET_WEIGHT}</span>
                <span><strong>Vol:</strong>{info.CONTAINERS[0].CONTAINER}</span>
            </div>
        </div> */}
        {/* <Field title={'Documentos'} description={info.DOCUMENTOSANEXADOS}/> */}
    </>
  )
}

export default MaritimeStructure