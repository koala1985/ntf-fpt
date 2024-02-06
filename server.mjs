import express from "express";
import webpush from "web-push";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

let subscriptionData = null;

webpush.setVapidDetails(
  `mailto:feixia85@hotmail.com`,
  'BJdXFq_8qyyVWslyYOHCuUcwtzOoeHb5_VDljfAI7rRzJVAI8fJGEOBaKbkiDD8Vb9UktMR5NjjvOGaQEtIT_5A',
  'Lv8HfI28Ii3SI6fX7OLXt_2dPOevQ8OipAJ4kh-w5h8'
)

app.get('/send-notification', async (req, res) => {
  try {
    await webpush.sendNotification(subscriptionData, JSON.stringify({
      title: "Hello World",
      body: "Notification sent from backend"
    }));
    res.sendStatus(200);
  } catch(err) {
    console.error(err);
    res.sendStatus(500);
  }
})

app.get('/send-notificationa', async (req, res) => {

  await fetch('https://webapi20240104151128.azurewebsites.net/FSubscription?alias=a')
  .then(response => response.json())
  .then(data => {
    
    data.forEach(element => {
      try {
        
        let pushSubscription = JSON.parse(element.subscription)
        //pushSubscription = element.subscription;
         webpush.sendNotification(pushSubscription, JSON.stringify({
          title: "Hello World",
          body: "Notification sent from backend"
        }));
        res.sendStatus(200);
  
      } catch(err) {
        console.error(err);
        res.sendStatus(500);
      }

    });
  
  }).catch(error => console.error(error));

})

app.get('/send-notificationc', async (req, res) => {

  await fetch('https://webapi20240104151128.azurewebsites.net/FSubscription?alias=c')
  .then(response => response.json())
  .then(data => {
    
    data.forEach(element => {
      try {
        
        let pushSubscription = JSON.parse(element.subscription)
        //pushSubscription = element.subscription;
         webpush.sendNotification(pushSubscription, JSON.stringify({
          title: "Hello World",
          body: "Notification sent from backend"
        }));
        res.sendStatus(200);
  
      } catch(err) {
        console.error(err);
        res.sendStatus(500);
      }

    });
  
  }).catch(error => console.error(error));

})


app.post("/save-subscription", async (req, res) => {
  subscriptionData = req.body;

  res.sendStatus(200);
});

app.post("/save-subscriptiona", async (req, res) => {
  subscriptionData = req.body;

  const urlEncoded = encodeURIComponent(JSON.stringify(subscriptionData));
  const requestOptions = {
    method: 'POST'
  };
  await fetch(('https://webapi20240104151128.azurewebsites.net/FSubscription?alias='+'a'+'&subscription='+ urlEncoded), requestOptions)
  .then(response => 
    response.json()).catch(error => console.error(error));
  res.sendStatus(200);
});


app.post("/save-subscriptionc", async (req, res) => {
  subscriptionData = req.body;

  const urlEncoded = encodeURIComponent(JSON.stringify(subscriptionData));

const requestOptions = {
  method: 'POST'
};
await fetch(('https://webapi20240104151128.azurewebsites.net/FSubscription?alias='+'c'+'&subscription='+ urlEncoded), requestOptions)
  .then(response => 
    response.json()).catch(error => console.error(error));


  res.sendStatus(200);
});

app.use(express.static("./public"));

app.listen(process.env.PORT || 8000);
