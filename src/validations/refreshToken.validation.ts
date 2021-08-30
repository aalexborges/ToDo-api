import * as Yup from 'yup'

const refreshTokenValidation = async (id?: string) => {
  const schema = Yup.object().shape({
    id: Yup.string().required().uuid().trim(),
  })

  await schema.validate({ id }, { abortEarly: false })
}

export default refreshTokenValidation
