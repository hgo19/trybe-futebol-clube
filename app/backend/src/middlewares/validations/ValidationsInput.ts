import { LoginType } from '../../interfaces/ILoginService';
import { loginSchema } from './schemas';

type ValidationReturn = {
  isError: boolean,
  message: string
};

export default class ValidationsInputs {
  static validateLogin(login: LoginType): ValidationReturn {
    const { error } = loginSchema.validate(login);

    if (error) {
      const { message } = error;
      return { isError: true, message };
    }

    return { isError: false, message: 'Sem Erro.' };
  }
}
