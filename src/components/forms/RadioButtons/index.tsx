import React, { useState, useEffect } from 'react';
import {
  Radio as RadioMUI,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormHelperText
} from '@material-ui/core';
import {Radio, Fieldset} from 'govuk-react';

import Utils from '../../../helpers/utils';
import handleEvent from '../../../helpers/event-utils';

export default function RadioButtons(props) {
  const {
    getPConnect,
    label,
    value = '',
    readOnly,
    validatemessage,
    helperText,
    status,
    required,
    inline
  } = props;
  const [theSelectedButton, setSelectedButton] = useState(value);

  const thePConn = getPConnect();
  const theConfigProps = thePConn.getConfigProps();
  const actionsApi = thePConn.getActionsApi();
  const propName = thePConn.getStateProps().value;
  const helperTextToDisplay = validatemessage || helperText;

  // theOptions will be an array of JSON objects that are literally key/value pairs.
  //  Ex: [ {key: "Basic", value: "Basic"} ]
  const theOptions = Utils.getOptionList(theConfigProps, thePConn.getDataObject());

  useEffect(() => {
    // This update theSelectedButton which will update the UI to show the selected button correctly
    setSelectedButton(value);
    console.log(JSON.stringify(theOptions));
  }, [value]);

  const handleChange = event => {
    handleEvent(actionsApi, 'changeNblur', propName, event.target.value);
  };

  const handleBlur = event => {
    thePConn.getValidationApi().validate(event.target.value);
  };

  return (

    <Fieldset>
      <Fieldset.Legend>
        {label}
      </Fieldset.Legend>
      <RadioGroup
        value={theSelectedButton}
        onChange={handleChange}
        onBlur={!readOnly ? handleBlur : undefined}
      >
        {theOptions.map(theOption => {
          return(
            <Radio value={theOption.key} key={theOption.key} inline={theOptions.length === 2} name={propName}>
              {theOption.value}
            </Radio>
          )
        })}
      </RadioGroup>
    </Fieldset>


    /*<FormControl error={status === 'error'} required={required}>
      <FormLabel component='legend'>{label}</FormLabel>
      <RadioGroup
        value={theSelectedButton}
        onChange={handleChange}
        onBlur={!readOnly ? handleBlur : undefined}
        row={inline}
      >
        {theOptions.map(theOption => {
          return (
            <FormControlLabel
              value={theOption.key}
              key={theOption.key}
              label={theOption.value}
              control={<RadioMUI key={theOption.key} color='primary' disabled={readOnly} />}
            />
          );
        })}
      </RadioGroup>
      <FormHelperText>{helperTextToDisplay}</FormHelperText>
    </FormControl>*/

  );
}
