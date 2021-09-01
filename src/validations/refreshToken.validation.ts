import * as Yup from 'yup'

const refreshTokenValidation = async (refreshToken?: string) => {
  const schema = Yup.object().shape({
    refreshToken: Yup.string().required().uuid().trim(),
  })

  await schema.validate({ refreshToken }, { abortEarly: false })
}

export default refreshTokenValidation
