import React from 'react';
import {  } from '@material-ui/core';
import  { InputField } from 'govuk-react'
import FieldValueList from '../../designSystemExtensions/FieldValueList';

export default function TextInput(props) {
  const {
    label,
    required,
    disabled,
    value = '',
    validatemessage,
    status,
    onChange,
    onBlur,
    readOnly,
    testId,
    fieldMetadata,
    helperText,
    displayMode,
    type
  } = props;

  const helperTextToDisplay = validatemessage || helperText;

  const maxLength = fieldMetadata?.maxLength;

  let readOnlyProp = {}; // Note: empty if NOT ReadOnly

  var typeProp = type; //TODO Remove - after updating password field in PEGA to be password type

  if (displayMode === 'LABELS_LEFT') {
    const field = {
      [label]: value
    };
    return <FieldValueList item={field} />;
  }

  //TODO Remove - workaround for password field for PoC
  if(label === "Password"){
    typeProp = "password";
  }

  if (readOnly) {
    readOnlyProp = { readOnly: true };
  }

  let testProp = {};

  testProp = {
    'data-test-id': testId
  };

  return (
    <InputField hint = {helperText} input = {{required, disabled, value, onChange, onBlur, placeholder:"", ...readOnlyProp, type:typeProp}}>
          {label}
    </InputField>
  );
}
