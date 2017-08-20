import mySaga from './sagas';

export default function* rootSaga() {
  yield [mySaga()];
}
