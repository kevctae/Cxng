Object.defineProperty(exports, "__esModule", { value: true });
import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";

admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
exports.scheduledFunction = functions.pubsub.schedule('0 0 * * *')
  .timeZone('Asia/Bangkok')
  .onRun((context) => {
  console.log('This will be run every day at 00:00 AM!');
  return null;
});