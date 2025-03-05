export const userData: Record<
  string,
  {
    email: string;
    password: string;
  }
> = {
  validUser: {
    email: 'standard_user',
    password: 'secret_sauce',
  },
  lockedUser: {
    email: 'locked_out_user',
    password: 'secret_sauce',
  },
  problemUser: {
    email: 'problem_user',
    password: 'secret_sauce',
  },
};
