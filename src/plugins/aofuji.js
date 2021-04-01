import useAofuji from 'aofuji-tracker';

const id = import.meta.env.VITE_AO_ID;
const api = import.meta.env.VITE_AO_API;

let aoView, aoLeave;
if (id && api && import.meta.env.PROD) {
  const d = useAofuji(id, api);
  aoView = d.aoView;
  aoLeave = d.aoLeave;
} else {
  aoView = () => {};
  aoLeave = () => {};
}

export { aoView, aoLeave };
