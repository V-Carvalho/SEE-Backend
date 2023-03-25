require('dotenv').config()
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");

const firebaseConfig = { 
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const saveEvent = async (request, response) => {
  const bodyData = request.body;
  console.log(bodyData)

  // TODO: Fazer um loop para validar o tipo/nome do evento => tableContactId

  try {
    const eventRef = await addDoc(collection(db, 'events'), {
      attendedEvent: bodyData.attendedEvent,
      zoneNumber: bodyData.zoneNumber,
      accountNumber: bodyData.accountNumber,
      eventCode: bodyData.eventCode,
      partitionNumber: bodyData.partitionNumber,
      dateEvent: bodyData.dateEvent,
      eventTime: bodyData.eventTime,      
    });
    response.status(200).send({
      eventRef: eventRef.id,
    }); 
  } catch (error) {
    response.status(400).send({
      error: error,
    }); 
  }  
};


module.exports = { saveEvent };
