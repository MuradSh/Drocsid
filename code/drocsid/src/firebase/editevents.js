const admin = require('firebase-admin');

// You must initialize the Admin SDK with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert('drocsid-f50c2-firebase-adminsdk-9xmw5-13ba6b0b41.json'),
  databaseURL: 'https://drocsid-f50c2-default-rtdb.firebaseio.com'
});

const db = admin.firestore();

const eventDetails = {
    'Comedy Show': {
      date: '2024-03-15',
      time: '7:00 PM',
      venue: 'Comedy Club',
      pricing: 'Starting at $15',
      availability: '250 tickets'
    },
    'Summer Music Festival': {
      date: '2024-06-20',
      time: '12:00 PM',
      venue: 'Central Park',
      pricing: 'Free, VIP passes at $100',
      availability: '5000 tickets'
    },
    'TED Talk': {
      date: '2024-11-05',
      time: '6:00 PM',
      venue: 'Convention Center',
      pricing: 'Starting at $100',
      availability: '300 tickets'
    },
    'Rock on the Range': {
      date: '2024-08-12',
      time: '5:00 PM',
      venue: 'Outdoor Arena',
      pricing: 'Starting at $50',
      availability: '1500 tickets'
    },
    'Hamilton': {
      date: '2024-09-25',
      time: '8:00 PM',
      venue: 'Broadway Theater',
      pricing: 'Starting at $120',
      availability: '200 tickets'
    },
    'World Cup 2024 Qualifiers': {
      date: '2024-07-10',
      time: '3:00 PM',
      venue: 'National Stadium',
      pricing: 'Starting at $60',
      availability: '10000 tickets'
    },
    'The Phantom of the Opera': {
      date: '2024-10-31',
      time: '8:00 PM',
      venue: 'Royal Opera House',
      pricing: 'Starting at $85',
      availability: '500 tickets'
    },
    'NBA Finals 2024': {
      date: '2024-05-30',
      time: '9:00 PM',
      venue: 'Sports Arena',
      pricing: 'Starting at $200',
      availability: '2000 tickets'
    }
  };
  
  async function addDetailsToEvents() {
    const eventsRef = db.collection('events');
  
    const promises = [];
    for (const [name, details] of Object.entries(eventDetails)) {
      const querySnapshot = await eventsRef.where('name', '==', name).get();
      querySnapshot.forEach((doc) => {
        const promise = doc.ref.update(details);
        promises.push(promise);
      });
    }
  
    await Promise.all(promises);
    console.log('All events have been updated with additional details.');
  }
  
  addDetailsToEvents().catch(console.error);