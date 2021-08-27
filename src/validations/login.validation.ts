import * as Yup from 'yup'

interface VLoginData {
  email?: string
  password?: string
}

const loginValidation = async (data: VLoginData) => {
  const schema = Yup.object().shape({
    email: Yup.string().required().email().trim(),
    password: Yup.string().required().min(8).max(16).trim(),
  })

  await schema.validate(data, { abortEarly: false })
}

export default loginValidation
