require('dotenv').config()
const { App } = require('@slack/bolt')
const axios = require('axios')

const apiClient = axios.create({
  baseURL: 'https://edu-poosarn.odoo.com/json/2',
  headers: {
    Authorization: `Bearer ${process.env.ODOO_API_KEY}`,
  },
})

const app = new App({
  socketMode: true,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
})

const startApp = async () => {
  await app.start(3000)
  app.logger.info('⚡️ Bolt app is running!')

  app.shortcut('my_shortcut', async (args) => {
    await args.ack()
    await args.client.views.open({
      trigger_id: args.shortcut.trigger_id,
      view: {
        type: 'modal',
        callback_id: 'feedback_form_submit',
        title: {
          type: 'plain_text',
          text: 'Submit Feedback',
        },
        submit: {
          type: 'plain_text',
          text: 'Submit',
        },
        close: {
          type: 'plain_text',
          text: 'Cancel',
        },
        blocks: [
          {
            type: 'input',
            block_id: 'title_block',
            element: {
              type: 'plain_text_input',
              action_id: 'title_input',
              placeholder: {
                type: 'plain_text',
                text: 'Enter a title',
              },
            },
            label: {
              type: 'plain_text',
              text: 'Title',
            },
          },
          {
            type: 'section',
            block_id: 'radio_block',
            text: {
              type: 'plain_text',
              text: 'Type',
            },
            accessory: {
              type: 'radio_buttons',
              "action_id": "this_is_an_action_id",
              initial_option: {
                value: 'person',
                text: {
                  type: 'plain_text',
                  text: 'Person',
                },
              },
              options: [
                {
                  value: 'person',
                  text: {
                    type: 'plain_text',
                    text: 'Person',
                  },
                },
                {
                  value: 'company',
                  text: {
                    type: 'plain_text',
                    text: 'Company',
                  },
                },
              ],
            },
          },
          {
            type: 'input',
            block_id: 'email_block',
            optional: true,
            element: {
              type: 'email_text_input',
              action_id: 'email_input',
              placeholder: {
                type: 'plain_text',
                text: 'Enter a email',
              },
            },
            label: {
              type: 'plain_text',
              text: 'Email',
            },
          },
          {
            type: 'input',
            block_id: 'description_block',
            optional: true,
            element: {
              type: 'plain_text_input',
              multiline: true,
              action_id: 'description_input',
              placeholder: {
                type: 'plain_text',
                text: 'Describe your feedback',
              },
            },
            label: {
              type: 'plain_text',
              text: 'Description',
            },
          },
        ],
      },
    })
  })

  app.action('this_is_an_action_id', async ({ ack, body, logger }) => {
    await ack()
  })

  app.view('feedback_form_submit', async ({ ack, body, view, client }) => {
    const CHANNEL = '#bot'
    await ack()
    const title = view.state.values.title_block.title_input.value
    const description = `${view.state.values.description_block.description_input.value}`
    const email = view.state.values.email_block.email_input.value
    const companyType = view.state.values.radio_block.this_is_an_action_id?.selected_option?.value
    try {
      await apiClient({
        method: 'POST',
        url: 'res.partner/create',
        data: {
          vals_list: [
            {
              name: title,
              email,
              comment: description,
              company_type: companyType
            },
          ],
        },
      })
      await client.chat.postMessage({
        channel: CHANNEL,
        text: `Form Submitted`,
      })
    } catch (err) {
      await client.chat.postMessage({
        channel: CHANNEL,
        text: `Failed to submit feedback: ${err.message}`,
      })
    }
  })

  app.command('/odoo-partner', async (args) => {
    try {
      await args.ack()
      const res = await apiClient({
        method: 'POST',
        url: 'res.partner/search_read',
        data: {
          context: {
            lang: 'en_US',
            tz: 'Asia/Bangkok',
          },
          domain: [],
        },
      })
      const columns = ['name', 'link', 'phone', 'create_date', 'update_date']
      await args.say({
        text: `Found ${res.data.length} leads from Odoo CRM.`,
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*Found ${res.data.length} leads from Odoo Contact.*`,
            },
          },
          {
            type: 'table',
            rows: [
              columns.map((col) => ({
                type: 'raw_text',
                text: col,
              })),
              ...res.data.map((lead) => [
                {
                  type: 'raw_text',
                  text: lead['display_name'] || 'x',
                },
                {
                  type: 'rich_text',
                  elements: [
                    {
                      type: 'rich_text_section',
                      elements: [
                        {
                          text: lead['website_absolute_url'],
                          type: 'link',
                          url: lead['website_absolute_url'],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'raw_text',
                  text: lead['phone'] || 'x',
                },
                {
                  type: 'raw_text',
                  text: lead['create_date'],
                },
                {
                  type: 'raw_text',
                  text: lead['write_date'],
                },
              ]),
            ],
          },
        ],
      })
    } catch (error) {
      console.error('Error handling /odoo-partner command:', error)
    }
  })

  app.command('/testy', async ({ ack, body, client, logger, say }) => {
    await ack()
    const res = await apiClient({
      method: 'POST',
      url: 'crm.lead/search_read',
      data: {
        context: {
          lang: 'en_US',
          tz: 'Asia/Bangkok',
        },
        domain: [],
      },
    })
    const columns = ['name', 'type', 'date', 'stage']
    await say({
      text: `Found ${res.data.length} leads from Odoo CRM.`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Found ${res.data.length} leads from Odoo CRM.*`,
          },
        },
        {
          type: 'table',
          rows: [
            columns.map((col) => ({
              type: 'raw_text',
              text: col,
            })),
            ...res.data.map((lead) => [
              {
                type: 'raw_text',
                text: lead['display_name'] || 'x',
              },
              {
                type: 'raw_text',
                text: lead['type'] || 'x',
              },
              {
                type: 'raw_text',
                text: lead['date_open'] || 'x',
              },
              {
                type: 'raw_text',
                text: lead['stage_id'][1] || 'x',
              },
            ]),
          ],
        },
      ],
    })

    // await client.views.open({
    //   trigger_id: trigger_id,
    //   view: {
    //     type: "modal",
    //     callback_id: "testy_modal_view",
    //     title: {
    //       type: "plain_text",
    //       text: "Slash Command Triggered",
    //     },
    //     close: {
    //       type: "plain_text",
    //       text: "Close",
    //     },
    //     blocks: [
    //       {
    //         type: "section",
    //         text: {
    //           type: "mrkdwn",
    //           text: `:rocket: *Modal Opened Successfully!*`,
    //         },
    //       },
    //       {
    //         type: "section",
    //         text: {
    //           type: "mrkdwn",
    //           text: `You used the \`${command}\` command. This modal is a private surface for user interaction.`,
    //         },
    //       },
    //       {
    //         type: "divider",
    //       },
    //       {
    //         type: "context",
    //         elements: [
    //           {
    //             type: "mrkdwn",
    //             text: `*User ID:* ${user_id} | *Arguments:* ${text || "None"}`,
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // });
  })

  app.function(
    'sample_custom_step',
    async ({ inputs, complete, fail, logger }) => {
      try {
        const { message } = inputs
        await complete({
          outputs: {
            message: `:wave: You submitted the following message: \n\n>${message}`,
          },
        })
      } catch (error) {
        logger.error(error)
        await fail({ error: `Failed to handle a function request: ${error}` })
      }
    }
  )

  app.action(
    'workflow_button_click',
    async ({ ack, body, client, action, complete, logger }) => {
      // Acknowledge the button click immediately
      await ack()

      try {
        // 1. Get the function execution ID from the private_metadata of the block
        const metadata = JSON.parse(body.message.blocks[0].private_metadata)
        const executionId = metadata.function_execution_id

        // 2. Call the new complete utility using the retrieved execution ID
        // This tells the workflow to move to the next step.
        await client.functions.complete({
          function_execution_id: executionId,
          outputs: {
            // Include any required outputs defined in your custom step configuration
            // For this example, we assume no outputs are strictly needed.
          },
        })

        // 3. (Optional) Update the message to confirm the step is complete
        await client.chat.update({
          channel: body.channel.id,
          ts: body.message.ts,
          text: 'Workflow step completed by button click.',
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: '✅ *Success!* This step has been marked as complete.',
              },
            },
          ],
        })
      } catch (error) {
        logger.error('Error completing function:', error)
        // Note: Calling fail() here only works if you had the 'fail' argument in your action listener (which is possible
        // but less common/direct than calling `client.functions.complete/fail`).
      }
    }
  )
}

module.exports = {
  startApp,
}
