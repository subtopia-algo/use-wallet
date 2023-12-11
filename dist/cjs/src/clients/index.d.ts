import pera from './pera';
import daffi from './daffi';
import myalgo from './myalgo';
import defly from './defly';
import exodus from './exodus';
import algosigner from './algosigner';
import walletconnect from './walletconnect2';
import magic from './magic';
import kmd from './kmd';
import mnemonic from './mnemonic';
import { CustomProvider } from './custom/types';
import custom from './custom';
export { pera, myalgo, defly, exodus, algosigner, walletconnect, kmd, mnemonic, custom, magic, CustomProvider };
declare const _default: {
    [x: string]: typeof pera | typeof myalgo | typeof defly | typeof exodus | typeof algosigner | typeof walletconnect | typeof kmd | typeof mnemonic | typeof custom | typeof magic | typeof daffi;
};
export default _default;
