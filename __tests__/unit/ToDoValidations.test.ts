import { ValidationError } from 'yup'

import { ToDoValidations } from '../../src/validations/ToDo/ToDoValidations'

describe('Test the create validation', () => {
  it('should return a void if the data is valid.', async () => {
    await expect(
      new ToDoValidations({ task: 'Test' }).create()
    ).resolves.toBeUndefined()
  })

  it('should return an error if the data is invalid.', async () => {
    await expect(
      new ToDoValidations({ task: '' }).create()
    ).rejects.toBeInstanceOf(ValidationError)
  })
})

describe('Test the delete validation', () => {
  it('should return a void if the data is valid.', async () => {
    await expect(
      new ToDoValidations({
        id: '6eb6c62f-1533-40be-a217-44d560a8bc25',
      }).delete()
    ).resolves.toBeUndefined()
  })

  it('should return an error if the data is invalid.', async () => {
    await expect(
      new ToDoValidations({ id: 'id' }).delete()
    ).rejects.toBeInstanceOf(ValidationError)
  })
})

describe('Test the update validation', () => {
  it('should return a void if the data is valid.', async () => {
    await expect(
      new ToDoValidations({
        id: '6eb6c62f-1533-40be-a217-44d560a8bc25',
      }).update()
    ).resolves.toBeUndefined()
  })

  it('should return an error if the data is invalid.', async () => {
    await expect(
      new ToDoValidations({ id: 'id' }).update()
    ).rejects.toBeInstanceOf(ValidationError)
  })
})
