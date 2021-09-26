import * as yup from 'yup';

export default yup.object().shape({
    username: yup
    .string()
    .required("Username is required")
    .min(6,"Minimum length  is 6"),
    password: yup
    .string()
    .required("Password is required")
    .min(6,"Minimum length is 6"),
    role: yup
    .string()
    .required("Role is required")
}) 