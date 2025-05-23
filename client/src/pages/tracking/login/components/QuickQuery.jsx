import React, { useState } from 'react'
import Card from '../../../../components/card/Card'
import { FaMapMarkerAlt } from 'react-icons/fa'
import Input from '../../../../components/input/Input'
import Button from '../../../../components/button/Button'
import { toast } from 'react-toastify'
import api from '../../../../api'

const QuickQuery = ({setTrackingData, toggleModal}) => {
  const [trackingCode, setTrackingCode] = useState('')

  const handleDataCapFast = async () => {
    try {
      if (!trackingCode) return toast.error("Cod.de rastreamento necessário")
      const response = await api.get(`/process/cap-fast/${trackingCode}`);
      setTrackingData(response.data)
      toggleModal()
    } catch (error) {

    }
  }

  return (
    <Card style={{ justifyContent: 'unset', paddingTop: '2.75rem' }}>
      <p className='cardTitle'>Consulta Rápida</p>

      <div>
        <div className='inputWrap'>
          <Input icon={<FaMapMarkerAlt/>} placeholder="Cod. de Rastreamento" type="text" value={trackingCode} onChange={(e) => setTrackingCode(e.target.value)} />
        </div>
      </div>

      <Button text="Consultar" func={handleDataCapFast} />
    </Card>
  )
}

export default QuickQuery;