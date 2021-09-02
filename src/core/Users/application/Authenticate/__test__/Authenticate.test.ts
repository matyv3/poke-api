
import { mock } from 'jest-mock-extended'
import User from '../../../domain/User'
import IUserRepository from '../../../domain/IUserRepository'
import { AuthenticateDto } from '../AuthenticateDto'
import Authenticate from '../Authenticate'

describe('Authentication tests', () => {

	const repository = mock<IUserRepository>()
	const userMock = mock<User>()
	userMock.comparePassword.mockReturnValue(Promise.resolve(true))
	repository.getByEmail.mockReturnValue(Promise.resolve(userMock))

	it('Should return jwt token', async () => {

		const dto: AuthenticateDto = {
			email: 'test@test.com',
			password: 'password'
		}

		const result = await new Authenticate(repository).run(dto)
		expect(typeof result.token).toBe('string')
		expect(result.user).toBeDefined()
		expect(result.user.id).toBeDefined()
		expect(result.user.email).toBeDefined()
	})
})

