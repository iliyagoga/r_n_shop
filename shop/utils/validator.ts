const validator = (
  name: string,
  family: string,
  login: string,
  pass: string,
  repass: string,
  file?: File | null
) => {
  let errors = {};
  if (!name || name.length == 0) {
    errors['name'] = 'Заполните поле';
  }
  if (!family || family.length == 0) {
    errors['family'] = 'Заполните поле';
  }
  if (!login || login.length == 0) {
    errors['login'] = 'Заполните поле';
  }
  if (!pass || pass.length == 0) {
    errors['pass'] = 'Заполните поле';
  }
  if (!repass || repass.length == 0) {
    errors['repass'] = 'Заполните поле';
  }
  if (repass != pass) {
    errors['pass'] = 'Пароли должны совпадать';
    errors['repass'] = 'Пароли должны совпадать';
  }
  return errors;
};

const validatorLogin = (login: string, pass: string) => {
  let errors = {};
  if (!login || login.length == 0) {
    errors['login'] = 'Заполните поле';
  }
  if (!pass || pass.length == 0) {
    errors['pass'] = 'Заполните поле';
  }

  return errors;
};
export { validator, validatorLogin };
