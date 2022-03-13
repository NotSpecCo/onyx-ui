type StateObj = {
  focusedId?: string;
  [key: string]: string | number;
};

export class Route {
  static setState(obj: StateObj): void {
    history.replaceState(obj, '');
  }

  static updateState(obj: StateObj): void {
    history.replaceState(
      {
        ...history.state,
        ...obj,
      },
      ''
    );
  }

  static getState(): StateObj {
    return history.state || {};
  }
}
