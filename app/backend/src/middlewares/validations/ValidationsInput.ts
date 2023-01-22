import { LoginType } from '../../interfaces/ILoginService';
import { loginSchema, tokenSchema } from './schemas';

type ValidationReturn = {
  isError: boolean,
  message: string
};

type ValidationTokenReturn = {
  isError: boolean,
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

  static validateToken(token: string): ValidationTokenReturn {
    const { error } = tokenSchema.validate(token);

    if (error) {
      return { isError: true };
    }

    return { isError: false };
  }
}
