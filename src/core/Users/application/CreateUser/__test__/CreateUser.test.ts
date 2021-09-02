
import { mock } from 'jest-mock-extended'
import User from '../../../domain/User'
import IUserRepository from '../../../domain/IUserRepository'
import { CreateUserDto } from '../CreateUserDto'
import CreateUser from '../CreateUser'

describe('Create user tests', () => {

	const dto: CreateUserDto = {
		email: 'test@test.com',
		name: 'test',
		password: '$eCr3et'
	}
	const repository = mock<IUserRepository>()

	it('Should create user account', async () => {
		repository.create.mockReturnValue(Promise.resolve(new User('test@test.com', 'test')))
		const result = await new CreateUser(repository).run(dto)
		expect(result).toBeInstanceOf(User)
	})
})
