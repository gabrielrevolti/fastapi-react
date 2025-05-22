import { AiOutlineClose } from "react-icons/ai";
import './ModalProcessFast.css'
import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
} from '@chakra-ui/react'
import AerialStructure from "./components/AerialStructure";
import MaritimeStructure from "./components/MaritimeStructure";



const ModalProcessFast = ({ trackingData, state, func }) => {

  const status = trackingData.statusTimeLine
  const generalDataCap = trackingData?.generalDataCap
  const occurences = Object.values(trackingData?.occurrences || {})
  let steps = []

  console.log('Queries')
  console.log(status)
  console.log(generalDataCap)
  console.log(occurences)

  if (occurences.length > 20) {
    steps =
      occurences.map((occurence) => (
        { title: occurence["DESCRICAO"], description: occurence["DATA"] }
      ))

  } else {
    steps = [
      { title: 'Embarque Criado', description: status?.DATE_CREATION, validation: status?.DATE_CREATION },
      { title: 'Embarque Previsto', description: status?.FORECASTS_ARRIVAL, validation: status?.FORECASTS_ARRIVAL },
      { title: 'Em Trânsito', description: status?.FORECASTS_OUTPUT, validation: status?.FORECASTS_OUTPUT },
      { title: 'Chegada', description: null, validation: status?.IS_CONFIRMED_ARRIVAL },
      { title: 'Finalizado', description: null, validation: status?.IS_CONFIRMED_OUTPUT },
    ]
  }

  console.log(steps)

  const validSteps = steps.filter((step) => {
    const desc = step.validation
    return typeof desc === 'string' && (
      /\d{4}-\d{2}-\d{2}/.test(desc) || // data no formato aaaa-mm-dd
      desc.includes('\u0001')          // ou contém \u0001
    )
  })

  if (state) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      {state && (
        <div className="modal">
          <div onClick={func} className="overlay"></div>
          <div className="modal-content">

            <div className="divisor1">
              <p className="titleModal">Linha do Tempo</p>
              <div className="stepperContainer">
                <Stepper size="lg" index={validSteps.length} orientation='vertical' height='500px' gap='0' colorScheme="green">
                  {steps.map((step, index) => (
                    <Step key={index}>
                      <StepIndicator>
                        <StepStatus complete={<StepIcon />} />
                      </StepIndicator>

                      <Box>
                        <StepTitle>{step.title}</StepTitle>
                        <StepDescription>{step.description}</StepDescription>
                      </Box>

                      <StepSeparator />
                    </Step>
                  ))}
                </Stepper>
              </div>
            </div>

            <div className="divisor2">
              <p className="titleModal">Informações do Processo - {generalDataCap.PROCESSO}</p>
              <div className="informationProcessContainer">

                {(generalDataCap.PROCESSO.startsWith('CAI') || generalDataCap.PROCESSO.startsWith('CAE')) && (
                  <div style={{ display: 'flex', height: '400px' }}>
                    <div className="gridFields">
                      <AerialStructure info={generalDataCap} />
                    </div>

                  </div>
                )}

                {(generalDataCap.PROCESSO.startsWith('CMI') || generalDataCap.PROCESSO.startsWith('CME')) && (
                  <div style={{ display: 'flex', height: '400px' }}>
                    <div className="gridFields">
                      <MaritimeStructure info={generalDataCap} />
                    </div>
                    <div>
                      <div>
                        <p><strong>Conteiners: </strong></p>
                        <div className="containerArray">
                          <span><strong>Tipo:</strong>{generalDataCap.CONTAINERS[0].TIPO}</span>
                          <span><strong>Num:</strong>{generalDataCap.CONTAINERS[0].NET_WEIGHT}</span>
                          <span><strong>Vol:</strong>{generalDataCap.CONTAINERS[0].CONTAINER}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}


              </div>
            </div>

            <AiOutlineClose className="close-btn close-modal" onClick={func} />
          </div>
        </div>
      )
      }
    </>
  )
}

export default ModalProcessFast