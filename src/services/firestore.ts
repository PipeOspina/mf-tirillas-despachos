import firebase from 'firebase';
import { firestore } from './config';
import type { IStrip } from '../interfaces/Strip';

const stripConverter = {
    toFirestore: (strip: IStrip) => strip,
    fromFirestore: (
        snapshot: firebase.firestore.QueryDocumentSnapshot<IStrip<firebase.firestore.Timestamp>>,
        options: firebase.firestore.SnapshotOptions,
    ): IStrip => {
        const data = snapshot.data(options);
        return {
            ...data,
            fechaRegistro: data.fechaRegistro?.toDate() || undefined,
            tiquete: data
                .tiquete
                .replace(/~/gi, '\n')
                .replace(/-\/-/gi, ':'),
        };
    },
};

export const stripService = firestore.collection('relacion_tiquete').withConverter(stripConverter);

export default {
    stripService,
};
