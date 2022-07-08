import * as yup from 'yup';

const URL_REG_EXP =
  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

const urlValidationSchema = () =>
  yup.object({
    url: yup
      .string()
      .required('Required Field')
      .matches(URL_REG_EXP, 'Enter a valid URL'),
  });

export { urlValidationSchema };
