import { useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import {
  CreditCardView,
  CreditCardInput,
  LiteCreditCardInput,
  type CreditCardFormData,
  type CreditCardFormField,
  type ValidationState,
} from '@puhl/react-native-credit-card-input';

const s = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 600,
    marginHorizontal: 'auto',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginTop: 60,
  },
  switch: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  cardView: {
    alignSelf: 'center',
    marginTop: 15,
  },
  cardInput: {
    marginTop: 15,
    borderColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  infoContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: '#dfdfdf',
    borderRadius: 5,
  },
  info: {
    fontFamily: Platform.select({
      ios: 'Courier',
      android: 'monospace',
      web: 'monospace',
    }),
  },
});

const toStatusIcon = (status?: ValidationState) =>
  status === 'valid' ? '✅' : status === 'invalid' ? '❌' : '❓';

const errorMessages = {
  number: {
    invalid: 'Número do cartão inválido ou incompleto',
    incomplete: 'Número do cartão incompleto',
  },
  expiry: {
    invalid: 'Data de validade inválida ou incompleta',
    incomplete: 'Data de validade incompleta',
  },
  cvc: {
    invalid: 'CVC inválido ou incompleto',
    incomplete: 'CVC incompleto',
  },
  name: 'Nome do titular é obrigatório',
};

export default function Example() {
  const [useLiteInput, setUseLiteInput] = useState(false);

  const [focusedField, setFocusedField] = useState<CreditCardFormField>();

  const [formData, setFormData] = useState<CreditCardFormData>();

  return (
    <ScrollView contentContainerStyle={s.container}>
      <Switch
        style={s.switch}
        onValueChange={(v) => {
          setUseLiteInput(v);
          setFormData(undefined);
        }}
        value={useLiteInput}
      />

      <CreditCardView
        focusedField={focusedField}
        type={formData?.values.type}
        number={formData?.values.number}
        expiry={formData?.values.expiry}
        cvc={formData?.values.cvc}
        name={formData?.values.name}
        style={s.cardView}
        monthYearLabel="Month/Year"
      />

      {useLiteInput ? (
        <LiteCreditCardInput
          autoFocus
          style={s.cardInput}
          onChange={setFormData}
          onFocusField={setFocusedField}
          // Add custom error messages for LiteCreditCardInput if supported
          // errorMessages={errorMessages}
        />
      ) : (
        <CreditCardInput
          autoFocus
          style={s.cardInput}
          onChange={setFormData}
          onFocusField={setFocusedField}
          // Pass custom error messages
          errorMessages={errorMessages}
          labels={{
            number: 'Número do Cartão',
            expiry: 'Validade',
            cvc: 'CVC',
            name: 'Nome do Titular',
          }}
          placeholders={{
            number: '1234 5678 1234 5678',
            expiry: 'MM/AA',
            cvc: '123',
            name: 'JOHN DOE',
          }}
        />
      )}

      <View style={s.infoContainer}>
        <Text style={s.info}>
          {formData?.valid
            ? '✅ Possivelmente cartão válido'
            : '❌ Cartão inválido ou incompleto'}
        </Text>

        <Text style={s.info}>
          {toStatusIcon(formData?.status.number)}
          {' Número\t: '}
          {formData?.values.number}
        </Text>

        <Text style={s.info}>
          {toStatusIcon(formData?.status.expiry)}
          {' Validade\t: '}
          {formData?.values.expiry}
        </Text>

        <Text style={s.info}>
          {toStatusIcon(formData?.status.cvc)}
          {' CVC   \t: '}
          {formData?.values.cvc}
        </Text>

        <Text style={s.info}>
          {'ℹ️ Tipo  \t: '}
          {formData?.values.type}
        </Text>

        <Text style={s.info}>
          {'📛 Nome  \t: '}
          {formData?.values.name}
        </Text>
      </View>
    </ScrollView>
  );
}
