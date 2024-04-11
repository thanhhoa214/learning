const enum Actions {
  LOGOUT = '[Auth] Logout',
}

export class Logout {
  static readonly type = Actions.LOGOUT;
}
