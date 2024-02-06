async function run() {
  // A service worker must be registered in order to send notifications on iOS
  const registration = await navigator.serviceWorker.register(
    "serviceworker.js",
    {
      scope: "./",
    }
  );

  let subscription;
  const button = document.getElementById("subscribe");

  const usButton = document.getElementById("unsubscribe");
  const sendcButton = document.getElementById("sendc");
  sendcButton.innerText = "sendc";
  sendcButton.addEventListener("click", async () => {
    await fetch("/send-notificationc");
  });

  const sendaButton = document.getElementById("senda");
  sendaButton.innerText = "senda";
  sendaButton.addEventListener("click", async () => {
    await fetch("/send-notificationa");
  });

  const areNotificationsGranted = window.Notification.permission === "granted";

  if (areNotificationsGranted) {
    button.innerText = "Send Notification";
    button.addEventListener("click", async () => {
      await fetch("/send-notification");
    });

    usButton.innerText = "Unsubscribe";
    usButton.addEventListener("click", async () => {
      subscription = await registration.pushManager.getSubscription();
      await subscription.unsubscribe();
    });

  } else {
    usButton.innerText = "N/A";
    usButton.addEventListener("click", async () => {
    });
    
    button.addEventListener("click", async () => {
      // Triggers popup to request access to send notifications
      const result = await window.Notification.requestPermission();
      console.log("ask");

      // If the user rejects the permission result will be "denied"
      if (result === "granted") {
          subscription = await registration.pushManager.subscribe({
          // TODO: Replace with your public vapid key
          applicationServerKey:
            "BJdXFq_8qyyVWslyYOHCuUcwtzOoeHb5_VDljfAI7rRzJVAI8fJGEOBaKbkiDD8Vb9UktMR5NjjvOGaQEtIT_5A",
          userVisibleOnly: true,
        });
console.log("fetch");
        await fetch("/save-subscription", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(subscription),
        });

        window.location.reload();
      }
    });


  }


}

run();
