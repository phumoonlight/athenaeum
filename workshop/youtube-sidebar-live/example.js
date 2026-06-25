async function checkYouTubeChannelLive(channelId) {
  console.log(`Checking live status for channel ID: ${channelId}`)

  try {
    // Fetch the /live page for the channel
    const response = await fetch(`https://www.youtube.com/channel/${channelId}/live`, {
      redirect: 'follow',
    })
    const html = await response.text()

    // Log the response URL in case there is a redirection
    console.log(`Fetched URL: ${response.url}`)

    // Check if the URL indicates a consent or login-required page
    if (response.url.includes('consent.youtube.com')) {
      console.error('User is not logged in or consent not accepted')
      await browser.storage.local.set({ loginRequired: true }) // Set the flag
      browser.runtime.sendMessage({ action: 'loginRequired' })
      return null // Return null to indicate a specific login error
    }

    // Count occurrences of "isLive": true in the HTML
    const liveCount = (html.match(/"isLive":\s*true/g) || []).length

    if (liveCount === 2) {
      console.log(
        `Channel ID ${channelId} is live: true (reason: found 2 instances of 'isLive': true)`
      )
      return true
    } else if (liveCount === 1) {
      console.log(
        `Channel ID ${channelId} is not live: false (reason: found 1 instance of 'isLive': true, indicating a scheduled stream)`
      )
      return false
    } else {
      console.log(
        `Channel ID ${channelId} is not live: false (reason: no instances of 'isLive': true found)`
      )
      return false
    }
  } catch (error) {
    console.error('Error checking channel live status:', error)
    return false // Return false for generic network errors
  }
}

async function checkAllChannels(fromPopup = false) {
  console.log('Checking all channels for live status...')

  // Get the channel list from local storage
  const result = await browser.storage.local.get(['yt_live_channels_id'])
  let storedChannels = result.yt_live_channels_id || []
  let liveChannels = {}
  let liveCount = 0 // Counter for live channels
  let loginErrorOccurred = false // Flag to track if a login error happens during this run

  const checkPromises = storedChannels.map(async ([id, name]) => {
    const isLive = await checkYouTubeChannelLive(id)

    if (isLive === null) {
      loginErrorOccurred = true
    } else {
      liveChannels[name] = isLive
      if (isLive) liveCount++ // Increment live counter if channel is live
    }
  })

  // After all channels are checked
  await Promise.all(checkPromises)

  // Only clear the loginRequired flag if no login error occurred during this specific run
  if (!loginErrorOccurred) {
    await browser.storage.local.set({ loginRequired: false })
  }

  console.log('Live status of all channels:', liveChannels)
  await browser.storage.local.set({ liveChannels })

  // Update the extension badge
  if (liveCount > 0) {
    await browser.action.setBadgeText({ text: liveCount.toString() })
    await browser.action.setBadgeBackgroundColor({ color: 'blue' })
  } else {
    await browser.action.setBadgeText({ text: '' }) // Clear the badge if no live channels
  }

  // Send a message back to content script/popup to indicate completion
  if (fromPopup) {
    browser.runtime.sendMessage({ action: 'checkComplete' })
  }
}

// Message listener for messages from the popup
// A SINGLE, combined message listener for all messages from the popup
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'checkAllChannels') {
    console.log('Received message to check all channels from popup.')
    // Pass the fromPopup flag to the function
    checkAllChannels(message.fromPopup)
  }

  // We no longer need to listen for "exportChannels" here.

  // You can add more `else if` blocks here for other messages in the future.
})

// Setting up the alarm when the extension is installed/started
browser.runtime.onInstalled.addListener(() => {
  browser.alarms.create('fetchDataAlarm', {
    delayInMinutes: 1, // Start 1 minute after the extension is installed/started
    periodInMinutes: 3, // Repeat every 3 minutes
  })
})

// Alarm listener
browser.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'fetchDataAlarm') {
    console.log('Alarm triggered')
    checkAllChannels()
  }
})

// Initial check
checkAllChannels()
