self.addEventListener('push', function (event) {
    const data = event.data.json(); // Assuming your push data is in JSON format
  
    const options = {
      body: data.body,
      icon: 'icon.png', // Optional: add an icon
      badge: 'badge.png' // Optional: add a badge icon
    };
  
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  });
  