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
    useSteps,
  } from '@chakra-ui/react'



const ModalProcessFast = ({ trackingData ,state, func}) => {

    const steps = [
        { title: 'Embarque Criado', description: '01/01/2025' },
        { title: 'Embarque Previsto', description: '00/00/2025' },
        { title: 'Em Trânsito', description: '00/00/2025' },
        { title: 'Chegada', description: null},
        { title: 'Finalizado', description: null },
      ]

    const { activeStep } = useSteps({
        index: 1,
        count: steps.length,
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
                        <div className="marginTeste">
                            <Stepper size="lg" index={activeStep} orientation='vertical' height='500px' gap='0' colorScheme="green">
                                {steps.map((step, index) => (
                                    <Step key={index}>
                        
                                            <StepIndicator>
                                                <StepStatus complete={<StepIcon/>} />
                                            </StepIndicator>

                                            <Box>
                                                <StepTitle fontSize="lg">{step.title}</StepTitle>
                                                <StepDescription>{step.description}</StepDescription>
                                            </Box>
                        
                                        <StepSeparator/>
                                    </Step>
                                ))}
                            </Stepper>
                        </div>
                    </div>

                    <div className="divisor2">
                        <p className="titleModal">Informações do Processo-</p>
                    </div>
                    <AiOutlineClose className="close-btn close-modal" onClick={func}/>
                  </div>
                </div>
            )
            }
        </>
    )
}

export default ModalProcessFast