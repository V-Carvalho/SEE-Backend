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

const contactIdTable =[
  {
    eventCode: "E100",
    eventDescription: "Emergência Médica"
  },

  {
    eventCode: "E130",
    eventDescription: "Disparo de Intrusão",
  },
  {
    eventCode: "E120",
    eventDescription: "Disparo Botão de Pânico",
  },
  {
    eventCode: "E121", 
    eventDescription: "Coação",
  },
  {
    eventCode: "E350", 
    eventDescription: "Falha de Comunicação",
  },
  {
    eventCode: "E302", 
    eventDescription: "Falha de Bateria",
  },
  {
    eventCode: "R302",
    eventDescription: "REstauro da Bateria",
  },
  {
    eventCode: "E301", 
    eventDescription: "Corte de Energia",
  },
  {
    eventCode: "R301", 
    eventDescription: "Restauro da Energia",
  },
  {
    eventCode: "E401",   
    eventDescription: "Sistema Desativado",
    },
  {
    eventCode: "R401", 
    eventDescription: "Sistema Ativado",
  },
  {
    eventCode: "E602", 
    eventDescription: "Teste Periódico Recebido",
  },
  {
    eventCode: "E570", 
    eventDescription: "Zona Anulada",
  },
  {
    eventCode: "EAA0",
    eventDescription: "Servidor Viaweb Iniciado",
  },
  {
    eventCode: "EAA1", 
    eventDescription: "Servidor Viaweb Parado",
  },
  {
    eventCode: "EAA6", 
    eventDescription: "GPRS Off-Line",
  },
  {
    eventCode: "RAA6",
    eventDescription: "Restauro do GPRS",  
  }
];

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const saveEvent = async (request, response) => {
  const bodyData = request.body;

  let eventDescription = "Evento não definido";

  contactIdTable.forEach((contactId) => {
    if(contactId.eventCode == bodyData.eventCode) {
      eventDescription = contactId.eventDescription;
      console.log(eventDescription)
    }
  });

  try {
    const eventRef = await addDoc(collection(db, "events"), {
      attendedEvent: bodyData.attendedEvent,
      zoneNumber: bodyData.zoneNumber,
      accountNumber: bodyData.accountNumber,
      eventCode: bodyData.eventCode,
      partitionNumber: bodyData.partitionNumber,
      dateEvent: bodyData.dateEvent,
      eventTime: bodyData.eventTime,
      eventDescription: eventDescription,     
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
