function callServer() {
    fetch('https://glamour-groove-server.onrender.com')
        .then(response => {
            console.log('Server called successfully');
        })
        .catch(error => {
            console.error('Error calling server:', error);
        });
}

callServer();

setInterval(callServer, 10 * 60 * 1000); 
