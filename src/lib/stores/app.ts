// import { get, writable } from 'svelte/store';
// import { AnimationState } from '../enums';
// import type { HistoryItem, View } from '../models';
// import { createUniqueId } from '../utils/createUniqueId';

// type AppConfig = {
//   views: View[];
//   history: HistoryItem[];
// };

// const defaultConfig: AppConfig = {
//   views: [],
//   history: [],
// };

// function createApp() {
//   const app = writable<AppConfig>(defaultConfig);

//   function init(views: View[], initialViewId: string, state: any) {
//     console.log('init', state);

//     const view = views.find((a) => a.typeId === initialViewId);
//     app.set({
//       views,
//       history: [
//         {
//           id: createUniqueId(),
//           viewTypeId: view.typeId,
//           viewTypeName: view.title,
//           ...state,
//         },
//       ],
//     });
//   }
//   function reset() {
//     app.set(defaultConfig);
//   }

//   // History
//   async function push(viewId: string, state: any) {
//     const view = get(app).views.find((a) => a.typeId === viewId);
//     if (!view) return;

//     const data: HistoryItem = {
//       id: createUniqueId(),
//       viewTypeId: view.typeId,
//       viewTypeName: view.title,
//       ...state,
//     };

//     const history = get(app).history;
//     history.push(data);

//     window.history.pushState(data, '', `#/${data.id}`);
//   }

//   async function replace(viewId: string, state: any) {
//     const view = get(app).views.find((a) => a.typeId === viewId);
//     if (!view) return;

//     const data: HistoryItem = {
//       id: createUniqueId(),
//       viewTypeId: view.typeId,
//       viewTypeName: view.title,
//       ...state,
//     };

//     const history = get(app).history;
//     history.push(data);

//     window.history.replaceState(data, '', `#/${data.id}`);
//   }

//   async function back() {
//     // TODO: When going back, set the active history item to the previous one so the newly rendered view gets the correct historyId
//     if (navigating()) return;

//     const history = get(app).history;
//     if (history.length < 2) return;

//     window.history.back();

//     const leaving = history.length - 1;
//     const entering = leaving - 1;
//   }

//   function getViewById(id: string): View | null {
//     const view = get(app).views.find((a) => a.typeId === id);
//     return view || null;
//   }

//   function getActiveHistoryItem() {
//     // console.log('history', get(app).history);
//     console.log('isActive', get(app).history.find((a) => a.isActive).view.id);
//     return get(app).history.find((a) => a.isActive);
//     // return get(app).history.at(-1);
//   }

//   function navigating(): boolean {
//     return get(app).history.filter((a) => a.animState > AnimationState.Destroyed).length > 1;
//   }

//   return {
//     subscribe: app.subscribe,
//     init,
//     reset,
//     getViewById,
//     getActiveHistoryItem,
//     history: {
//       push,
//       back,
//     },
//   };
// }

// export const app = createApp();
