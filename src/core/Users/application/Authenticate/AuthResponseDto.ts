import User from "@core/Users/domain/User";

export type AuthResponseDto = {
	token: string;
	user: Partial<User>;
}
