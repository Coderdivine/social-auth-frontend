import React, { useState, useEffect } from 'react';

function TelegramLogin() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    window.handleTelegramAuth = async function(user) {
      console.log('Telegram user data:', user);
      setMessage('Verifying Telegram login...');

      try {
        const url = "http://localhost:5000/api/telegram-auth" || "https://farming-social-backend.ue.r.appspot.com/api/telegram-auth";
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
        const data = await response.json();
        console.log({ ChannelData: data });
        
        if (data.error) {
          setMessage('Authentication failed: ' + data.error);
        } else if (data.joined) {
          console.log({ joined: data.userData });
          const userData = data?.userData
          console.log({ username: userData?.username, id: userData?.id });
          setMessage(`Success! You are a member of our Telegram channel as ${userData?.username} (${userData?.id}).`);
        } else {
          setMessage('It looks like you have not joined our Telegram channel.');
        }
      } catch (error) {
        setMessage('Error verif ying your Telegram login.');
      }
    };

    const script = document.createElement('script');
    script.src = "https://telegram.org/js/telegram-widget.js?7";
    script.setAttribute('data-telegram-login', 'test202655bot');
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-userpic', 'false');
    script.setAttribute('data-request-access', 'write');
    script.setAttribute('data-onauth', 'handleTelegramAuth(user)');
    script.async = true;
    document.getElementById('telegram-login-container').appendChild(script);
  }, []);

  return (
    <div className="telegram-card">
    <h1 className="telegram-title">Join Our Telegram Channel</h1>
    <p className="telegram-description">
      To get rewarded, please follow our Telegram channel and verify your membership using Telegram login.
    </p>
    <div id="telegram-login-container"></div>
    {message && <p className="telegram-message">{message}</p>}
  </div>
  );
}

export default TelegramLogin;
