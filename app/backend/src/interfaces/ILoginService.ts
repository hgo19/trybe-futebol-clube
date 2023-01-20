type loginReturn = {
  token: string,
};

export default interface ILoginService<T> {
  getByEmail(token: string): Promise<T>;
  validateLogin(): loginReturn;
}
