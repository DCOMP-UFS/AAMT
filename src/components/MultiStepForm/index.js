import React, { useState } from 'react';
import { View } from 'react-native';
import { useEffect } from 'react/cjs/react.development';

import InspectionsForm from '../../pages/Inspections/InspectionsForm';
import RecipientList from '../../pages/Inspections/RecipientList';
import RecipientForm from '../../pages/Inspections/RecipientForm';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [steps, setSteps] = useState([
    { id: 'Situação da vistoria' },
    { id: 'Depósitos inspecionados' },
    { id: 'Inspecionar depósito' },
  ]);
  const defaultData = {
    situacaoVistoria: '',
    pendencia: '',
    trabalhoDiario_id: -1,
    horaEntrada: '',
    recipientes: [],
    justificativa: 'hvkfhdklhglkfjgglksfhjlfgjf',
  };
  const [form, setForm] = useState(defaultData);

  const props = { form, setForm, step, setStep, steps };

  switch (step) {
    case 1:
      return <InspectionsForm {...props} />;
    case 2:
      return <RecipientList {...props} />;
    case 3:
      return <RecipientForm {...props} />;
    default:
      return null;
  }
};

export default MultiStepForm;
