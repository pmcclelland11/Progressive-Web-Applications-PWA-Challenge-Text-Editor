const butInstall = document.getElementById('buttonInstall');

// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the default behavior to avoid the automatic prompt
    event.preventDefault();
    // Store the event for later use
    window.deferredPrompt = event;
    // Update the UI to notify the user that the app can be installed
    butInstall.removeAttribute('hidden');
  });
  
  // Implement a click event handler on the `butInstall` element
  butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt is not available
      return;
    }
    // Show the installation prompt
    promptEvent.prompt();
    // Wait for the user to respond to the prompt
    const userChoice = await promptEvent.userChoice;
    if (userChoice.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt');
    } else {
      console.log('User dismissed the A2HS prompt');
    }
    // Clear the deferred prompt
    window.deferredPrompt = null;
    // Hide the install button
    butInstall.setAttribute('hidden', true);
  });
  
  // Add a handler for the `appinstalled` event
  window.addEventListener('appinstalled', (event) => {
    console.log('App installed:', event);
  });
  