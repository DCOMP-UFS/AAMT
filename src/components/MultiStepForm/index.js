import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';

import InspectionsForm from '../../pages/Inspections/InspectionsForm';
import RecipientList from '../../pages/Inspections/RecipientList';
import RecipientForm from '../../pages/Inspections/RecipientForm';

const MultiStepForm = () => {
  const currentIndex = useSelector(state => state.routes.currentRouteIndex);
  const totalInspections = useSelector(state => state.routes.totalInspections);
  const trab_diario_id = useSelector(
    state => state.routes.routes[currentIndex].trabalhoDiario.id
  );
  const [step, setStep] = useState(1);
  const [steps, setSteps] = useState([
    { id: 'Situação da vistoria' },
    { id: 'Depósitos inspecionados' },
    { id: 'Inspecionar depósito' },
  ]);
  const defaultData = {
    situacaoVistoria: '',
    pendencia: '',
    trabalhoDiario_id: trab_diario_id,
    horaEntrada: '',
    recipientes: [],
    justificativa: '',
  };
  const [form, setForm] = useState(defaultData);

  const route = useRoute();
  const { blockIndex, streetIndex, propertyIndex } = route.params;

  const address = {
    blockIndex,
    streetIndex,
    propertyIndex,
  };

  const props = {
    form,
    setForm,
    step,
    setStep,
    steps,
    trab_diario_id,
    totalInspections,
    address,
  };

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
