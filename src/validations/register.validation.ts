import * as Yup from 'yup'

interface VRegisterData {
  name?: string
  email?: string
  password?: string
}

const registerValidation = async (data: VRegisterData) => {
  const schema = Yup.object().shape({
    name: Yup.string().required().min(2).trim(),
    email: Yup.string().required().email().trim(),
    password: Yup.string().required().min(8).max(16).trim(),
  })

  await schema.validate(data, { abortEarly: false })
}

export default registerValidation
