import React from 'react'
import Field from './Field'

const MaritimeStructure = ({ info }) => {
  const container = info.CONTAINERS[0]
  return (
    <>
      <div className="gridFields">
        <Field title={'House'} description={info.HOUSE} />
        <Field title={'Cliente'} description={info.CLIENTE} />
        <Field title={'Referência'} description={info.REF_CLIENT} />
        <Field title={'Exportador'} description={info.SHIPPER} />
        <Field title={'Importador'} description={info.CNEE} />
        <Field title={'CE'} description={info.CE} />
        <Field title={'ETD'} description={info.ETD} />
        <Field title={'ETA'} description={info.ETA} />
        <Field title={'Carrier'} description={info.CARRIER} />
        <Field title={'Mercadoria'} description={info.MERCADORIA} />
        <Field title={'Volumes'} description={info.VOLUMES} />
        <Field title={'Gross'} description={info.PESO_BRUTO} />
        <Field title={'Origem'} description={info.ORIGIN} />
        <Field title={'Destino'} description={info.DESTINATION} />
        <Field title={'M3'} description={info.M3} />
        <Field title={'Peso a cobrar'} description={info.PESO_COBRAR} />
        <Field title={'Incoterm'} description={info.INCOTERM} />
        <Field title={'Navio'} description={info.NAVIO} />
        <Field title={'Viagem'} description={info.VIAGEM} />
      </div>
      <div>
        {(Object.keys(info.CONTAINERS).length > 0 ? info.CONTAINERS : null) && (
          <>
            <p><strong>Conteiners: </strong></p>
            <div className="containerArray">
              <span><strong>Tipo: </strong>{(container.TIPO) ? container.TIPO : '-----'}</span>
              <span><strong>Num: </strong>{(container.NET_WEIGHT) ? container.NET_WEIGHT : '-----'}</span>
              <span><strong>Vol: </strong>{(container.CONTAINER) ? container.CONTAINER : '-----'}</span>
            </div>
          </>
        )}

        <div>
          <div>
            {(info.DOCUMENTOSANEXADOS.length > 0) && (
              <div className='documents'>
                <p><strong>Documentos:</strong></p>
                <div>
                  {info.DOCUMENTOSANEXADOS.map((document, index) => (
                    <span key={index}>
                      <a className='linkStyle'
                        href={`http://localhost:8000/process/documents?path=${encodeURIComponent(document.PATH)}`}
                        target="_blank"
                      >
                        {document.ARQUIVO}
                      </a>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <Field title={'Documentos'} description={info.DOCUMENTOSANEXADOS}/> */}
    </>
  )
}

export default MaritimeStructure