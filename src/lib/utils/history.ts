export class History {
  push(viewTypeId: string, state: any) {
    window.history.pushState(state, '', `#/${viewTypeId}`);
  }

  back() {
    window.history.back();
  }
}
