/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextField,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Report } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function ReportUpdateForm(props) {
  const {
    id: idProp,
    report: reportModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    documentNumber: "",
    pipefyId: "",
    type: "",
    status: "",
  };
  const [documentNumber, setDocumentNumber] = React.useState(
    initialValues.documentNumber
  );
  const [pipefyId, setPipefyId] = React.useState(initialValues.pipefyId);
  const [type, setType] = React.useState(initialValues.type);
  const [status, setStatus] = React.useState(initialValues.status);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = reportRecord
      ? { ...initialValues, ...reportRecord }
      : initialValues;
    setDocumentNumber(cleanValues.documentNumber);
    setPipefyId(cleanValues.pipefyId);
    setType(cleanValues.type);
    setStatus(cleanValues.status);
    setErrors({});
  };
  const [reportRecord, setReportRecord] = React.useState(reportModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Report, idProp)
        : reportModelProp;
      setReportRecord(record);
    };
    queryData();
  }, [idProp, reportModelProp]);
  React.useEffect(resetStateValues, [reportRecord]);
  const validations = {
    documentNumber: [],
    pipefyId: [],
    type: [],
    status: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          documentNumber,
          pipefyId,
          type,
          status,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(
            Report.copyOf(reportRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "ReportUpdateForm")}
      {...rest}
    >
      <TextField
        label="Document number"
        isRequired={false}
        isReadOnly={false}
        value={documentNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              documentNumber: value,
              pipefyId,
              type,
              status,
            };
            const result = onChange(modelFields);
            value = result?.documentNumber ?? value;
          }
          if (errors.documentNumber?.hasError) {
            runValidationTasks("documentNumber", value);
          }
          setDocumentNumber(value);
        }}
        onBlur={() => runValidationTasks("documentNumber", documentNumber)}
        errorMessage={errors.documentNumber?.errorMessage}
        hasError={errors.documentNumber?.hasError}
        {...getOverrideProps(overrides, "documentNumber")}
      ></TextField>
      <TextField
        label="Pipefy id"
        isRequired={false}
        isReadOnly={false}
        value={pipefyId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              documentNumber,
              pipefyId: value,
              type,
              status,
            };
            const result = onChange(modelFields);
            value = result?.pipefyId ?? value;
          }
          if (errors.pipefyId?.hasError) {
            runValidationTasks("pipefyId", value);
          }
          setPipefyId(value);
        }}
        onBlur={() => runValidationTasks("pipefyId", pipefyId)}
        errorMessage={errors.pipefyId?.errorMessage}
        hasError={errors.pipefyId?.hasError}
        {...getOverrideProps(overrides, "pipefyId")}
      ></TextField>
      <SelectField
        label="Type"
        placeholder="Please select an option"
        isDisabled={false}
        value={type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              documentNumber,
              pipefyId,
              type: value,
              status,
            };
            const result = onChange(modelFields);
            value = result?.type ?? value;
          }
          if (errors.type?.hasError) {
            runValidationTasks("type", value);
          }
          setType(value);
        }}
        onBlur={() => runValidationTasks("type", type)}
        errorMessage={errors.type?.errorMessage}
        hasError={errors.type?.hasError}
        {...getOverrideProps(overrides, "type")}
      >
        <option
          children="Pf"
          value="PF"
          {...getOverrideProps(overrides, "typeoption0")}
        ></option>
        <option
          children="Pj"
          value="PJ"
          {...getOverrideProps(overrides, "typeoption1")}
        ></option>
      </SelectField>
      <SelectField
        label="Status"
        placeholder="Please select an option"
        isDisabled={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              documentNumber,
              pipefyId,
              type,
              status: value,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
      >
        <option
          children="Processing"
          value="PROCESSING"
          {...getOverrideProps(overrides, "statusoption0")}
        ></option>
        <option
          children="Success"
          value="SUCCESS"
          {...getOverrideProps(overrides, "statusoption1")}
        ></option>
        <option
          children="Error serasa"
          value="ERROR_SERASA"
          {...getOverrideProps(overrides, "statusoption2")}
        ></option>
        <option
          children="Error pipefy"
          value="ERROR_PIPEFY"
          {...getOverrideProps(overrides, "statusoption3")}
        ></option>
      </SelectField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || reportModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || reportModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
