const { WebClient } = require('@slack/web-api');
const { startApp } = require('./app');

const web = new WebClient(process.env.SLACK_BOT_TOKEN);

/**
 * Sends a basic text message to a specified Slack channel.
 */
async function postMessageToSlack() {
  try {
    const result = await web.chat.postMessage({
      channel: '#all-dev',
      text: 'Hello from Node.js! The connection is successful. :wave: xxx',
      blocks: [{ "type": "section", "text": { "type": "plain_text", "text": "Hello world" } }]
    });
    console.log('Result:', result); // ts is the timestamp of the message
  } catch (error) {
    console.error(`Failed to post message: ${error.message}`);
    // Check if the error is due to insufficient permissions or invalid token/channel
    if (error.code === 'slack_web_api_call_error' && error.data.error === 'not_in_channel') {
      console.error("HINT: The bot is not in the specified channel. Make sure to invite the bot using '/invite @BotName' in Slack.");
    }
  }


}

// Execute the function
// postMessageToSlack();

const x = async () => {

  const result = await web.views.open({
    trigger_id: trigger,
    view: {
      type: 'modal',
      callback_id: 'view_identifier',
      title: {
        type: 'plain_text',
        text: 'Modal title'
      },
      submit: {
        type: 'plain_text',
        text: 'Submit'
      },
      blocks: [
        {
          type: 'input',
          label: {
            type: 'plain_text',
            text: 'Input label'
          },
          element: {
            type: 'plain_text_input',
            action_id: 'value_indentifier'
          }
        }
      ]
    }
  });

}

startApp()
