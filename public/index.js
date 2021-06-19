/**
 * The JWT token you get after authenticating with our API.
 * Check the Authentication section of the documentation for more details.
 */
const uniqueMeetingId = 'reasonworld11@gmai'
const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFVUTRNemhDUVVWQk1rTkJNemszUTBNMlFVVTRRekkyUmpWQ056VTJRelUxUTBVeE5EZzFNUSJ9.eyJodHRwczovL3BsYXRmb3JtLnN5bWJsLmFpL3VzZXJJZCI6IjQ5MTg1NTEwMTUwNjM1NTIiLCJpc3MiOiJodHRwczovL2RpcmVjdC1wbGF0Zm9ybS5hdXRoMC5jb20vIiwic3ViIjoiRzl0VTZ0Tmd0YzJUUFBMUmJmRXZSZWN5V3FsOGxjQnhAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcGxhdGZvcm0ucmFtbWVyLmFpIiwiaWF0IjoxNjIzOTE1OTA1LCJleHAiOjE2MjQwMDIzMDUsImF6cCI6Ikc5dFU2dE5ndGMyVFBQTFJiZkV2UmVjeVdxbDhsY0J4IiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.pXEdzSj_iJr5HNNkbEm9MwRAoinKwJx61WKqFzBsPDlCqWeLEnvOlYYTtv5jglQDH0UiBjqOmH58-Z6t9p4F2ApBnOKs5qmVAyTwHAdaSYds6QYZP0l_HhPogKiK7__F4oN0gMqBh5lbB_6CL0v7ka4Uf2duV5Docwmtk89YmJhhCpmvqbtSBTuJD-qWz54346xgrzztDUKaG6HhJKAMoyIal-WOpSAN8VWRk4DvIq29AWH-ihoi-Fhgx5Dh-1Jw0_yIHPEl1oRHlogVA7CpIhqSn4s4RZ3vnLfZcQV24b0X_TK-oX51aOf_xX3wmY8Z2Wh-lT1qogvfAPLGU5fE2g';

let ws = io();

ws.on('connect', (e) => {
    console.log('client side done')
})

// Fired when a message is received from the WebSocket server
ws.on("symbl-data", function(event) {
    console.log(event)
        // You can find the conversationId in event.message.data.conversationId;
    const data = JSON.parse(event.data);
    if (data.type === 'message' && data.message.hasOwnProperty('data')) {
        console.log('conversationId', data.message.data.conversationId);
    }
    if (data.type === 'message_response') {
        for (let message of data.messages) {
            console.log('Transcript (more accurate): ', message.payload.content);
        }
    }
    if (data.type === 'topic_response') {
        for (let topic of data.topics) {
            console.log('Topic detected: ', topic.phrases)
        }
    }
    if (data.type === 'topic_response') {
        for (let topic of data.topics) {
            console.log('Topic detected: ', topic.phrases)
        }
    }
    if (data.type === 'insight_response') {
        for (let insight of data.insights) {
            console.log('Insight detected: ', insight.payload.content);
        }
    }
    if (data.type === 'message' && data.message.hasOwnProperty('punctuated')) {
        console.log('Live transcript (less accurate): ', data.message.punctuated.transcript)
    }
    console.log(`Response type: ${data.type}. Object: `, data);
});

ws.on('disconnect', function(msg) {
    console.log("Disconnected SUcessfully");
});

// Fired when the WebSocket closes unexpectedly due to an error or lost connetion


// Fired when the connection succeeds.
// ws.on = ('micdata', event) => {
//     ws.send(JSON.stringify({
//         type: 'start_request',
//         meetingTitle: 'Websockets How-to', // Conversation name
//         insightTypes: ['question', 'action_item'], // Will enable insight generation
//         config: {
//             confidenceThreshold: 0.5,
//             languageCode: 'en-US',
//             speechRecognition: {
//                 encoding: 'LINEAR16',
//                 sampleRateHertz: 44100,
//             }
//         },
//         speaker: {
//             userId: 'example@symbl.ai',
//             name: 'Example Sample',
//         }
//     }));
// };




/**
 * The callback function which fires after a user gives the browser permission to use
 * the computer's microphone. Starts a recording session which sends the audio stream to
 * the WebSocket endpoint for processing.
 */

function startRecording() {
    console.log('start recording')
    context = new window.AudioContext()
    ws.emit('start', { 'sampleRate': context.sampleRate })

    navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then((stream) => {
        localstream = stream
        const input = this.context.createMediaStreamSource(stream)
        processor = context.createScriptProcessor(4096, 1, 1)

        input.connect(processor)
        processor.connect(context.destination)

        processor.onaudioprocess = (e) => {
            const voice = e.inputBuffer.getChannelData(0)
            ws.emit('send_pcm', voice.buffer)
        }
    }).catch((e) => {
        // "DOMException: Rrequested device not found" will be caught if no mic is available
        console.log(e)
    })
}


function stopRecording() {
    console.log('stop recording')
    processor.disconnect()
    processor.onaudioprocess = null
    processor = null
    localstream.getTracks().forEach((track) => {
        track.stop()
    })
    ws.emit('end', 'Stopped', (response) => {
        console.log(response.status);
    })
    ws.disconnect();

}
let state;
document.querySelector('.start-recording').addEventListener('click', async(e) => {
    state = 1;
    startRecording()

})
document.querySelector('.stop-recording').addEventListener('click', async(e) => {
    if (state === 1) stopRecording()

})