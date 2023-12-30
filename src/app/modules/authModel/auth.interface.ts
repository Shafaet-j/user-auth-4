export type TLoginUser = {
  username: string;
  password: string;
};

export interface TChangePassword {
  currentPassword: string;
  newPassword: string;
}
