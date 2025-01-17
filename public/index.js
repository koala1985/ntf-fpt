async function run() {
  // A service worker must be registered in order to send notifications on iOS
  const registration = await navigator.serviceWorker.register(
    "serviceworker.js",
    {
      scope: "./",
    }
  );

  let subscription;
  let isRegistered = false;
  const subButton = document.getElementById("sub");

  const areNotificationsGranted = window.Notification.permission === "granted";

  if (areNotificationsGranted && isRegistered === true) {
    subButton.innerText = "Unsubscribe";
    button.addEventListener("click", async () => {
      subscription = await registration.pushManager.getSubscription();
      await subscription?.unsubscribe().catch();
      isRegistered = false;
      window.location.reload();
    });
  } else {
    subButton.addEventListener("click", async () => {
      const result = await window.Notification.requestPermission();
      if (result === "granted") {
        subscription = await registration.pushManager.subscribe({
        applicationServerKey:
          "BJdXFq_8qyyVWslyYOHCuUcwtzOoeHb5_VDljfAI7rRzJVAI8fJGEOBaKbkiDD8Vb9UktMR5NjjvOGaQEtIT_5A",
        userVisibleOnly: true,
      });
      
      await fetch("/save-subscriptiona", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscription),
      });
      isRegistered = true;
      window.location.reload();
      }
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
