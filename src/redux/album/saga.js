import { all, takeEvery, put, fork, select } from "redux-saga/effects";
import { message } from 'antd';

import { CREATE_ALBUM } from "../../helpers/actions";

import { getToken } from '../expert/selector';

import { CreateAlbums } from '../../services/expert';

export function* createAlbum() {
    yield takeEvery(CREATE_ALBUM, function* ({ data }) {
        try {
            const token = yield select(getToken)
            const res = yield CreateAlbums(token, data);
            if (res.status === 200 || res.status === 201) {
                const { data } = res.data;
                yield put({
                    type: SUCCESS_SAVE_EXPERT,
                    user: data.user,
                    caption: data.caption,
                    date: data.date,
                    location: data.location,
                    images: data.images,
                    country: data.country,
                });
                yield put({ type: OPEN_SUCCESS_MODAL });
            } else {
                throw res;
            }
        } catch (err) {
            message.error(err.response.data.message);
            yield put({ type: ERROR_SAVE_EXPERT });
        }
    });
}

export default function* AuthSaga() {
    yield all([
        fork(createAlbum),
    ]);
}