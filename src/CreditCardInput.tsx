import { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import {
  useCreditCardForm,
  type CreditCardFormData,
  type CreditCardFormField,
} from './useCreditCardForm';

interface Props {
  autoFocus?: boolean;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
  placeholderColor?: string;
  labels?: {
    number: string;
    expiry: string;
    cvc: string;
    name?: string;
  };
  placeholders?: {
    number: string;
    expiry: string;
    cvc: string;
    name?: string;
  };
  onChange: (formData: CreditCardFormData) => void;
  onFocusField?: (field: CreditCardFormField) => void;
  testID?: string;
  errorMessages?: {
    number?: {
      invalid?: string;
      incomplete?: string;
    };
    expiry?: {
      invalid?: string;
      incomplete?: string;
    };
    cvc?: {
      invalid?: string;
      incomplete?: string;
    };
    name?: string;
  };
}

const s = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  icon: {
    width: 48,
    height: 40,
    resizeMode: 'contain',
  },
  numberInput: {},
  extraContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  expiryInputContainer: {
    flex: 1,
    marginRight: 5,
  },
  cvcInputContainer: {
    flex: 1,
    marginLeft: 5,
  },
  input: {
    height: 40,
    fontSize: 16,
    borderBottomColor: 'darkgray',
    borderBottomWidth: 1,
    // @ts-expect-error outlineWidth is used to hide the text-input outline on react-native-web
    outlineWidth: 0,
  },
  nameInput: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 600,
  },
  invalidInput: {
    borderBottomColor: 'red',
    borderBottomWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

const CreditCardInput = (props: Props) => {
  const {
    autoFocus,
    style,
    labelStyle,
    inputStyle,
    placeholderColor = 'darkgray',
    labels = {
      number: 'CARD NUMBER',
      expiry: 'EXPIRY',
      cvc: 'CVC/CVV',
      name: 'CARDHOLDER NAME',
    },
    placeholders = {
      number: '1234 5678 1234 5678',
      expiry: 'MM/YY',
      cvc: 'CVC',
      name: 'JOHN DOE',
    },
    onChange = () => {},
    onFocusField = () => {},
    testID,
    errorMessages = {},
  } = props;

  const {
    values,
    errors: formErrors,
    onChangeValue,
  } = useCreditCardForm(onChange);

  const nameInput = useRef<TextInput>(null);
  const numberInput = useRef<TextInput>(null);

  useEffect(() => {
    if (autoFocus) numberInput.current?.focus();
  }, [autoFocus]);

  return (
    <View
      style={[s.container, style]}
      testID={testID}
    >
      <View style={[s.nameInput]}>
        <Text style={[s.inputLabel, labelStyle]}>{labels.name}</Text>
        <TextInput
          ref={nameInput}
          style={[
            s.input,
            inputStyle,
            formErrors.name === 'invalid' ? s.invalidInput : null,
          ]}
          placeholderTextColor={placeholderColor}
          placeholder={placeholders.name}
          value={values.name}
          onChangeText={(v) => onChangeValue('name', v)}
          onFocus={() => onFocusField('name')}
          autoCorrect={false}
          underlineColorAndroid={'transparent'}
          testID="CC_NAME"
        />
        {formErrors.name === 'invalid' && errorMessages.name && (
          <Text style={s.errorText}>{errorMessages.name}</Text>
        )}
      </View>

      <View style={[s.numberInput]}>
        <Text style={[s.inputLabel, labelStyle]}>{labels.number}</Text>
        <TextInput
          ref={numberInput}
          keyboardType="numeric"
          style={[
            s.input,
            inputStyle,
            formErrors.number === 'invalid' ||
            formErrors.number === 'incomplete'
              ? s.invalidInput
              : null,
          ]}
          placeholderTextColor={placeholderColor}
          placeholder={placeholders.number}
          value={values.number}
          onChangeText={(v) => onChangeValue('number', v)}
          onFocus={() => onFocusField('number')}
          autoCorrect={false}
          underlineColorAndroid={'transparent'}
          testID="CC_NUMBER"
          textContentType="creditCardNumber" // Enable auto-suggestion on iOS
          autoComplete="cc-number" // Enable auto-suggestion on Android
        />
        {formErrors.number && errorMessages.number && (
          <Text style={s.errorText}>
            {formErrors.number === 'invalid'
              ? errorMessages.number.invalid
              : errorMessages.number.incomplete}
          </Text>
        )}
      </View>

      <View style={[s.extraContainer]}>
        <View style={s.expiryInputContainer}>
          <Text style={[s.inputLabel, labelStyle]}>{labels.expiry}</Text>
          <TextInput
            keyboardType="numeric"
            style={[
              s.input,
              inputStyle,
              formErrors.expiry === 'invalid' ? s.invalidInput : null,
            ]}
            placeholderTextColor={placeholderColor}
            placeholder={placeholders.expiry}
            value={values.expiry}
            onChangeText={(v) => onChangeValue('expiry', v)}
            onFocus={() => onFocusField('expiry')}
            autoCorrect={false}
            underlineColorAndroid={'transparent'}
            testID="CC_EXPIRY"
          />
          {formErrors.expiry && errorMessages.expiry && (
            <Text style={s.errorText}>
              {formErrors.expiry === 'invalid'
                ? errorMessages.expiry.invalid
                : errorMessages.expiry.incomplete}
            </Text>
          )}
        </View>

        <View style={s.cvcInputContainer}>
          <Text style={[s.inputLabel, labelStyle]}>{labels.cvc}</Text>
          <TextInput
            keyboardType="numeric"
            style={[
              s.input,
              inputStyle,
              formErrors.cvc === 'invalid' || formErrors.cvc === 'incomplete'
                ? s.invalidInput
                : null,
            ]}
            placeholderTextColor={placeholderColor}
            placeholder={placeholders.cvc}
            value={values.cvc}
            onChangeText={(v) => onChangeValue('cvc', v)}
            onFocus={() => onFocusField('cvc')}
            autoCorrect={false}
            underlineColorAndroid={'transparent'}
            testID="CC_CVC"
          />
          {formErrors.cvc && errorMessages.cvc && (
            <Text style={s.errorText}>
              {formErrors.cvc === 'invalid'
                ? errorMessages.cvc.invalid
                : errorMessages.cvc.incomplete}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default CreditCardInput;
