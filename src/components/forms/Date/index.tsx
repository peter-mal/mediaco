import React, {useState, useEffect} from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import TextInput from '../TextInput';
import handleEvent from '../../../helpers/event-utils';
import FieldValueList from '../../designSystemExtensions/FieldValueList';
import { DateField } from 'govuk-react';


declare const PCore;

export default function Date(props) {
  const {getPConnect, label, required, disabled, value, validatemessage, status, onChange, onBlur, readOnly} = props;

  // PM - Set up state for each input field, either the value we received from pega, or emtpy
	const [day, setDay] = useState(value ? value.split("-")[2] : '');
	const [month, setMonth] = useState(value ? value.split("-")[1] : '');
	const [year, setYear] = useState(value ? value.split("-")[0] : '');


  // PM - Create ISODate string (as expected by onChange) and pass to onchange value, adding 0 padding here for day and month to comply with isostring format.
  const handleDateChange = () => {
    let isoDate;
    if(year || month || day){
      isoDate = `${year}-${month.toString().length === 1 ? `0${month}` : month}-${day.toString().length === 1 ? `0${day}` : day}`;
    } else {
      isoDate = '';
    }
    onChange({value: isoDate});
  }

  // PM - On change of any of the date fields, call handleDateChange
  useEffect( () => {
    var utils = PCore.getFormUtils()
    try{
      console.log(`fields: ${JSON.stringify(utils/*.getEditableFields("root/primary_1/workarea_1")*/)}`);
    } catch(e){
      console.log(e);
    }
    handleDateChange();
  }, [day, month, year])

  if (readOnly) {
    // PM setting format of date for read only field
    const readOnlyDate = value ? new global.Date(value).toLocaleDateString() : value;
    const readOnlyProps = {...props, value: readOnlyDate}
    // const theReadOnlyComp = <TextInput props />
    return ( <TextInput {...readOnlyProps} /> );
  }

  // // eslint-disable-next-line
  // const handleChange = date => {
  //   // eslint-disable-next-line
  //   const value = date && date.isValid() ? date.toISOString() : null;
  //   onChange({value});
  // }

  // PM - Handlers for each part of date inputs, update state for each respectively
  //      0 pad for ISOString compatibilitiy, with conditions to allow us to clear the fields
  const handleChangeDay = dayChange => {
    setDay(dayChange.target.value);
  };
  const handleChangeMonth = monthChange => {
    setMonth(monthChange.target.value);
  };
  const handleChangeYear = yearChange => {
    setYear(yearChange.target.value);
  };

  return (
    <DateField
      input={{
        onBlur,
        onChange
      }}
      inputNames={{
        day: "Day",
        month: "Month",
        year: "Year"
      }}
      inputs={{
        day: {
          //autoComplete: 'bday-day',
          onChange: handleChangeDay,
          value: day
        },
        month: {
          //autoComplete: 'bday-month',
          onChange: handleChangeMonth,
          value: month
        },
        year: {
          //autoComplete: 'bday-year',
          onChange: handleChangeYear,
          value: year
        }
      }}
    >
      {label}
    </DateField>



    /*
    <KeyboardDatePicker
      disableToolbar
      variant='inline'
      inputVariant='outlined'
      placeholder='mm/dd/yyyy'
      fullWidth
      autoOk
      required={required}
      disabled={disabled}
      format='MM/DD/YYYY'
      mask='__/__/____'
      error={status === 'error'}
      helperText={helperTextToDisplay}
      size='small'
      label={label}
      value={value || null}
      onChange={handleChange}
      onBlur={!readOnly ? onBlur : undefined}
      onAccept={handleAccept}
      InputProps={{ ...testProp }}
    />*/
  );
}
